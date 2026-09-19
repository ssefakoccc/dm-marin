// api/admin/seo.js
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

  // GET: Kayıtlı sayfa SEO ayarlarını getir
  if (method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('key', 'pages_seo')
        .maybeSingle();

      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json({ success: true, data: data ? data.value : null });
    } catch (err) {
      return res.status(500).json({ error: 'Sunucu hatası: ' + err.message });
    }
  }

  // POST: Sayfa SEO ayarlarını kaydet
  if (method === 'POST') {
    try {
      const pagesSeo = req.body && req.body.pagesSeo;
      if (!pagesSeo) {
        return res.status(400).json({ error: 'Kaydedilecek pagesSeo verisi eksik.' });
      }

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
      return res.status(200).json({ success: true, data: data.value, message: 'SEO ayarları veritabanına kaydedildi.' });
    } catch (err) {
      return res.status(500).json({ error: 'Sunucu hatası: ' + err.message });
    }
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ error: 'Desteklenmeyen HTTP metodu.' });
};
