// api/admin/indexnow.js
const fs = require('fs');
const path = require('path');
const https = require('https');
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

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Sadece POST metodu desteklenir.' });
  }

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
      console.error('Sitemap read error in API:', e.message);
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
      message: `${urls.length} adet sayfa IndexNow ve Bing/Copilot arama dizinlerine başarıyla iletildi.`,
      urlCount: urls.length,
      indexnow: resIndexNow.status === 'fulfilled' ? resIndexNow.value : { error: resIndexNow.reason.message },
      bing: resBing.status === 'fulfilled' ? resBing.value : { error: resBing.reason.message },
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
