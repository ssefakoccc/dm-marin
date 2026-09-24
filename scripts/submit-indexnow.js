// scripts/submit-indexnow.js
// Submits all site URLs to Bing, IndexNow, and Copilot AI retrieval queues.

const fs = require('fs');
const path = require('path');
const https = require('https');

const HOST = 'dmmarin.com';
const KEY = 'c8d41a7b8e2f491c920f3458b6e7921a';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

function getSitemapUrls() {
  try {
    const sitemapPath = path.join(__dirname, '..', 'sitemap.xml');
    const content = fs.readFileSync(sitemapPath, 'utf8');
    const matches = content.match(/<loc>(.*?)<\/loc>/g) || [];
    const urls = matches.map(m => m.replace(/<\/?loc>/g, '').trim());
    return [...new Set(urls)];
  } catch (err) {
    console.error('Sitemap read error:', err.message);
    return [`https://${HOST}/`];
  }
}

async function submitToIndexNow(urls, endpoint = 'api.indexnow.org') {
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

    req.on('error', (err) => {
      reject(err);
    });

    req.write(payload);
    req.end();
  });
}

async function run() {
  console.log('--- IndexNow & AI Retrieval Submission Starting ---');
  const urls = getSitemapUrls();
  console.log(`Found ${urls.length} URLs in sitemap.`);

  // Submit to IndexNow main endpoint
  try {
    const res1 = await submitToIndexNow(urls, 'api.indexnow.org');
    console.log(`IndexNow (api.indexnow.org): Status ${res1.statusCode} - ${res1.statusMessage}`);
  } catch (err) {
    console.error('Error submitting to api.indexnow.org:', err.message);
  }

  // Also submit to Bing directly
  try {
    const res2 = await submitToIndexNow(urls, 'www.bing.com');
    console.log(`Bing (www.bing.com): Status ${res2.statusCode} - ${res2.statusMessage}`);
  } catch (err) {
    console.error('Error submitting to www.bing.com:', err.message);
  }

  console.log('--- Submission Process Finished ---');
}

if (require.main === module) {
  run();
}

module.exports = { getSitemapUrls, submitToIndexNow };
