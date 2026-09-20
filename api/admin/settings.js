// api/admin/settings.js
const { getServiceClient } = require('../_lib/supabase');
const { verifyAdmin } = require('../_lib/auth');

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  // SECURITY: Require verified admin for all settings operations
  const adminUser = await verifyAdmin(req, res);
  if (!adminUser) return;

  const supabase = getServiceClient();
  if (!supabase) {
    return res.status(503).json({ error: 'Supabase servis bağlantısı yapılandırılmamış.' });
  }

  const method = req.method;

  // GET: Site içerik ve genel ayarlarını getir
  if (method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*');

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

  // POST: Ayarları kaydet (Admin doğrulaması zorunlu)
  if (method === 'POST') {
    try {
      const body = req.body || {};
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
