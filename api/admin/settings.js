// api/admin/settings.js (Unified settings handler for site settings, SEO, ERP settings, and inventory)
const { getServiceClient } = require('../_lib/supabase');
const { verifyAdmin } = require('../_lib/auth');

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const adminUser = await verifyAdmin(req, res);
  if (!adminUser) return;

  const supabase = getServiceClient();
  if (!supabase) {
    return res.status(503).json({ error: 'Supabase servis bağlantısı yapılandırılmamış.' });
  }

  const method = req.method;
  const isErp = req.query.type === 'erp' || (req.url && req.url.includes('/erp/erpsettings'));
  const isSeo = req.query.type === 'seo' || (req.url && req.url.includes('/admin/seo'));
  const isInventory = req.query.type === 'inventory' || (req.url && req.url.includes('/admin/inventory'));

  // GET
  if (method === 'GET') {
    try {
      if (isInventory) {
        const { data, error } = await supabase
          .from('site_settings')
          .select('*')
          .eq('key', 'inventory_data')
          .maybeSingle();
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json({ success: true, data: data ? data.value : null });
      }

      if (isErp) {
        const { data, error } = await supabase
          .from('site_settings')
          .select('key, value')
          .in('key', ['erp_categories', 'erp_brands', 'erp_locations']);
        if (error) return res.status(500).json({ error: error.message });
        const result = {};
        (data || []).forEach(row => { result[row.key] = row.value; });
        return res.status(200).json({ success: true, data: result });
      }

      if (isSeo) {
        const { data, error } = await supabase
          .from('site_settings')
          .select('*')
          .eq('key', 'pages_seo')
          .maybeSingle();
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json({ success: true, data: data ? data.value : null });
      }

      const { data, error } = await supabase.from('site_settings').select('*');
      if (error) return res.status(500).json({ error: error.message });
      const settingsMap = {};
      (data || []).forEach(item => {
        settingsMap[item.key] = item.value;
      });
      return res.status(200).json({ success: true, data: settingsMap });
    } catch (err) {
      return res.status(500).json({ error: 'Sunucu hatası: ' + err.message });
    }
  }

  // POST
  if (method === 'POST') {
    try {
      const body = req.body || {};

      if (isInventory) {
        const inventoryData = body.inventory || body;
        const { data, error } = await supabase
          .from('site_settings')
          .upsert({
            key: 'inventory_data',
            value: inventoryData,
            updated_at: new Date().toISOString()
          })
          .select()
          .single();
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json({ success: true, data, message: 'Stok verileri kaydedildi.' });
      }

      if (isErp) {
        const updates = [];
        ['erp_categories', 'erp_brands', 'erp_locations'].forEach(key => {
          if (body[key] !== undefined) {
            updates.push({ key, value: body[key], updated_at: new Date().toISOString() });
          }
        });
        if (updates.length === 0) return res.status(400).json({ error: 'Güncellenecek veri yok.' });
        const { error } = await supabase.from('site_settings').upsert(updates);
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json({ success: true });
      }

      if (isSeo) {
        const pagesSeo = body.pagesSeo || body;
        const { data, error } = await supabase
          .from('site_settings')
          .upsert({
            key: 'pages_seo',
            value: pagesSeo,
            updated_at: new Date().toISOString()
          })
          .select()
          .single();
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json({ success: true, data: data.value, message: 'SEO ayarları kaydedildi.' });
      }

      const { key, value } = body;
      if (!key || value === undefined) {
        return res.status(400).json({ error: 'Ayar anahtarı (key) ve değeri (value) zorunludur.' });
      }

      const { data, error } = await supabase
        .from('site_settings')
        .upsert({
          key,
          value,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json({ success: true, data, message: 'Ayar başarıyla kaydedildi.' });
    } catch (err) {
      return res.status(500).json({ error: 'Sunucu hatası: ' + err.message });
    }
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ error: 'Desteklenmeyen HTTP metodu.' });
};
