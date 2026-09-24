const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const MASTER_JSON_PATH = path.join(ROOT_DIR, 'assets/data/dm_marin_master_oem_catalog.json');
const PUBLIC_PARTS_PATH = path.join(ROOT_DIR, 'marin-yedek-parca.html');

const catalog = JSON.parse(fs.readFileSync(MASTER_JSON_PATH, 'utf8'));

// Select top 260 parts across all essential brands
const priorityOrder = [
  "Volvo Penta", "Yanmar", "MAN Marine", "MAN", "Cummins / Onan", "Cummins Marine", 
  "Onan Generator", "Kohler", "Kohler Generator", "Evrensel / Marin", "Parker Racor", 
  "Separ Filter", "Jabsco", "Johnson Pump", "ZF Marine", "Tecnoseal"
];

const candidateCodes = Object.keys(catalog);
candidateCodes.sort((a, b) => {
  const brandA = catalog[a].brand || "";
  const brandB = catalog[b].brand || "";
  const idxA = priorityOrder.findIndex(p => brandA.includes(p));
  const idxB = priorityOrder.findIndex(p => brandB.includes(p));
  const rankA = idxA === -1 ? 999 : idxA;
  const rankB = idxB === -1 ? 999 : idxB;
  if (rankA !== rankB) return rankA - rankB;
  return a.localeCompare(b);
});

// Take top 260 parts
const selectedCodes = candidateCodes.slice(0, 260);
console.log(`Selected ${selectedCodes.length} parts for public marin-yedek-parca.html table.`);

// Generate HTML rows
let rowsHtml = '';
const schemaItemList = [];

selectedCodes.forEach((code, index) => {
  const item = catalog[code];
  const brand = item.brand || "Evrensel / Marin";
  const name = item.name || "";
  const category = item.category || "Filtreler";
  const models = item.models || "-";
  const cross = item.cross || "-";
  const interval = item.interval || "Sezonluk / 200 Saat";
  const specs = item.specs || "";

  // WhatsApp text
  const waMsg = encodeURIComponent(`Merhaba, DM MARİN web sitenizden ${brand} ${code} referanslı parça (${name}) için fiyat ve stok durumu öğrenmek istiyorum.`);
  const waUrl = `https://wa.me/905437240992?text=${waMsg}`;

  // Brand tag for filter
  let brandTag = "other";
  if (brand.includes("Volvo")) brandTag = "volvo";
  else if (brand.includes("Yanmar")) brandTag = "yanmar";
  else if (brand.includes("MAN")) brandTag = "man";
  else if (brand.includes("Onan") || brand.includes("Kohler") || brand.includes("Cummins")) brandTag = "generator";
  else if (brand.includes("Racor") || brand.includes("Separ")) brandTag = "racor";
  else if (category.includes("Kuyruk") || category.includes("Şanzıman") || category.includes("İmpeller")) brandTag = "drive";

  // Category badge color
  let catBadgeStyle = "background:#e0f2fe;color:#0369a1;";
  if (category.includes("Filtre")) catBadgeStyle = "background:#fef3c7;color:#92400e;";
  else if (category.includes("İmpeller") || category.includes("Soğutma")) catBadgeStyle = "background:#dbeafe;color:#1e40af;";
  else if (category.includes("Kayış")) catBadgeStyle = "background:#f3e8ff;color:#6b21a8;";
  else if (category.includes("Tutya") || category.includes("Anot")) catBadgeStyle = "background:#e2e8f0;color:#334155;";
  else if (category.includes("Kuyruk") || category.includes("Şanzıman")) catBadgeStyle = "background:#ffedd5;color:#9a3412;";
  else if (category.includes("Yağ") || category.includes("Sıvı")) catBadgeStyle = "background:#dcfce7;color:#166534;";
  else if (category.includes("Elektrik") || category.includes("Sensör")) catBadgeStyle = "background:#fee2e2;color:#991b1b;";

  // Brand badge style
  let brandBadgeStyle = "background:#1e293b;color:#fff;";
  if (brand.includes("Volvo")) brandBadgeStyle = "background:#003057;color:#fff;";
  else if (brand.includes("Yanmar")) brandBadgeStyle = "background:#c8102e;color:#fff;";
  else if (brand.includes("MAN")) brandBadgeStyle = "background:#002b49;color:#fff;";
  else if (brand.includes("Kohler") || brand.includes("Onan")) brandBadgeStyle = "background:#0f766e;color:#fff;";

  rowsHtml += `
    <tr class="part-row" data-brand="${brandTag}" data-search="${code.toLowerCase()} ${brand.toLowerCase()} ${name.toLowerCase()} ${models.toLowerCase()} ${cross.toLowerCase()} ${category.toLowerCase()}">
      <td class="col-oem">
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
          <span class="part-code-badge">${code}</span>
          <span class="part-brand-badge" style="${brandBadgeStyle}">${brand}</span>
        </div>
      </td>
      <td class="col-name">
        <strong class="part-title">${name}</strong>
        <div class="part-models"><span style="color:#0284c7;font-weight:600">Uyum:</span> ${models}</div>
        <div class="part-cross" style="font-size:12px;color:#64748b;margin-top:2px"><em>Muadiller:</em> ${cross}</div>
      </td>
      <td class="col-cat">
        <span class="part-cat-badge" style="${catBadgeStyle}">${category}</span>
        <div style="font-size:11.5px;color:#64748b;margin-top:4px">${interval}</div>
      </td>
      <td class="col-action" style="text-align:right">
        <a href="${waUrl}" target="_blank" rel="noopener" class="part-wa-btn" title="WhatsApp ile Parça Sor">
          <span>💬 Parça Sor</span>
        </a>
      </td>
    </tr>`;

  // Push to schema
  if (index < 50) {
    schemaItemList.push({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": name,
        "sku": code,
        "mpn": code,
        "brand": {
          "@type": "Brand",
          "name": brand
        },
        "category": category,
        "description": `${models} ile tam uyumlu marin yedek parça (${code}). Muadiller: ${cross}.`,
        "offers": {
          "@type": "Offer",
          "priceCurrency": "TRY",
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "LocalBusiness",
            "name": "DM MARİN"
          }
        }
      }
    });
  }
});

// Build the complete Section HTML
const catalogSectionHtml = `
<!-- ============================================================ -->
<!-- INTERACTIVE OEM MARINE PARTS DIRECTORY & SEO SEARCH ENGINE   -->
<!-- ============================================================ -->
<section class="section" id="oem-katalog" style="background:#f8fafc;padding:50px 0;border-top:1px solid #e2e8f0;border-bottom:1px solid #e2e8f0">
  <div class="container" style="max-width:1200px;margin:0 auto;padding:0 20px">
    
    <div style="text-align:center;max-width:860px;margin:0 auto 35px">
      <div style="display:inline-flex;align-items:center;gap:8px;background:#e0f2fe;color:#0369a1;padding:6px 14px;border-radius:20px;font-size:13px;font-weight:700;margin-bottom:14px">
        ⚓ 690+ ORİJİNAL VE OEM UYUMLU PARÇA
      </div>
      <h2 style="font-size:32px;font-weight:800;color:#0f172a;margin-bottom:12px;line-height:1.25">
        Marin Yedek Parça & OEM Referans Arama Portalı
      </h2>
      <p style="font-size:16px;color:#475569;line-height:1.6">
        Volvo Penta (D1-D16, IPS, DPH), Yanmar, MAN Marine ve marin jeneratörler için orijinal OEM parça kodları, motor uyumlulukları ve muadil referansları. İhtiyacınız olan parçayı anında arayın veya WhatsApp'tan sorgulayın.
      </p>
    </div>

    <!-- SEARCH & FILTER TOOLBAR -->
    <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:14px;box-shadow:0 4px 16px rgba(0,0,0,0.04);padding:20px;margin-bottom:24px">
      <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center;margin-bottom:16px">
        <div style="flex:1;min-width:280px;position:relative">
          <input type="text" id="partsSearchInput" placeholder="🔍 Parça Kodu (Örn: 21951356, 129470, 51.05504), Motor Modeli (D4, D6, 4JH, V8) veya Parça Adı..." 
            style="width:100%;height:46px;padding:0 16px 0 42px;border:1.5px solid #cbd5e1;border-radius:10px;font-size:15px;color:#0f172a;outline:none;transition:border-color 0.2s"
            onfocus="this.style.borderColor='#0284c7'" onblur="this.style.borderColor='#cbd5e1'" oninput="filterPartsCatalog()">
          <span style="position:absolute;left:14px;top:13px;font-size:17px;color:#94a3b8">🔍</span>
        </div>
        <button type="button" onclick="clearPartsSearch()" style="height:46px;padding:0 18px;border:1px solid #e2e8f0;background:#f1f5f9;color:#475569;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.2s"
          onmouseover="this.style.background='#e2e8f0'" onmouseout="this.style.background='#f1f5f9'">
          Temizle
        </button>
      </div>

      <!-- FILTER TABS -->
      <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
        <span style="font-size:13px;font-weight:700;color:#64748b;margin-right:4px">Hızlı Filtre:</span>
        <button type="button" class="parts-tab-btn active" data-tab="all" onclick="setPartsTab('all', this)">Tümü (${selectedCodes.length})</button>
        <button type="button" class="parts-tab-btn" data-tab="volvo" onclick="setPartsTab('volvo', this)">🚤 Volvo Penta</button>
        <button type="button" class="parts-tab-btn" data-tab="yanmar" onclick="setPartsTab('yanmar', this)">⛵ Yanmar Marine</button>
        <button type="button" class="parts-tab-btn" data-tab="man" onclick="setPartsTab('man', this)">🛳️ MAN Marine</button>
        <button type="button" class="parts-tab-btn" data-tab="generator" onclick="setPartsTab('generator', this)">⚡ Marin Jeneratör (Onan/Kohler)</button>
        <button type="button" class="parts-tab-btn" data-tab="racor" onclick="setPartsTab('racor', this)">🌀 Yakıt Su Ayırıcı (Racor/Separ)</button>
        <button type="button" class="parts-tab-btn" data-tab="drive" onclick="setPartsTab('drive', this)">⚙️ Kuyruk, Şanzıman & İmpeller</button>
      </div>

      <div style="display:flex;justify-content:space-between;align-items:center;margin-top:14px;padding-top:12px;border-top:1px solid #f1f5f9;font-size:13px;color:#64748b">
        <div><strong id="visiblePartsCount">${selectedCodes.length}</strong> parça listeleniyor</div>
        <div style="font-size:12px">Stokta bulunmayan parçalar 24-48 saatte marin depodan temin edilir.</div>
      </div>
    </div>

    <!-- TABLE CONTAINER -->
    <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:14px;overflow:hidden;box-shadow:0 4px 16px rgba(0,0,0,0.04)">
      <div style="overflow-x:auto">
        <table style="width:100%;border-collapse:collapse;text-align:left;font-size:14px" id="partsTable">
          <thead>
            <tr style="background:#0f172a;color:#ffffff;font-size:13px;text-transform:uppercase;letter-spacing:0.5px">
              <th style="padding:14px 18px;width:220px">OEM Kodu & Marka</th>
              <th style="padding:14px 18px">Parça Tanımı & Motor Uyumluluğu</th>
              <th style="padding:14px 18px;width:180px">Kategori & Bakım</th>
              <th style="padding:14px 18px;width:140px;text-align:right">İletişim</th>
            </tr>
          </thead>
          <tbody id="partsTbody">
            ${rowsHtml}
          </tbody>
        </table>
      </div>
    </div>

    <!-- CALLOUT BOX IF PART NOT FOUND -->
    <div style="margin-top:30px;background:linear-gradient(135deg, #071b2b, #0f3554);border-radius:14px;padding:26px 30px;color:#ffffff;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:20px">
      <div style="max-width:700px">
        <h3 style="font-size:20px;font-weight:700;margin-bottom:6px">Aradığınız Parça Numarasını Listede Bulamadınız mı?</h3>
        <p style="font-size:14px;color:#cbd5e1;line-height:1.5;margin:0">
          DM MARİN merkez atölyesinde 690+ kayıtlı parça ve doğrudan üretici katalog erişimi mevcuttur. Motor plakanızın veya eski parçanızın fotoğrafını WhatsApp'tan gönderin, 15 dakika içinde tam uyumlu parça kodunu ve stok durumunu bildirelim.
        </p>
      </div>
      <div>
        <a href="https://wa.me/905437240992?text=Merhaba,%20teknemin%20motor%20plakas%C4%B1%20ile%20yedek%20par%C3%A7a%20sorgulamak%20istiyorum." target="_blank" rel="noopener"
          style="display:inline-flex;align-items:center;gap:8px;background:#22c55e;color:#ffffff;text-decoration:none;font-weight:700;padding:12px 22px;border-radius:10px;font-size:15px;box-shadow:0 4px 12px rgba(34,197,94,0.35);transition:background 0.2s"
          onmouseover="this.style.background='#16a34a'" onmouseout="this.style.background='#22c55e'">
          <span>💬 Plaka ile Parça Sor</span>
        </a>
      </div>
    </div>

  </div>
</section>

<!-- STYLES & INTERACTIVE SCRIPT FOR PARTS DIRECTORY -->
<style>
.parts-tab-btn {
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  color: #334155;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.parts-tab-btn:hover {
  background: #e2e8f0;
}
.parts-tab-btn.active {
  background: #0284c7;
  color: #ffffff;
  border-color: #0284c7;
}
.part-row {
  border-bottom: 1px solid #f1f5f9;
  transition: background 0.15s;
}
.part-row:hover {
  background: #f8fafc;
}
.part-code-badge {
  font-family: monospace;
  font-size: 14px;
  font-weight: 800;
  color: #0f172a;
  background: #f1f5f9;
  padding: 4px 8px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  display: inline-block;
}
.part-brand-badge {
  font-size: 11px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 6px;
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}
.part-title {
  color: #0f172a;
  font-size: 14.5px;
  display: block;
  margin-bottom: 4px;
}
.part-models {
  font-size: 13px;
  color: #475569;
}
.part-cat-badge {
  font-size: 11.5px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 6px;
  display: inline-block;
}
.part-wa-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: #22c55e;
  color: #ffffff;
  text-decoration: none;
  font-weight: 700;
  padding: 7px 12px;
  border-radius: 8px;
  font-size: 12.5px;
  transition: all 0.2s;
  box-shadow: 0 2px 6px rgba(34,197,94,0.25);
  white-space: nowrap;
}
.part-wa-btn:hover {
  background: #16a34a;
  transform: translateY(-1px);
}
@media (max-width: 768px) {
  #partsTable th:nth-child(3),
  #partsTable td:nth-child(3) {
    display: none;
  }
  .part-code-badge { font-size: 12.5px; }
  .part-title { font-size: 13.5px; }
}
</style>

<script>
let currentPartsTab = 'all';

function setPartsTab(tab, btn) {
  currentPartsTab = tab;
  document.querySelectorAll('.parts-tab-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  filterPartsCatalog();
}

function clearPartsSearch() {
  const inp = document.getElementById('partsSearchInput');
  if (inp) {
    inp.value = '';
    filterPartsCatalog();
  }
}

function filterPartsCatalog() {
  const query = (document.getElementById('partsSearchInput')?.value || '').trim().toLowerCase();
  const rows = document.querySelectorAll('.part-row');
  let visibleCount = 0;

  rows.forEach(row => {
    const brand = row.getAttribute('data-brand') || '';
    const searchData = row.getAttribute('data-search') || '';

    const matchesTab = currentPartsTab === 'all' || brand === currentPartsTab;
    const matchesQuery = !query || searchData.includes(query);

    if (matchesTab && matchesQuery) {
      row.style.display = '';
      visibleCount++;
    } else {
      row.style.display = 'none';
    }
  });

  const countEl = document.getElementById('visiblePartsCount');
  if (countEl) countEl.textContent = visibleCount;
}
</script>
<!-- ============================================================ -->
`;

// Read current marin-yedek-parca.html
let htmlContent = fs.readFileSync(PUBLIC_PARTS_PATH, 'utf8');

// Insert Schema JSON-LD if not present
const schemaJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "DM MARİN Orijinal ve OEM Marin Yedek Parça Kataloğu",
  "description": "Volvo Penta, Yanmar, MAN Marine, Cummins Onan ve Kohler jeneratör yedek parçaları. Orijinal OEM numaraları ve muadil referansları.",
  "numberOfItems": schemaItemList.length,
  "itemListElement": schemaItemList
};
const schemaString = `\n<script type="application/ld+json">\n${JSON.stringify(schemaJsonLd, null, 2)}\n</script>\n`;

// Add schema before </head> if not already added
if (!htmlContent.includes('"name": "DM MARİN Orijinal ve OEM Marin Yedek Parça Kataloğu"')) {
  htmlContent = htmlContent.replace('</head>', schemaString + '</head>');
}

// Check where to insert section
// We can insert it right before `<section class="section" style="background:var(--paper)"><div class="container"><div class="intro"><h2  data-i18n="faq_h2">`
const targetPos = htmlContent.indexOf('<section class="section" style="background:var(--paper)">');
if (targetPos !== -1) {
  // Check if oem-katalog already exists
  if (htmlContent.includes('id="oem-katalog"')) {
    // replace existing
    const existingStart = htmlContent.indexOf('<!-- ============================================================ -->\n<!-- INTERACTIVE OEM MARINE PARTS DIRECTORY');
    const existingEnd = htmlContent.indexOf('<!-- ============================================================ -->\n', existingStart + 50) + '<!-- ============================================================ -->\n'.length;
    if (existingStart !== -1 && existingEnd !== -1) {
      htmlContent = htmlContent.substring(0, existingStart) + catalogSectionHtml + htmlContent.substring(existingEnd);
    }
  } else {
    htmlContent = htmlContent.substring(0, targetPos) + catalogSectionHtml + htmlContent.substring(targetPos);
  }
  fs.writeFileSync(PUBLIC_PARTS_PATH, htmlContent, 'utf8');
  console.log("Successfully injected 260 parts directory and Schema into marin-yedek-parca.html!");
} else {
  console.error("Could not find insertion position in marin-yedek-parca.html");
}
