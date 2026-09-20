#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");
const MAX_BLOG_LIMIT = 80;

const TOPIC_CATALOG = [
  {
    id: "volvo-ips-drive-maintenance",
    file_tr: "blog-volvo-penta-ips-pod-surucu-bakimi.html",
    file_en: "blog-volvo-penta-ips-pod-drive-maintenance-service.html",
    category_tr: "Motor & Mekanik Bakım",
    category_en: "Engine & Mechanical",
    image: "assets/volvo-penta-d4-d6-ozel-servis.webp",
    read_tr: "7 dk",
    read_en: "7 min",
    title_tr: "Volvo Penta IPS Pod Sürücü Bakımı, Yağ Değişimi ve Keçe Kontrolü | DM MARİN",
    title_en: "Volvo Penta IPS Pod Drive Maintenance, Oil & Seal Service | DM MARIN",
    h1_tr: "Volvo Penta IPS Pod Sürücü Bakımı ve Sezonluk Kontroller",
    h1_en: "Volvo Penta IPS Pod Drive Maintenance & Scheduled Service",
    desc_tr: "Volvo Penta IPS 500, 600, 800, 950, 1050 ve 1200 pod sürücülerde şanzıman sentetik yağ değişimi, pervane şaftı çift keçe kontrolü, tutyalar ve SUS sensör kalibrasyonu.",
    desc_en: "Scheduled maintenance for Volvo Penta IPS 500-1200 pod drives: synthetic gear oil change, prop shaft dual seals, sacrificial anodes, and steering unit sensor calibration.",
    keywords_tr: "volvo penta ips bakımı, ips pod sürücü servisi, ips şanzıman yağı, ips keçe değişimi, volvo ips arıza, bodrum volvo ips",
    keywords_en: "volvo penta ips maintenance, ips pod drive service turkey, ips gear oil change, volvo ips repair bodrum marmaris"
  },
  {
    id: "yanmar-common-rail-diagnostics",
    file_tr: "blog-yanmar-common-rail-ariza-teshis-ve-bakim.html",
    file_en: "blog-yanmar-common-rail-diesel-diagnostics-service.html",
    category_tr: "Arıza & Diagnostik",
    category_en: "Diagnostics & Repair",
    image: "assets/yanmar-4jh-6ly-ozel-servis.webp",
    read_tr: "6 dk",
    read_en: "6 min",
    title_tr: "Yanmar Common Rail Dizel Motorlarda Arıza Teşhisi ve Bakım | DM MARİN",
    title_en: "Yanmar Common Rail Diesel Diagnostics & Scheduled Care | DM MARIN",
    h1_tr: "Yanmar 4JH-CR ve 6LY Common Rail Motor Bakım ve Teşhis Rehberi",
    h1_en: "Yanmar Common Rail Engine Diagnostics & Maintenance Guide",
    desc_tr: "Yanmar 4JH45, 4JH57, 4JH80, 4JH110 ve 6LY serisi elektronik marin dizellerde yakıt rayı basıncı, enjektör kodlama, Y-COP arıza okuma ve kışlık bakım.",
    desc_en: "Comprehensive guide for Yanmar 4JH and 6LY Common Rail marine diesels: fuel rail pressure sensors, injector coding, Y-COP diagnostics, and winter lay-up.",
    keywords_tr: "yanmar common rail servis, yanmar 4jh80 bakım, yanmar y-cop arıza, yanmar diagnostik cihazı, kalamış yanmar servisi",
    keywords_en: "yanmar common rail service, yanmar 4jh diagnostic, yanmar yacht engine turkey, gocek yanmar marine service"
  },
  {
    id: "fischer-panda-genset-care",
    file_tr: "blog-fischer-panda-jenerator-bakimi-ve-inverter-arizalari.html",
    file_en: "blog-fischer-panda-marine-generator-service-inverter.html",
    category_tr: "Jeneratör & Elektrik",
    category_en: "Generators & Power",
    image: "assets/cummins-onan-jenerator-servisi.webp",
    read_tr: "5 dk",
    read_en: "5 min",
    title_tr: "Fischer Panda Marin Jeneratör Bakımı ve İnvertör Arızaları | DM MARİN",
    title_en: "Fischer Panda Marine Generator Service & Inverter Troubleshooting | DM MARIN",
    h1_tr: "Fischer Panda Değişken Devirli (iSeries) Jeneratör Servisi",
    h1_en: "Fischer Panda Variable Speed (iSeries) Generator Maintenance",
    desc_tr: "Fischer Panda 4000s, 5000i, 8000i, 10000i jeneratörlerde kapsül içi soğutma suyu, kalıcı mıknatıslı alternatör (PMGI) invertör ayarları ve ses izolasyonu.",
    desc_en: "Service guide for Fischer Panda sound-encapsulated marine generators: closed-loop freshwater cooling, PMGI inverter configuration, and quiet run maintenance.",
    keywords_tr: "fischer panda jeneratör servisi, fischer panda arıza kodları, panda iseries invertör tamiri, tekne sessiz jeneratör",
    keywords_en: "fischer panda generator service turkey, fischer panda pmgi inverter repair, panda yacht genset bodrum"
  },
  {
    id: "marine-chiller-aircon",
    file_tr: "blog-marin-klima-chiller-ariza-ve-bakim.html",
    file_en: "blog-marine-air-conditioning-chiller-repair-maintenance.html",
    category_tr: "Tesisat & Donanım",
    category_en: "Plumbing & Hardware",
    image: "assets/marin-elektrik-elektronik.webp",
    read_tr: "6 dk",
    read_en: "6 min",
    title_tr: "Marin Klima ve Chiller Sistemleri Arıza Tespiti ve Gaz Kaçağı Tamiri | DM MARİN",
    title_en: "Marine Air Conditioning & Chiller Troubleshooting, Gas Leak Service | DM MARIN",
    h1_tr: "Tekne Marin Klima ve Merkezi Chiller Soğutma Bakımı",
    h1_en: "Yacht Air Conditioning & Central Chiller Maintenance Guide",
    desc_tr: "Dometic, Webasto, Condaria ve Veco marin klimalarda R410A/R134a gaz kaçağı tespiti, deniz suyu pompası kireç temizliği, fan coil yıkama ve kışlama.",
    desc_en: "Marine HVAC troubleshooting for Dometic, Webasto, and Condaria: R410A refrigerant leak detection, raw water pump descaling, fan coil deep cleaning, and winterization.",
    keywords_tr: "marin klima servisi, tekne chiller tamiri, dometic tekne klima arıza, webasto marin servis, tekne klima gaz basma",
    keywords_en: "marine air conditioning repair turkey, yacht chiller service bodrum, dometic marine hvac marmaris"
  },
  {
    id: "shaft-alignment-pss",
    file_tr: "blog-saft-hizalama-ve-pss-saf-kece-bakimi.html",
    file_en: "blog-shaft-alignment-pss-dripless-seal-maintenance.html",
    category_tr: "Motor & Mekanik Bakım",
    category_en: "Engine & Mechanical",
    image: "assets/motor-mekanik-bakim.webp",
    read_tr: "6 dk",
    read_en: "6 min",
    title_tr: "Şaft Hizalama (Lazerli Alignment) ve PSS Damlatmaz Şaft Keçesi | DM MARİN",
    title_en: "Propeller Shaft Laser Alignment & PSS Dripless Shaft Seal Service | DM MARIN",
    h1_tr: "Pervane Şaft Hizalama ve Damlatmaz Şaft Keçesi Bakımı",
    h1_en: "Propeller Shaft Laser Alignment & Dripless Shaft Seal Maintenance",
    desc_tr: "Teknelerde şaft titreşimi, braket ve kovan aşınması, lazerli motor-şaft hizalama (alignment), PSS ve Tides Marine damlatmaz şaft körüğü değişimi.",
    desc_en: "Eliminating yacht drive vibration: optical/laser engine-to-shaft alignment, cutless bearing replacement, and PSS/Tides Marine dripless shaft seal servicing.",
    keywords_tr: "şaft hizalama tekne, pss şaft keçesi, tekne şaft titreşimi, kovan lastiği değişimi, cutless bearing marin",
    keywords_en: "yacht shaft alignment turkey, pss dripless shaft seal, cutless bearing replacement boat, marine shaft vibration"
  },
  {
    id: "diesel-fuel-polishing",
    file_tr: "blog-mobil-yakit-parlatma-ve-tank-temizligi.html",
    file_en: "blog-mobile-marine-fuel-polishing-tank-cleaning.html",
    category_tr: "Motor & Mekanik Bakım",
    category_en: "Engine & Mechanical",
    image: "assets/marin-yedek-parca.webp",
    read_tr: "7 dk",
    read_en: "7 min",
    title_tr: "Mobil Yakıt Parlatma (Fuel Polishing) ve Mazot Tankı Temizliği | DM MARİN",
    title_en: "Mobile Marine Fuel Polishing & Diesel Tank Cleaning | DM MARIN",
    h1_tr: "Mobil Mazot Parlatma ve Tekne Yakıt Deposu Arındırma",
    h1_en: "Mobile Yacht Fuel Polishing & Diesel Tank Decontamination",
    desc_tr: "Yerinde mobil filtrasyon cihazlarımızla teknenizin mazot deposunu sökmeden 1 mikron seviyesinde arındırma, su ve biyolojik bakteri tahliyesi.",
    desc_en: "On-site mobile fuel polishing to 1 micron: removing free water, asphaltenes, and microbial diesel bug without tank cutting or fuel disposal.",
    keywords_tr: "yakıt parlatma mobil, tekne mazot temizleme, fuel polishing türkiye, tekne yakıt tankı temizliği bodrum",
    keywords_en: "marine fuel polishing turkey, yacht diesel tank cleaning, diesel bug removal boat marmaris gocek"
  }
];

function generateInfographicSVG(topic, lang = "tr") {
  const isTr = lang === "tr";
  const title = isTr ? topic.h1_tr : topic.h1_en;
  const cat = isTr ? topic.category_tr : topic.category_en;
  
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#071b2b"/>
      <stop offset="60%" stop-color="#0b2e47"/>
      <stop offset="100%" stop-color="#0284c7"/>
    </linearGradient>
    <linearGradient id="cardGlow" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0ea5e9"/>
      <stop offset="100%" stop-color="#06b6d4"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <circle cx="1000" cy="150" r="300" fill="#0284c7" opacity="0.15"/>
  <circle cx="200" cy="500" r="250" fill="#06b6d4" opacity="0.1"/>
  
  <rect x="80" y="80" width="1040" height="470" rx="20" fill="#ffffff" fill-opacity="0.05" stroke="#38bdf8" stroke-width="2" stroke-dasharray="8 4"/>
  
  <rect x="120" y="120" width="220" height="38" rx="19" fill="url(#cardGlow)"/>
  <text x="230" y="145" fill="#ffffff" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="bold" text-anchor="middle" letter-spacing="1">DM MARİN TEKNİK</text>
  
  <text x="120" y="200" fill="#38bdf8" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="600">${cat.toUpperCase()}</text>
  
  <foreignObject x="120" y="220" width="960" height="180">
    <div xmlns="http://www.w3.org/1999/xhtml" style="color:#ffffff;font-family:system-ui, -apple-system, sans-serif;font-size:34px;font-weight:800;line-height:1.25">
      ${title}
    </div>
  </foreignObject>
  
  <line x1="120" y1="440" x2="1080" y2="440" stroke="#334155" stroke-width="2"/>
  
  <text x="120" y="490" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="16">✓ Orijinal &amp; Muadil Parça Kılavuzu</text>
  <text x="450" y="490" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="16">✓ Lazerli &amp; Elektronik Teşhis</text>
  <text x="780" y="490" fill="#94a3b8" font-family="system-ui, -apple-system, sans-serif" font-size="16">✓ 7/24 Mobil Acil Servis</text>
</svg>`;
}

function getExistingBlogCount() {
  const files = fs.readdirSync(ROOT_DIR);
  return files.filter(f => f.startsWith("blog-") && f.endsWith(".html")).length;
}

function generateSingleArticleHTML(topic, lang = "tr") {
  const isTr = lang === "tr";
  const curFile = isTr ? topic.file_tr : topic.file_en;
  const title = isTr ? topic.title_tr : topic.title_en;
  const h1 = isTr ? topic.h1_tr : topic.h1_en;
  const desc = isTr ? topic.desc_tr : topic.desc_en;
  const keywords = isTr ? topic.keywords_tr : topic.keywords_en;
  const category = isTr ? topic.category_tr : topic.category_en;
  const readTime = isTr ? topic.read_tr : topic.read_en;
  const diagramImg = `assets/diagrams/${topic.id}-${lang}.svg`;

  const schemaObj = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": h1,
        "description": desc,
        "image": `https://dmmarin.com/${topic.image}`,
        "inLanguage": isTr ? "tr-TR" : "en-US",
        "author": { "@type": "Organization", "name": "DM MARİN Engineering Team" },
        "publisher": {
          "@type": "Organization",
          "name": "DM MARİN",
          "logo": { "@type": "ImageObject", "url": "https://dmmarin.com/assets/dm-marin-logo-v2.webp" }
        },
        "datePublished": "2026-09-20",
        "dateModified": "2026-09-20",
        "mainEntityOfPage": `https://dmmarin.com/${curFile}`
      },
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": "https://dmmarin.com/#business",
        "name": "DM MARİN",
        "telephone": "+905437240992",
        "email": "servis@dmmarin.com",
        "url": "https://dmmarin.com/",
        "address": { "@type": "PostalAddress", "addressLocality": "İstanbul", "addressCountry": "TR" },
        "hasMap": "https://maps.google.com/?cid=12028604724976771691",
        "sameAs": [
          "https://dmmarin.com",
          "https://maps.google.com/?q=DM+Marin+Gemi+ve+Deniz+Teknolojisi+Mühendisi+İstanbul",
          "https://wa.me/905437240992",
          "https://www.instagram.com/dmmarin_servis"
        ],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5.0",
          "reviewCount": "24",
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": isTr ? "Ana Sayfa" : "Home", "item": "https://dmmarin.com/" },
          { "@type": "ListItem", "position": 2, "name": isTr ? "Blog & Rehberler" : "Blog & Guides", "item": isTr ? "https://dmmarin.com/blog.html" : "https://dmmarin.com/blog-en.html" },
          { "@type": "ListItem", "position": 3, "name": h1, "item": `https://dmmarin.com/${curFile}` }
        ]
      }
    ]
  };

  const navServices = isTr ? "Hizmetler" : "Services";
  const navBrands = isTr ? "Markalar" : "Brands";
  const navBlog = isTr ? "Blog & Rehberler" : "Blog & Guides";
  const navCta = isTr ? "Servis Talebi" : "Request Service";
  const waMsg = isTr ? `Merhaba DM MARİN, ${curFile} konulu makalenizi okudum ve servis randevusu almak istiyorum.` : `Hello DM MARIN, I read your article on ${h1} and would like to request yacht service.`;
  const waBtnText = isTr ? "WhatsApp’tan Danış" : "Chat on WhatsApp";
  const contactTitle = isTr ? "Tekneniz için profesyonel yerinde mühendislik ve mobil servis randevusu alın." : "Book certified on-site yacht engineering & emergency mobile service.";
  const contactBtn = isTr ? "Servis talebi oluştur →" : "Book Service Visit →";
  const footerCopy = isTr ? "Bağımsız çok markalı özel marin teknik servis. Tüm Türkiye geneli mobil destek." : "Independent multi-brand marine service. Fast mobile dispatch across Turkish waters.";

  return `<!doctype html>
<html lang="${lang}">
<head>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-2Q19CJBPQB"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-2Q19CJBPQB');
</script>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="https://dmmarin.com/${curFile}">
<link rel="alternate" hreflang="tr" href="https://dmmarin.com/${topic.file_tr}">
<link rel="alternate" hreflang="en" href="https://dmmarin.com/${topic.file_en}">
<meta name="robots" content="index,follow,max-image-preview:large">
<meta name="keywords" content="${keywords}">
<meta name="theme-color" content="#071b2b">
<link rel="stylesheet" href="service-page.css">
<link rel="stylesheet" href="brand-page.css">
<link rel="icon" href="favicon.ico" sizes="any">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<link rel="manifest" href="site.webmanifest">
<meta property="og:type" content="article">
<meta property="og:locale" content="${isTr ? 'tr_TR' : 'en_US'}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="https://dmmarin.com/${curFile}">
<meta property="og:image" content="https://dmmarin.com/${topic.image}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="https://dmmarin.com/${topic.image}">
<script type="application/ld+json">${JSON.stringify(schemaObj)}</script>
<!-- Vercel Web Analytics -->
<script>
window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
</script>
<script defer src="/_vercel/insights/script.js"></script>
</head>
<body>
<header class="header">
  <div class="container header-in">
    <a class="logo" href="index.html"><img src="assets/dm-marin-logo-v2.webp" alt="DM MARİN Profesyonel Marin Servis" width="260" height="80"></a>
    <nav class="nav">
      <a href="index.html#hizmetler">${navServices}</a>
      <a href="index.html#markalar">${navBrands}</a>
      <a href="${isTr ? 'blog.html' : 'blog-en.html'}" style="color:#087f93;font-weight:700">${navBlog}</a>
      <div class="lang-switch" style="display:flex;gap:4px">
        <a href="${topic.file_tr}" class="lang-btn ${isTr ? 'active' : ''}" style="text-decoration:none;padding:3px 8px;border-radius:4px;border:1px solid #cbd5e1;font-size:11px;font-weight:700;background:${isTr ? '#071b2b' : '#fff'};color:${isTr ? '#fff' : '#071b2b'}">TR</a>
        <a href="${topic.file_en}" class="lang-btn ${!isTr ? 'active' : ''}" style="text-decoration:none;padding:3px 8px;border-radius:4px;border:1px solid #cbd5e1;font-size:11px;font-weight:700;background:${!isTr ? '#071b2b' : '#fff'};color:${!isTr ? '#fff' : '#071b2b'}">EN</a>
      </div>
      <a class="cta" href="index.html#randevu">${navCta}</a>
    </nav>
  </div>
</header>
<main>
<section class="hero">
  <img src="${topic.image}" alt="${h1}" width="1672" height="941" fetchpriority="high" decoding="async">
  <div class="container hero-copy">
    <span class="eyebrow">${category} · ${readTime}</span>
    <h1>${h1}</h1>
    <p>${desc}</p>
    <div class="actions">
      <a class="btn" href="tel:+905437240992">☎ +90 543 724 09 92</a>
      <a class="btn alt" href="https://wa.me/905437240992?text=${encodeURIComponent(waMsg)}" target="_blank" rel="noopener">${waBtnText}</a>
    </div>
  </div>
</section>

<section class="section" style="background:#fff;border-bottom:1px solid #e2e8f0">
  <div class="container">
    <div class="intro">
      <h2>${isTr ? 'Mühendislik Standartları ve Bakım Esasları' : 'Engineering Standards & Service Protocols'}</h2>
      <div>
        <p style="font-size:15px;line-height:1.75;color:#1e293b">${desc}</p>
      </div>
    </div>
  </div>
</section>

<section class="section" style="background:#fff;padding:36px 0;border-top:1px solid #dbe7eb">
  <div class="container">
    <div class="intro">
      <h2>${isTr ? 'Diğer Marin Rehberlerimiz' : 'Related Marine Guides'}</h2>
      <div class="points" style="margin-top:14px">
        <article class="point"><a href="${isTr ? 'blog.html' : 'blog-en.html'}" style="font-weight:700;color:#0d91a5;text-decoration:underline">${isTr ? '← Tüm Blog ve Teknik Rehberlere Dön' : '← Back to All Marine Guides'}</a></article>
      </div>
    </div>
  </div>
</section>

<section class="contact">
  <div class="container contact-in">
    <h2>${contactTitle}</h2>
    <a class="btn" href="index.html#randevu">${contactBtn}</a>
  </div>
</section>
</main>
<footer class="footer">
  <div class="container footer-in">
    <span>© 2026 DM MARİN</span>
    <span>${footerCopy}</span>
  </div>
</footer>
<div class="mobile-bar">
  <a class="mobile-call" href="tel:+905437240992">☎ ${isTr ? 'Hemen Ara' : 'Call Now'}</a>
  <a class="mobile-wa" href="https://wa.me/905437240992?text=${encodeURIComponent(waMsg)}" target="_blank" rel="noopener">WhatsApp</a>
</div>
</body>
</html>
`;
}

function runAgentCycle() {
  console.log("=".repeat(70));
  console.log("🤖 SCRIBE-SEO: OTONOM MARİN BLOG VE İÇERİK AJANI BAŞLATILDI");
  console.log("🔒 Güvenlik & Disk Sınırı: Maksimum " + MAX_BLOG_LIMIT + " Makale Limiti");
  console.log("=".repeat(70));

  const currentCount = getExistingBlogCount();
  console.log(`📊 Mevcut Blog Makalesi Sayısı: ${currentCount} / ${MAX_BLOG_LIMIT}`);

  const diagDir = path.join(ROOT_DIR, "assets", "diagrams");
  if (!fs.existsSync(diagDir)) fs.mkdirSync(diagDir, { recursive: true });

  let createdCount = 0;
  for (const topic of TOPIC_CATALOG) {
    if (getExistingBlogCount() >= MAX_BLOG_LIMIT) {
      console.log(`⚠️ Maksimum blog sınırına (${MAX_BLOG_LIMIT}) ulaşıldı. Yeni üretim durduruldu.`);
      break;
    }

    const trPath = path.join(ROOT_DIR, topic.file_tr);
    const enPath = path.join(ROOT_DIR, topic.file_en);
    const trDiagPath = path.join(diagDir, `${topic.id}-tr.svg`);
    const enDiagPath = path.join(diagDir, `${topic.id}-en.svg`);

    if (!fs.existsSync(trDiagPath)) {
      fs.writeFileSync(trDiagPath, generateInfographicSVG(topic, "tr"), "utf-8");
    }
    if (!fs.existsSync(enDiagPath)) {
      fs.writeFileSync(enDiagPath, generateInfographicSVG(topic, "en"), "utf-8");
    }

    if (!fs.existsSync(trPath)) {
      fs.writeFileSync(trPath, generateSingleArticleHTML(topic, "tr"), "utf-8");
      console.log(`✓ [TR Üretildi]: ${topic.file_tr}`);
      createdCount++;
    }
    if (!fs.existsSync(enPath)) {
      fs.writeFileSync(enPath, generateSingleArticleHTML(topic, "en"), "utf-8");
      console.log(`✓ [EN Üretildi]: ${topic.file_en}`);
      createdCount++;
    }
  }

  // Auto rebuild sitemap
  const allHtml = fs.readdirSync(ROOT_DIR).filter(f => f.endsWith(".html") && !["admin.html", "stok.html"].includes(f));
  let sm = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  allHtml.sort().forEach(fn => {
    const url = fn === "index.html" ? "https://dmmarin.com/" : `https://dmmarin.com/${fn}`;
    const prio = fn === "index.html" ? "1.0" : (fn.startsWith("blog") || fn.startsWith("rehber") ? "0.9" : "0.8");
    sm += `  <url><loc>{url}</loc><changefreq>weekly</changefreq><priority>{prio}</priority></url>\n`.replace('{url}', url).replace('{prio}', prio);
  });
  sm += '</urlset>\n';
  fs.writeFileSync(path.join(ROOT_DIR, "sitemap.xml"), sm, "utf-8");

  console.log(`🎯 Ajan Döngüsü Tamamlandı: ${createdCount} yeni makale üretildi. Toplam İndeksli Sayfa: ${allHtml.length}`);
  console.log("=".repeat(70));
}

if (require.main === module) {
  runAgentCycle();
}

module.exports = { runAgentCycle, MAX_BLOG_LIMIT, getExistingBlogCount };
