// api/admin/brands.js
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

  // GET: Tüm markaları listele
  if (method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .order('order_index', { ascending: true })
        .order('name', { ascending: true });

      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json({ success: true, data });
    } catch (err) {
      return res.status(500).json({ error: 'Sunucu hatası: ' + err.message });
    }
  }

  // POST: Marka ekle, güncelle veya toplu senkronize et
  if (method === 'POST') {
    try {
      const body = req.body || {};

      // Toplu senkronizasyon ({ brands: [...] })
      if (Array.isArray(body.brands)) {
        // Mevcutları temizleyip yenilerini ekleyebilir veya upsert edebiliriz
        const brandsToInsert = body.brands.map((b, idx) => ({
          name: typeof b === 'string' ? b.trim() : b.name.trim(),
          visible: typeof b === 'object' && b.visible !== undefined ? b.visible : true,
          order_index: idx + 1
        })).filter(b => b.name);

        const { data, error } = await supabase
          .from('brands')
          .upsert(brandsToInsert, { onConflict: 'name' })
          .select();

        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json({ success: true, data });
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
