// api/admin/brands.js
const { getServiceClient } = require('../_lib/supabase');
const { verifyAdmin } = require('../_lib/auth');

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const supabase = getServiceClient();
  if (!supabase) {
    return res.status(503).json({ error: 'Supabase servis bağlantısı yapılandırılmamış.' });
  }

  const method = req.method;

  // GET: Tüm markaları listele (Herkese açık)
  if (method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .order('order_index', { ascending: true })
        .order('name', { ascending: true });

      if (error) {
        // Fallback: site_settings'ten çek
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

  // POST ve DELETE için Admin doğrulaması zorunlu
  const adminUser = await verifyAdmin(req, res);
  if (!adminUser) return;

  // POST: Marka ekle, güncelle veya toplu senkronize et
  if (method === 'POST') {
    try {
      const body = req.body || {};

      // Toplu senkronizasyon ({ brands: [...] })
      if (Array.isArray(body.brands)) {
        const brandsToInsert = body.brands.map((b, idx) => ({
          name: typeof b === 'string' ? b.trim() : (b.name || '').trim(),
          visible: typeof b === 'object' && b.visible !== undefined ? b.visible : true,
          order_index: idx + 1
        })).filter(b => b.name);

        // 1. site_settings tablosuna kaydet (hızlı global erişim için)
        await supabase
          .from('site_settings')
          .upsert({
            key: 'brands',
            value: brandsToInsert,
            updated_at: new Date().toISOString()
          });

        // 2. brands tablosunu temizleyip yenilerini ekle
        try {
          await supabase.from('brands').delete().neq('id', '00000000-0000-0000-0000-000000000000');
          if (brandsToInsert.length > 0) {
            await supabase.from('brands').insert(brandsToInsert);
          }
        } catch (tblErr) {
          console.warn("Brands table batch sync fallback:", tblErr);
        }

        return res.status(200).json({ success: true, data: brandsToInsert });
      }

      // Tek marka ekle
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

  // DELETE: Marka sil
  if (method === 'DELETE') {
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
  return res.status(405).json({ error: 'Desteklenmeyen HTTP metodu.' });
};
