// api/settings.js (Public settings & brands endpoint)
const { getServiceClient } = require('./_lib/supabase');
const { verifyAdmin } = require('./_lib/auth');

const PUBLIC_SETTINGS_WHITELIST = [
  'site_info',
  'brands',
  'pages_seo',
  'business_hours',
  'emergency_phone',
  'theme_config',
  'contact_info'
];

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const supabase = getServiceClient();
  if (!supabase) {
    return res.status(200).json({ success: true, data: {} });
  }

  const method = req.method;
  const isBrands = req.query.type === 'brands' || (req.url && req.url.includes('/admin/brands'));

  // GET
  if (method === 'GET') {
    if (isBrands) {
      try {
        const { data, error } = await supabase
          .from('brands')
          .select('*')
          .order('order_index', { ascending: true })
          .order('name', { ascending: true });

        if (error) {
          const { data: setRow } = await supabase
            .from('site_settings')
            .select('value')
            .eq('key', 'brands')
            .maybeSingle();
          if (setRow && Array.isArray(setRow.value)) {
            return res.status(200).json({ success: true, data: setRow.value });
          }
          return res.status(500).json({ error: error.message });
        }
        return res.status(200).json({ success: true, data });
      } catch (err) {
        return res.status(500).json({ error: 'Sunucu hatası: ' + err.message });
      }
    }

    res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=120');
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('key, value');

      if (error) {
        return res.status(200).json({ success: true, data: {} });
      }

      const settingsMap = {};
      (data || []).forEach(item => {
        if (PUBLIC_SETTINGS_WHITELIST.includes(item.key) || (!item.key.includes('notification') && !item.key.includes('secret') && !item.key.includes('key') && !item.key.includes('token') && !item.key.includes('admin') && !item.key.includes('inventory'))) {
          settingsMap[item.key] = item.value;
        }
      });

      return res.status(200).json({ success: true, data: settingsMap });
    } catch (err) {
      return res.status(200).json({ success: true, data: {} });
    }
  }

  // POST & DELETE: Require verified admin
  const adminUser = await verifyAdmin(req, res);
  if (!adminUser) return;

  if (method === 'POST' && isBrands) {
    try {
      const body = req.body || {};
      if (Array.isArray(body.brands)) {
        const brandsToInsert = body.brands.map((b, idx) => ({
          name: typeof b === 'string' ? b.trim() : (b.name || '').trim(),
          visible: typeof b === 'object' && b.visible !== undefined ? b.visible : true,
          order_index: idx + 1
        })).filter(b => b.name);

        await supabase
          .from('site_settings')
          .upsert({
            key: 'brands',
            value: brandsToInsert,
            updated_at: new Date().toISOString()
          }, { onConflict: 'key' });

        try {
          await supabase.from('brands').delete().neq('id', '00000000-0000-0000-0000-000000000000');
          if (brandsToInsert.length > 0) {
            await supabase.from('brands').insert(brandsToInsert);
          }
        } catch (tblErr) {}

        return res.status(200).json({ success: true, data: brandsToInsert });
      }

      const name = typeof body.name === 'string' ? body.name.trim() : '';
      const visible = body.visible !== false;

      if (!name) {
        return res.status(400).json({ error: 'Marka adı zorunludur.' });
      }

      const { data, error } = await supabase
        .from('brands')
        .insert([{ name, visible, order_index: 99 }])
        .select()
        .single();

      if (error) return res.status(500).json({ error: error.message });
      return res.status(201).json({ success: true, data });
    } catch (err) {
      return res.status(500).json({ error: 'Sunucu hatası: ' + err.message });
    }
  }

  if (method === 'DELETE' && isBrands) {
    try {
      const id = req.query.id || (req.body && req.body.id);
      const name = req.query.name || (req.body && req.body.name);

      if (!id && !name) {
        return res.status(400).json({ error: 'Silinecek marka id veya name belirtilmedi.' });
      }

      let query = supabase.from('brands').delete();
      if (id) query = query.eq('id', id);
      else if (name) query = query.eq('name', name);

      const { error } = await query;
      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json({ success: true, message: 'Marka silindi.' });
    } catch (err) {
      return res.status(500).json({ error: 'Sunucu hatası: ' + err.message });
    }
  }

  res.setHeader('Allow', 'GET, POST, DELETE');
  return res.status(405).json({ error: 'Desteklenmeyen metod.' });
};
