// api/admin/inventory.js
const { getServiceClient } = require('../_lib/supabase');
const { verifyAdmin } = require('../_lib/auth');

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const supabase = getServiceClient();
  if (!supabase) {
    return res.status(503).json({ error: 'Supabase servis bağlantısı yapılandırılmamış.' });
  }

  const method = req.method;

  // GET: Stok listesi ve hareket loglarını getir
  if (method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('key', 'inventory_data')
        .maybeSingle();

      if (error) return res.status(500).json({ error: error.message });

      return res.status(200).json({
        success: true,
        data: data ? data.value : null
      });
    } catch (err) {
      return res.status(500).json({ error: 'Sunucu hatası: ' + err.message });
    }
  }

  // POST: Stok verilerini kaydet (Admin doğrulaması zorunlu)
  if (method === 'POST') {
    const adminUser = await verifyAdmin(req, res);
    if (!adminUser) return;

    try {
      const body = req.body || {};
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
      return res.status(200).json({ success: true, data, message: 'Stok verileri başarıyla kaydedildi.' });
    } catch (err) {
      return res.status(500).json({ error: 'Sunucu hatası: ' + err.message });
    }
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ error: 'Desteklenmeyen HTTP metodu.' });
};
