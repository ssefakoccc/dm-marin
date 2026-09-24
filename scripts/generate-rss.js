// scripts/generate-rss.js
// Generates RSS 2.0 feed (feed.xml and rss.xml) from blog articles and guides for external syndication (Medium, Google News, feed aggregators)

const fs = require('fs');
const path = require('path');

const HOST = 'https://dmmarin.com';
const ROOT_DIR = path.join(__dirname, '..');

function extractMeta(htmlContent, filename) {
  // Title
  const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/i);
  let title = titleMatch ? titleMatch[1].replace(/\s*\|\s*DM MARİN.*$/i, '').trim() : filename;

  // Description
  const descMatch = htmlContent.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
  let description = descMatch ? descMatch[1].trim() : 'DM MARİN yerinde mobil marin teknik servis ve rehber yazısı.';

  // Image
  const imgMatch = htmlContent.match(/<meta\s+property=["']og:image["']\s+content=["'](.*?)["']/i);
  let image = imgMatch ? imgMatch[1].trim() : `${HOST}/assets/dm-marin-mobil-servis.webp`;

  // Canonical / URL
  const link = `${HOST}/${filename}`;

  // Date (fallback to last modified)
  let pubDate = new Date().toUTCString();
  try {
    const stats = fs.statSync(path.join(ROOT_DIR, filename));
    pubDate = new Date(stats.mtime).toUTCString();
  } catch (e) {}

  return { title, description, link, image, pubDate };
}

function escapeXml(unsafe) {
  return (unsafe || '').replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

function generateRss() {
  const files = fs.readdirSync(ROOT_DIR);
  const blogFiles = files.filter(f => (f.startsWith('blog-') || f.startsWith('rehber-')) && f.endsWith('.html'));

  console.log(`Found ${blogFiles.length} blog and guide files for RSS generation.`);

  const items = [];
  for (const f of blogFiles) {
    try {
      const content = fs.readFileSync(path.join(ROOT_DIR, f), 'utf8');
      items.push(extractMeta(content, f));
    } catch (err) {
      console.error(`Error reading ${f}:`, err.message);
    }
  }

  // Sort by filename or keep order
  items.sort((a, b) => a.title.localeCompare(b.title, 'tr'));

  const xmlItems = items.map(item => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.link)}</link>
      <guid isPermaLink="true">${escapeXml(item.link)}</guid>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${item.pubDate}</pubDate>
      <enclosure url="${escapeXml(item.image)}" type="image/webp" length="1024" />
      <source url="${HOST}/feed.xml">DM MARİN</source>
    </item>`).join('\n');

  const rssContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>DM MARİN | Mobil Marin Servis Teknik Blog &amp; Rehberler</title>
    <link>${HOST}/blog.html</link>
    <description>İstanbul ve Marmara marinalarında yerinde mobil marin teknik servis, tekne motoru bakımı ve marin jeneratör tamir kılavuzları.</description>
    <language>tr-TR</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${HOST}/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${HOST}/assets/dm-marin-logo-v2.webp</url>
      <title>DM MARİN</title>
      <link>${HOST}/</link>
    </image>
${xmlItems}
  </channel>
</rss>`;

  const feedPath = path.join(ROOT_DIR, 'feed.xml');
  const rssPath = path.join(ROOT_DIR, 'rss.xml');

  fs.writeFileSync(feedPath, rssContent, 'utf8');
  fs.writeFileSync(rssPath, rssContent, 'utf8');

  console.log(`Generated ${feedPath} and ${rssPath} with ${items.length} items.`);
}

if (require.main === module) {
  generateRss();
}

module.exports = { generateRss };
