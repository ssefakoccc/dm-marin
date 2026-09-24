// api/admin/settings.js (Unified settings handler for site settings, SEO, ERP settings, inventory, and IndexNow)
const https = require('https');
const fs = require('fs');
const path = require('path');
const { getServiceClient } = require('../_lib/supabase');
const { verifyAdmin } = require('../_lib/auth');

const HOST = 'dmmarin.com';
const KEY = 'c8d41a7b8e2f491c920f3458b6e7921a';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

function submitToIndexNow(urls, endpoint = 'api.indexnow.org') {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls
    });

    const options = {
      hostname: endpoint,
      port: 443,
      path: '/indexnow',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          endpoint,
          statusCode: res.statusCode,
          statusMessage: res.statusMessage,
          body: data
        });
      });
    });

    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const adminUser = await verifyAdmin(req, res);
  if (!adminUser) return;

  const method = req.method;
  const isIndexNow = req.query.type === 'indexnow' || (req.url && req.url.includes('/admin/indexnow'));

  // Handle IndexNow submission
  if (method === 'POST' && isIndexNow) {
    try {
      let urls = [];
      try {
        const sitemapPath = path.join(process.cwd(), 'sitemap.xml');
        if (fs.existsSync(sitemapPath)) {
          const content = fs.readFileSync(sitemapPath, 'utf8');
          const matches = content.match(/<loc>(.*?)<\/loc>/g) || [];
          urls = matches.map(m => m.replace(/<\/?loc>/g, '').trim());
        }
      } catch (e) {
        console.error('Sitemap read error in settings API:', e.message);
      }

      if (!urls || urls.length === 0) {
        urls = [
          `https://${HOST}/`,
          `https://${HOST}/motor-mekanik-bakim.html`,
          `https://${HOST}/marin-jenerator-servisi.html`,
          `https://${HOST}/acil-mobil-marin-servis.html`,
          `https://${HOST}/volvo-penta-d4-d6-ozel-servis.html`,
          `https://${HOST}/yanmar-4jh-6ly-ozel-servis.html`,
          `https://${HOST}/kalamis-volvo-penta-servis.html`,
          `https://${HOST}/tuzla-marin-jenerator-tamiri.html`
        ];
      }

      urls = [...new Set(urls)];

      const [resIndexNow, resBing] = await Promise.allSettled([
        submitToIndexNow(urls, 'api.indexnow.org'),
        submitToIndexNow(urls, 'www.bing.com')
      ]);

      return res.status(200).json({
        success: true,
        message: `${urls.length} sayfa IndexNow ve Bing/Copilot arama dizinlerine başarıyla iletildi.`,
        urlCount: urls.length,
        indexnow: resIndexNow.status === 'fulfilled' ? resIndexNow.value : { error: resIndexNow.reason.message },
        bing: resBing.status === 'fulfilled' ? resBing.value : { error: resBing.reason.message },
        timestamp: new Date().toISOString()
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  const supabase = getServiceClient();
  if (!supabase) {
    return res.status(503).json({ error: 'Supabase servis bağlantısı yapılandırılmamış.' });
  }

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
