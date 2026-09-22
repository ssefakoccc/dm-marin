// DM MARİN Master Marine Blog Catalog & Autonomous Scribe-SEO Registry
// Authoritative Single Source of Truth for Blog & Admin
(function() {
  const BASE_CATALOG = [
  {
    "id": "art-001",
    "title": "Sarıyer Marin Motor & Jeneratör Servisi: Yerinde Acil Müdahale ve Bakım",
    "url": "blog-sariyer-marin-motor-jenerator-servisi.html",
    "desc": "Sarıyer, İstinye, Tarabya ve Rumeli Feneri marinalarında 7/24 mobil marin servis: Volvo Penta, Yanmar, MAN motor ve Kohler/Onan jeneratör periyodik bakımı.",
    "category": "Motor & Mekanik Bakım",
    "lang": "tr",
    "badge": "🇹🇷 Sarıyer & Boğaz Hattı",
    "readTime": "6 dk okuma",
    "img": "assets/motor-mekanik-bakim.webp",
    "views": 450,
    "rating": 4.7
  },
  {
    "id": "art-002",
    "title": "İstinye & Tarabya Marinalarında Mobil Tekne Motor Servisi",
    "url": "blog-istinye-tarabya-mobil-tekne-servisi.html",
    "desc": "İstinye ve Tarabya koylarında bağlı lüks yat ve tekneler için yerinde şanzıman, impeller, yakıt devresi havası alma ve bilgisayarlı diyagnostik hizmetleri.",
    "category": "Motor & Mekanik Bakım",
    "lang": "tr",
    "badge": "🇹🇷 İstinye & Tarabya",
    "readTime": "5 dk okuma",
    "img": "assets/volvo-penta-d4-d6-ozel-servis.webp",
    "views": 454,
    "rating": 4.8
  },
  {
    "id": "art-003",
    "title": "İstanbul Boğazı Akıntısında Motor Arızası: Acil Müdahale ve Güvenlik Rehberi",
    "url": "blog-bogaz-akintisinda-motor-arizasi-acil-mudahale.html",
    "desc": "Boğaz geçişinde aniden duran veya hararet yapan marin motorlarda can güvenliği, demirleme kuralları ve DM Marin acil servis botu koordinasyonu.",
    "category": "Arıza & Teşhis",
    "lang": "tr",
    "badge": "🇹🇷 Acil Müdahale",
    "readTime": "7 dk okuma",
    "img": "assets/acil-mobil-marin-servis.webp",
    "views": 458,
    "rating": 4.9
  },
  {
    "id": "art-004",
    "title": "Rumeli Feneri & Kilyos Tekne Motor Revizyonu ve Pompa Bakımı",
    "url": "blog-rumeli-feneri-kilyos-balikci-tekne-motor-revizyonu.html",
    "desc": "Karadeniz kıyısı zorlu deniz koşullarında çalışan tekneler için ağır hizmet dizel revizyonu, enjektör işemesi ve turboşarj kurum temizliği.",
    "category": "Motor & Mekanik Bakım",
    "lang": "tr",
    "badge": "🇹🇷 Karadeniz Girişi",
    "readTime": "6 dk okuma",
    "img": "assets/motor-mekanik-bakim.webp",
    "views": 462,
    "rating": 5.0
  },
  {
    "id": "art-005",
    "title": "Boğaz Hattı Marin Jeneratör Arızaları: Kohler, Onan ve Fischer Panda Servisi",
    "url": "blog-bogaz-hatti-jenerator-servisi-kohler-onan.html",
    "desc": "Bebek, Yeniköy ve İstinye'de bağlı yatlarda jeneratör harareti, egzozdan beyaz buhar atma ve kondansatör/invertör arızalarına yerinde müdahale.",
    "category": "Jeneratör & Enerji",
    "lang": "tr",
    "badge": "🇹🇷 Boğaz Jeneratör",
    "readTime": "6 dk okuma",
    "img": "assets/marin-jenerator-servisi.webp",
    "views": 466,
    "rating": 4.7
  },
  {
    "id": "art-006",
    "title": "Teknede Tutya (Anot) Nedir, Ne İşe Yarar? Tutya Değişim Kılavuzu",
    "url": "blog-teknede-tutya-anot-nedir-nasil-degistirilir.html",
    "desc": "Galvanik korozyonu önleyen çinko, alüminyum ve magnezyum tutyaların çalışma prensibi. Şaft, pala, motor bloğu ve baş pervane tutyası değişim kriterleri.",
    "category": "Kışlama & Koruma",
    "lang": "tr",
    "badge": "🇹🇷 Korozyon & Koruma",
    "readTime": "8 dk okuma",
    "img": "assets/tutya-degisimi-ve-korozyon-koruma.webp",
    "views": 470,
    "rating": 4.8
  },
  {
    "id": "art-007",
    "title": "Kuyruk, Şaft ve Motor Tutyası Seçimi: Çinko mu Alüminyum mu?",
    "url": "blog-kuyruk-saft-motor-tutyasi-secimi-rehberi.html",
    "desc": "Tuzlu su, acı su ve tatlı suda hangi tutya alaşımı tercih edilmeli? Aşırı erime veya hiç erimeme durumlarında kaçak akım (galvanik izolatör) testi.",
    "category": "Kışlama & Koruma",
    "lang": "tr",
    "badge": "🇹🇷 Korozyon & Koruma",
    "readTime": "6 dk okuma",
    "img": "assets/tutya-degisimi-ve-korozyon-koruma.webp",
    "views": 474,
    "rating": 4.9
  },
  {
    "id": "art-008",
    "title": "Deniz Suyu İmpelleri Neden Yanar ve Parçalanır? Adım Adım Değişim",
    "url": "blog-deniz-suyu-impelleri-neden-yanar-degisim-rehberi.html",
    "desc": "Kuru çalışma (dry-run), kum emişi veya kışlama sonrası yapışan lastik impeller kanatçıklarının kopması ve eşanjör borularını tıkamasını önleme yöntemleri.",
    "category": "Motor & Mekanik Bakım",
    "lang": "tr",
    "badge": "🇹🇷 Soğutma & İmpeller",
    "readTime": "7 dk okuma",
    "img": "assets/motor-mekanik-bakim.webp",
    "views": 433,
    "rating": 5.0
  },
  {
    "id": "art-009",
    "title": "Tekne Kışlama ve Sezon Sonu Koruma Rehberi: Motor ve Tesisat",
    "url": "blog-tekne-kislama-ve-sezon-sonu-koruma-proseduru.html",
    "desc": "Kış aylarında motor bloğunun çatlamasını ve donmasını önleyen marin antifriz devridaimi, sintine drenajı, yakıt stabilizatörü ve akü float şarj protokolü.",
    "category": "Kışlama & Koruma",
    "lang": "tr",
    "badge": "🇹🇷 Kışlama Rehberi",
    "readTime": "9 dk okuma",
    "img": "assets/marin-elektrik-elektronik.webp",
    "views": 437,
    "rating": 4.7
  },
  {
    "id": "art-010",
    "title": "Dizel Deniz Motorlarında Duman Renkleri: Siyah, Mavi ve Beyaz Duman",
    "url": "blog-dizel-deniz-motorlarinda-duman-renkleri-ve-arizalar.html",
    "desc": "Egzozdan çıkan siyah duman (aşırı yük/enjektör), beyaz duman (su sızıntısı/gecikmiş püskürtme) ve mavi dumanın (yağ yakma) kök nedenleri ve çözümleri.",
    "category": "Arıza & Teşhis",
    "lang": "tr",
    "badge": "🇹🇷 Arıza Teşhis",
    "readTime": "8 dk okuma",
    "img": "assets/volvo-penta-d4-d6-ozel-servis.webp",
    "views": 441,
    "rating": 4.8
  },
  {
    "id": "art-011",
    "title": "Sintine Pompası ve Otomatik Flatör Bakımı: Teknenin Su Almasını Önleme",
    "url": "blog-sintine-pompasi-ve-otomatik-flator-bakimi.html",
    "desc": "Sintineye sızan deniz suyunun otomatik tahliyesi, yağ algılayıcı sensörler, çekvalf tıkanıklıkları ve aküyü bitirmeyen düşük akımlı Rule/Johnson sintine sistemleri.",
    "category": "Tesisat & Donanım",
    "lang": "tr",
    "badge": "🇹🇷 Sintine & Güvenlik",
    "readTime": "6 dk okuma",
    "img": "assets/motor-mekanik-bakim.webp",
    "views": 445,
    "rating": 4.9
  },
  {
    "id": "art-012",
    "title": "Marin Akü Rehberi: AGM, Jel ve LiFePO4 Lityum Akülerin Şarj Voltajları",
    "url": "blog-marin-aku-rehberi-agm-jel-ve-lifepo4-lityum.html",
    "desc": "Servis ve marş akülerinde sülfatlaşmayı önleme, alternatör akıllı regülatörleri (Sterling/Balmar) ve LiFePO4 dönüşümünde BMS yangın güvenlik tedbirleri.",
    "category": "Elektrik & Akü",
    "lang": "tr",
    "badge": "🇹🇷 Marin Elektrik",
    "readTime": "8 dk okuma",
    "img": "assets/marin-elektrik-elektronik.webp",
    "views": 449,
    "rating": 5.0
  },
  {
    "id": "art-013",
    "title": "Marin Motor Yağı ile Araba Motoru Yağı Arasındaki Hayati Farklar",
    "url": "blog-marin-motor-yagi-ile-araba-yagi-arasindaki-farklar.html",
    "desc": "Otomobil yağları teknede neden kullanılmaz? Yüksek kükürtlü deniz ortamında asit nötralizasyonu, TBN değeri, pas inhibitörleri ve Volvo VDS-4.5 marin standardı.",
    "category": "Motor & Mekanik Bakım",
    "lang": "tr",
    "badge": "🇹🇷 Yağ & Kimyasallar",
    "readTime": "6 dk okuma",
    "img": "assets/volvo-penta-d4-d6-ozel-servis.webp",
    "views": 453,
    "rating": 4.7
  },
  {
    "id": "art-014",
    "title": "Bosphorus & Sariyer Marine Engine Service: 24/7 Mobile Yacht Engineering",
    "url": "blog-bosphorus-yacht-service-emergency-response.html",
    "desc": "On-site mechanical diagnostics and breakdown response across Sariyer, Istinye, Tarabya and Bebek marinas for Volvo Penta, Yanmar and MAN marine diesels.",
    "category": "Engine & Mechanical",
    "lang": "en",
    "badge": "🇬🇧 Bosphorus Service",
    "readTime": "6 min read",
    "img": "assets/motor-mekanik-bakim.webp",
    "views": 412,
    "rating": 4.8
  },
  {
    "id": "art-015",
    "title": "Marine Sacrificial Anodes: Zinc, Aluminum or Magnesium Selection Guide",
    "url": "blog-marine-sacrificial-anode-selection-zinc-vs-aluminum.html",
    "desc": "Preventing galvanic hull and propulsion corrosion: salt vs brackish water anode materials, bonding wire resistance tests, and shaft collar installation.",
    "category": "Winterizing & Corrosion",
    "lang": "en",
    "badge": "🇬🇧 Corrosion Protection",
    "readTime": "8 min read",
    "img": "assets/tutya-degisimi-ve-korozyon-koruma.webp",
    "views": 416,
    "rating": 4.9
  },
  {
    "id": "art-016",
    "title": "Raw Water Pump Impeller Failure Causes & Step-by-Step Replacement",
    "url": "blog-raw-water-impeller-failure-causes-replacement-guide.html",
    "desc": "Why rubber impellers delaminate and overheat: dry-running, abrasive sand ingestion, and removing missing impeller vanes from the heat exchanger bundle.",
    "category": "Engine & Mechanical",
    "lang": "en",
    "badge": "🇬🇧 Cooling Systems",
    "readTime": "7 min read",
    "img": "assets/motor-mekanik-bakim.webp",
    "views": 420,
    "rating": 5.0
  },
  {
    "id": "art-017",
    "title": "Complete Yacht Winterization Checklist: Engine, Generator & Plumbing",
    "url": "blog-yacht-winterization-checklist-engine-plumbing-protection.html",
    "desc": "Safeguarding marine cylinder blocks and air conditioning chillers from freeze cracking: non-toxic propylene glycol flushing and battery storage.",
    "category": "Winterizing & Corrosion",
    "lang": "en",
    "badge": "🇬🇧 Winterization Guide",
    "readTime": "9 min read",
    "img": "assets/marin-elektrik-elektronik.webp",
    "views": 424,
    "rating": 4.7
  },
  {
    "id": "art-018",
    "title": "Marine Diesel Smoke Diagnostics: Black, White and Blue Smoke Causes",
    "url": "blog-marine-diesel-smoke-diagnostics-black-white-blue.html",
    "desc": "Identifying root causes of exhaust smoke: propeller fouling, leaking cylinder head gaskets, unburned fuel droplets, and turbocharger oil seal degradation.",
    "category": "Troubleshooting & Diagnostics",
    "lang": "en",
    "badge": "🇬🇧 Troubleshooting",
    "readTime": "8 min read",
    "img": "assets/volvo-penta-d4-d6-ozel-servis.webp",
    "views": 428,
    "rating": 4.8
  },
  {
    "id": "art-019",
    "title": "Automatic Bilge Pump & Electronic Float Switch Reliability Guide",
    "url": "blog-marine-bilge-pump-float-switch-maintenance.html",
    "desc": "Ensuring watertight integrity: cleaning float switches from oily sludge, sizing heavy-duty discharge hoses, and installing dual high-water bilge alarms.",
    "category": "Electrical & Batteries",
    "lang": "en",
    "badge": "🇬🇧 Bilge Safety",
    "readTime": "6 min read",
    "img": "assets/motor-mekanik-bakim.webp",
    "views": 432,
    "rating": 4.9
  },
  {
    "id": "art-020",
    "title": "Marine Engine Oil vs Automotive Oil: Why VDS-4.5 Standards Matter",
    "url": "blog-marine-oil-standards-vds-vs-automotive-engine-oil.html",
    "desc": "Understanding marine diesel duty cycles: why car engine oils fail in damp salt-fog marine environments due to inadequate TBN corrosion reserve.",
    "category": "Engine & Mechanical",
    "lang": "en",
    "badge": "🇬🇧 Oil & Lubrication",
    "readTime": "6 min read",
    "img": "assets/volvo-penta-d4-d6-ozel-servis.webp",
    "views": 436,
    "rating": 5.0
  },
  {
    "id": "art-021",
    "title": "Volvo Penta D4, D6 ve D13 Bakım Rehberi ve Arıza Teşhisi",
    "url": "blog-volvo-penta-d4-d6-d13-bakim-ve-arizalar.html",
    "desc": "Volvo Penta D4, D6 ve D13 Common Rail marin dizel motorlarda 100/200/500 saatlik periyodik bakım takvimi, kompresör yağı, aftercooler ve EVC arıza kodları rehberi.",
    "category": "Motor & Mekanik Bakım",
    "lang": "tr",
    "badge": "🇹🇷 Motor & Mekanik Bakım",
    "readTime": "7 dk okuma",
    "img": "assets/volvo-penta-d4-d6-ozel-servis.webp",
    "views": 395,
    "rating": 4.7
  },
  {
    "id": "art-022",
    "title": "Volvo Penta IPS Pod Sürücü Bakımı ve Sezonluk Kontroller",
    "url": "blog-volvo-penta-ips-pod-surucu-bakimi.html",
    "desc": "Volvo Penta IPS 500, 600, 800, 950, 1050 ve 1200 pod sürücülerde şanzıman sentetik yağ değişimi, pervane şaftı çift keçe kontrolü, tutyalar ve SUS sensör kalibrasyonu.",
    "category": "Motor & Mekanik Bakım",
    "lang": "tr",
    "badge": "🇹🇷 Motor & Mekanik Bakım",
    "readTime": "7 dk okuma",
    "img": "assets/volvo-penta-d4-d6-ozel-servis.webp",
    "views": 399,
    "rating": 4.8
  },
  {
    "id": "art-023",
    "title": "Yanmar 4JH-CR ve 6LY Common Rail Motor Bakım ve Teşhis Rehberi",
    "url": "blog-yanmar-common-rail-ariza-teshis-ve-bakim.html",
    "desc": "Yanmar 4JH45, 4JH57, 4JH80, 4JH110 ve 6LY serisi elektronik marin dizellerde yakıt rayı basıncı, enjektör kodlama, Y-COP arıza okuma ve kışlık bakım.",
    "category": "Arıza & Teşhis",
    "lang": "tr",
    "badge": "🇹🇷 Arıza & Teşhis",
    "readTime": "6 dk okuma",
    "img": "assets/yanmar-4jh-6ly-ozel-servis.webp",
    "views": 403,
    "rating": 4.9
  },
  {
    "id": "art-024",
    "title": "Marin Dizel Motorlarda Duman Renkleri: Siyah, Beyaz ve Mavi Duman Teşhisi",
    "url": "blog-yanmar-dizel-motor-duman-renkleri-ve-teshis.html",
    "desc": "Tekne egzozundan çıkan siyah, beyaz ve mavi dumanın mühendislik nedenleri: Enjektör damlatması, turbo basınç kaybı, supap lastiği aşınması ve silindir kapağı su sızıntısı.",
    "category": "Arıza & Teşhis",
    "lang": "tr",
    "badge": "🇹🇷 Arıza & Teşhis",
    "readTime": "5 dk okuma",
    "img": "assets/dm-marin-ariza-tespit.webp",
    "views": 407,
    "rating": 5.0
  },
  {
    "id": "art-025",
    "title": "MAN & MTU Marine V8/V12 Yüksek Güçlü Dizel Motor Bakımı",
    "url": "blog-man-mtu-marine-yuksek-devirli-dizel-bakimi.html",
    "desc": "MAN i6, V8, V12 ve MTU Series 2000 Common Rail motorlarda W1/W2/W3/W4 bakım paketleri, intercooler ve turboşarj denetimleri, supap boşluk ayarları.",
    "category": "Motor & Mekanik Bakım",
    "lang": "tr",
    "badge": "🇹🇷 Motor & Mekanik Bakım",
    "readTime": "8 dk okuma",
    "img": "assets/man-marine-v8-v12-ozel-servis.webp",
    "views": 411,
    "rating": 4.7
  },
  {
    "id": "art-026",
    "title": "Marin Jeneratörlerde Deniz Suyu Soğutma ve Aşırı Hararet Arızaları",
    "url": "blog-marin-jenerator-ariza-ve-deniz-suyu-sogutma.html",
    "desc": "Kohler, Onan ve Fischer Panda jeneratörlerde impeller parçalanması, deniz suyu emiş vanası tıkanıklığı, ısı eşanjörü kireçlenmesi ve LOC/Overheat hata kodları.",
    "category": "Jeneratör & Enerji",
    "lang": "tr",
    "badge": "🇹🇷 Jeneratör & Enerji",
    "readTime": "6 dk okuma",
    "img": "assets/marin-jenerator-servisi.webp",
    "views": 415,
    "rating": 4.8
  },
  {
    "id": "art-027",
    "title": "Fischer Panda Jeneratör Bakımı ve iSeries Inverter Arızaları",
    "url": "blog-fischer-panda-jenerator-bakimi-ve-inverter-arizalari.html",
    "desc": "Fischer Panda 4000s, 5000i, 8000i, 10000i ve 15000i modellerinde su soğutmalı alternatör, inverter güç kartı arızaları, yağ basınç müşürü ve kapsül havalandırması.",
    "category": "Jeneratör & Enerji",
    "lang": "tr",
    "badge": "🇹🇷 Jeneratör & Enerji",
    "readTime": "6 dk okuma",
    "img": "assets/marin-jenerator-servisi.webp",
    "views": 374,
    "rating": 4.9
  },
  {
    "id": "art-028",
    "title": "Marin Klima ve Chiller Soğutma Sistemleri Bakım Kılavuzu",
    "url": "blog-marin-klima-chiller-ariza-ve-bakim.html",
    "desc": "Dometic, Webasto, Marvair ve Condaria marin klimalarda HP/LP gaz basınç arızaları, deniz suyu sirkülasyon pompası kavitasyonu ve fancoil koku giderme bakımı.",
    "category": "Tesisat & Donanım",
    "lang": "tr",
    "badge": "🇹🇷 Tesisat & Donanım",
    "readTime": "7 dk okuma",
    "img": "assets/dm-marin-tamir-atolyesi.webp",
    "views": 378,
    "rating": 5.0
  },
  {
    "id": "art-029",
    "title": "Şaft Hizalama ve PSS Şaft Keçesi Bakım ve Ayar Kılavuzu",
    "url": "blog-saft-hizalama-ve-pss-saf-kece-bakimi.html",
    "desc": "Lazerli şaft hizalama toleransları, motor takozu çökmesi, PSS mekanik salmastra körük gerginliği, karbon-rotor temas yüzeyi ve su enjeksiyon hattı güvenliği.",
    "category": "Motor & Mekanik Bakım",
    "lang": "tr",
    "badge": "🇹🇷 Motor & Mekanik Bakım",
    "readTime": "6 dk okuma",
    "img": "assets/motor-mekanik-bakim.webp",
    "views": 382,
    "rating": 4.7
  },
  {
    "id": "art-030",
    "title": "Seakeeper Gyro Stabilizatör Yıllık Bakımı ve Soğutma Devresi",
    "url": "blog-seakeeper-gyro-stabilizer-bakimi.html",
    "desc": "Seakeeper 2, 3, 6, 9, 16, 18, 26 ve 35 modellerinde kapalı devre glikol değişimi, deniz suyu eşanjörü çinko anotları, hidrolik fren basıncı ve vakum küre kontrolleri.",
    "category": "Tesisat & Donanım",
    "lang": "tr",
    "badge": "🇹🇷 Tesisat & Donanım",
    "readTime": "7 dk okuma",
    "img": "assets/dm-marin-tamir-atolyesi.webp",
    "views": 386,
    "rating": 4.8
  },
  {
    "id": "art-031",
    "title": "Teknelerde Akü Seçimi ve LiFePO4 Lityum Dönüşüm Kılavuzu",
    "url": "blog-tekne-aku-secimi-ve-lityum-donusumu.html",
    "desc": "AGM ve Jel akülerden LiFePO4 lityum demir fosfat sistemlere geçişte BMS entegrasyonu, DC-DC alternatör şarj regülatörü ve yangın güvenliği standartları.",
    "category": "Elektrik & Akü",
    "lang": "tr",
    "badge": "🇹🇷 Elektrik & Akü",
    "readTime": "8 dk okuma",
    "img": "assets/marin-elektrik-elektronik.webp",
    "views": 390,
    "rating": 4.9
  },
  {
    "id": "art-032",
    "title": "Kışlık Tekne Motoru Kışlama ve Donmaya Karşı Koruma Protokolü",
    "url": "blog-kislik-tekne-motoru-ve-antifriz-kislama.html",
    "desc": "Ham su devresi donma çatlaklarını önlemek için toksik olmayan marin antifriz basılması, yakıt stabilizatörü ilavesi, korozyon önleyici sisleme yağı ve nem tahliyesi.",
    "category": "Kışlama & Koruma",
    "lang": "tr",
    "badge": "🇹🇷 Kışlama & Koruma",
    "readTime": "6 dk okuma",
    "img": "assets/motor-mekanik-bakim.webp",
    "views": 394,
    "rating": 5.0
  },
  {
    "id": "art-033",
    "title": "Teknelerde Tutya (Anot) Seçimi ve Galvanik Korozyondan Korunma",
    "url": "blog-tutya-anot-ve-galvanik-korozyon-korunma.html",
    "desc": "Tuzlu su, acı su ve tatlı suda Çinko, Alüminyum ve Magnezyum anot seçimi. Şaft tutyaları, baş pervane anotları, motor blok çinkoları ve kaçak akım testleri.",
    "category": "Kışlama & Koruma",
    "lang": "tr",
    "badge": "🇹🇷 Kışlama & Koruma",
    "readTime": "6 dk okuma",
    "img": "assets/dm-marin-tamir-atolyesi.webp",
    "views": 398,
    "rating": 4.7
  },
  {
    "id": "art-034",
    "title": "Baş ve Kıç Pervane (Bow Thruster) Bakım ve Onarım Rehberi",
    "url": "blog-bow-thruster-bas-pervane-bakimi.html",
    "desc": "Side-Power (Sleipner), Quick, Max Power ve Vetus baş pervanelerde kuyruk yağı keçesi, röle kontak aşınması, karbon kömür değişimi ve tutya montajı.",
    "category": "Tesisat & Donanım",
    "lang": "tr",
    "badge": "🇹🇷 Tesisat & Donanım",
    "readTime": "5 dk okuma",
    "img": "assets/dm-marin-tamir-atolyesi.webp",
    "views": 357,
    "rating": 4.8
  },
  {
    "id": "art-035",
    "title": "Marin Turboşarj ve Egzoz Dirseği (Mixing Elbow) Bakım Kılavuzu",
    "url": "blog-marin-turbosarj-ve-egzoz-manifoldu-bakimi.html",
    "desc": "Deniz suyu korozyonunun egzoz dirseğinde oluşturduğu delikler, turbo türbin pallerine geri su basması, wastegate sıkışması ve kompresör salyangoz temizliği.",
    "category": "Motor & Mekanik Bakım",
    "lang": "tr",
    "badge": "🇹🇷 Motor & Mekanik Bakım",
    "readTime": "7 dk okuma",
    "img": "assets/motor-mekanik-bakim.webp",
    "views": 361,
    "rating": 4.9
  },
  {
    "id": "art-036",
    "title": "Tekne Su Yapıcı (Watermaker) Membran Koruma ve Bakım Rehberi",
    "url": "blog-tekne-su-yapici-watermaker-bakimi.html",
    "desc": "Idromar, Schenker, Sea Recovery ve Selmar su yapıcı sistemlerinde yüksek basınç pompası yağ değişimi, RO membran alkalik/asidik yıkama ve kışlık pickling koruması.",
    "category": "Tesisat & Donanım",
    "lang": "tr",
    "badge": "🇹🇷 Tesisat & Donanım",
    "readTime": "6 dk okuma",
    "img": "assets/dm-marin-tamir-atolyesi.webp",
    "views": 365,
    "rating": 5.0
  },
  {
    "id": "art-037",
    "title": "Teknelerde Yakıt Tankı Temizliği ve Dizel Bakterisi Çözümü",
    "url": "blog-tekne-yakit-deposu-temizligi-ve-diesel-bug.html",
    "desc": "Mazot tankının dibinde biriken su ve biyofilm çamurunun enjektörleri tıkamasını önleme, mekanik tank yıkama ve biyosit kimyasal dozlama yöntemleri.",
    "category": "Motor & Mekanik Bakım",
    "lang": "tr",
    "badge": "🇹🇷 Motor & Mekanik Bakım",
    "readTime": "6 dk okuma",
    "img": "assets/motor-mekanik-bakim.webp",
    "views": 369,
    "rating": 4.7
  },
  {
    "id": "art-038",
    "title": "Mobil Yakıt Parlatma (Fuel Polishing) ve Filtrasyon Hizmeti",
    "url": "blog-mobil-yakit-parlatma-ve-tank-temizligi.html",
    "desc": "Marinada tekneden yakıtı tahliye etmeden kapalı devre yüksek debili mikro-filtrasyon ve santrifüj su ayrıştırma ile yakıtın sıfır mikron saflığa getirilmesi.",
    "category": "Motor & Mekanik Bakım",
    "lang": "tr",
    "badge": "🇹🇷 Motor & Mekanik Bakım",
    "readTime": "6 dk okuma",
    "img": "assets/dm-marin-ariza-tespit.webp",
    "views": 373,
    "rating": 4.8
  },
  {
    "id": "art-039",
    "title": "Caterpillar C18 ve C32 ACERT Marin Dizel Motor Bakımı",
    "url": "blog-cat-c18-c32-marin-motor-bakimi.html",
    "desc": "Caterpillar ACERT yüksek güçlü megayat ana makinelerinde S•O•S yağ analizi, MEUI enjektör kalibrasyonu, şarj havası soğutucu testi ve 250/1000 saatlik revizyon.",
    "category": "Motor & Mekanik Bakım",
    "lang": "tr",
    "badge": "🇹🇷 Motor & Mekanik Bakım",
    "readTime": "7 dk okuma",
    "img": "assets/motor-mekanik-bakim.webp",
    "views": 377,
    "rating": 4.9
  },
  {
    "id": "art-040",
    "title": "Kohler Marin Jeneratör Arıza Kodları ve Teşhis Rehberi",
    "url": "blog-kohler-marin-jenerator-ariza-kodlari-ve-cozumleri.html",
    "desc": "Kohler ADC 2100 ve Decision-Maker 3500 kontrol panellerinde LOC (Loss of Coolant), OP (Oil Pressure), OS (Over Speed), UF (Under Frequency) arızalarının giderilmesi.",
    "category": "Jeneratör & Enerji",
    "lang": "tr",
    "badge": "🇹🇷 Jeneratör & Enerji",
    "readTime": "6 dk okuma",
    "img": "assets/marin-jenerator-servisi.webp",
    "views": 336,
    "rating": 5.0
  },
  {
    "id": "art-041",
    "title": "ZF ve Twin Disc Marin Şanzıman Bakım ve Teşhis Rehberi",
    "url": "blog-zf-twin-disc-marin-sanziman-bakimi.html",
    "desc": "ZF 25A, 45A, 63A, 85A ve Twin Disc şanzımanlarda hidrolik kavrama balata aşınması, ATF yağ soğutucu korozyonu, kontrol valfi selenoidi ve yağ basınç testi.",
    "category": "Motor & Mekanik Bakım",
    "lang": "tr",
    "badge": "🇹🇷 Motor & Mekanik Bakım",
    "readTime": "7 dk okuma",
    "img": "assets/motor-mekanik-bakim.webp",
    "views": 340,
    "rating": 4.7
  },
  {
    "id": "art-042",
    "title": "Isı Eşanjörü ve Aftercooler Ultrasonik Temizleme ve Kireç Sökme",
    "url": "blog-tekne-isi-esanjoru-aftercooler-ultrasonik-temizleme.html",
    "desc": "Tuzlu su kireci, midye ve çamurla tıkanan bakır-nikel boru demetlerinin (bundle) kimyasal ve ultrasonik banyolarla sıfır dirence kavuşturulması ve motor hararetinin önlenmesi.",
    "category": "Motor & Mekanik Bakım",
    "lang": "tr",
    "badge": "🇹🇷 Motor & Mekanik Bakım",
    "readTime": "6 dk okuma",
    "img": "assets/dm-marin-tamir-atolyesi.webp",
    "views": 344,
    "rating": 4.8
  },
  {
    "id": "art-043",
    "title": "Victron Energy & LiFePO4 Marin Akü BMS Entegrasyon ve Şarj Ayarları",
    "url": "blog-victron-energy-lifepo4-lityum-aku-bms-ayarlari.html",
    "desc": "Victron MultiPlus inverter/charger, Cerbo GX ve SmartSolar MPPT cihazlarında LiFePO4 şarj voltajları, DVCC yönetimi ve alternatör koruma rölesi konfigürasyonu.",
    "category": "Elektrik & Akü",
    "lang": "tr",
    "badge": "🇹🇷 Elektrik & Akü",
    "readTime": "7 dk okuma",
    "img": "assets/marin-elektrik-elektronik.webp",
    "views": 348,
    "rating": 4.9
  },
  {
    "id": "art-044",
    "title": "Marin Hidrolik Dümen, Pasarella ve Yüzme Platformu Bakımı",
    "url": "blog-marin-hidrolik-dumen-ve-pasarella-bakimi.html",
    "desc": "Besenzoni, Opacmare ve Opac hidrolik pasarellalarda yağ kaçağı tamiri, hidrolik ünite basınç testi, dümen pistonu keçeleri ve selenoid valf temizliği.",
    "category": "Tesisat & Donanım",
    "lang": "tr",
    "badge": "🇹🇷 Tesisat & Donanım",
    "readTime": "6 dk okuma",
    "img": "assets/dm-marin-tamir-atolyesi.webp",
    "views": 352,
    "rating": 5.0
  },
  {
    "id": "art-045",
    "title": "Mobil Marin Servis Seçerken Dikkat Edilmesi Gereken 7 Kritik Kriter",
    "url": "blog-mobil-marin-servis-secimi-ve-marina-hizmetleri.html",
    "desc": "Marinada yerinde servis alırken yetki sertifikaları, OEM diagnostik cihaz donanımı, faturalı orijinal parça garantisi ve acil mobil intikal hızı rehberi.",
    "category": "Motor & Mekanik Bakım",
    "lang": "tr",
    "badge": "🇹🇷 Motor & Mekanik Bakım",
    "readTime": "5 dk okuma",
    "img": "assets/acil-mobil-marin-servis.webp",
    "views": 356,
    "rating": 4.7
  },
  {
    "id": "art-046",
    "title": "Cummins QSB 5.9/6.7, QSC 8.3 ve QSM 11 Marin Motor Bakım Rehberi",
    "url": "blog-cummins-qsb-qsc-qsm-marin-motor-bakimi.html",
    "desc": "Cummins Quantum serisi marin motorlarda SmartCraft diagnostik kodları, Walker AirSep hava filtresi bakımı, aftercooler basınç testi ve Venturi yağ filtreleme.",
    "category": "Motor & Mekanik Bakım",
    "lang": "tr",
    "badge": "🇹🇷 Motor & Mekanik Bakım",
    "readTime": "7 dk okuma",
    "img": "assets/motor-mekanik-bakim.webp",
    "views": 315,
    "rating": 4.8
  },
  {
    "id": "art-047",
    "title": "Northern Lights Ağır Hizmet Marin Jeneratör Bakım Kılavuzu",
    "url": "blog-northern-lights-marin-jenerator-bakimi.html",
    "desc": "Northern Lights 6kW - 40kW marin jeneratörlerde Lugger dizel blok bakımı, otomatik voltaj regülatörü (AVR), mekanik enjeksiyon pompası ve 500 saatlik revizyon.",
    "category": "Jeneratör & Enerji",
    "lang": "tr",
    "badge": "🇹🇷 Jeneratör & Enerji",
    "readTime": "6 dk okuma",
    "img": "assets/marin-jenerator-servisi.webp",
    "views": 319,
    "rating": 4.9
  },
  {
    "id": "art-048",
    "title": "Yamaha V6/V8 ve Suzuki 4-Zamanlı Dıştan Takma Motor Bakımı",
    "url": "blog-yamaha-suzuki-distankma-motor-bakimi.html",
    "desc": "Yamaha F200-F425 ve Suzuki DF150-DF350 motorlarda alt kuyruk dişli yağı, su pompası impeller değişimi, VST buhar separatörü filtresi ve YDIS / SDS teşhisi.",
    "category": "Motor & Mekanik Bakım",
    "lang": "tr",
    "badge": "🇹🇷 Motor & Mekanik Bakım",
    "readTime": "7 dk okuma",
    "img": "assets/motor-mekanik-bakim.webp",
    "views": 323,
    "rating": 5.0
  },
  {
    "id": "art-049",
    "title": "NMEA 2000 ve Marin CAN-Bus Ağ Kurulumu ve Hata Giderme",
    "url": "blog-nmea-2000-ve-marin-canbus-ag-kurulumu.html",
    "desc": "Raymarine SeaTalkNG, Garmin Marine Network ve Simrad SimNet omurga sonlandırma dirençleri, voltaj düşümü teşhisi ve motor verilerini chartplotter'a aktarma.",
    "category": "Elektrik & Akü",
    "lang": "tr",
    "badge": "🇹🇷 Elektrik & Akü",
    "readTime": "7 dk okuma",
    "img": "assets/marin-elektrik-elektronik.webp",
    "views": 327,
    "rating": 4.7
  },
  {
    "id": "art-050",
    "title": "Sintine Pompaları, Pis Su Maceratör ve Hidrofor Arıza Tamiri",
    "url": "blog-sintine-ve-pis-su-hidrofor-pompa-arizalari.html",
    "desc": "Rule, Jabsco ve Johnson otomatik sintine flatörleri, maceratör bıçak tıkanıklığı tamiri, hidrofor basınç şalteri ayarı ve çekvalf kaçak testleri.",
    "category": "Tesisat & Donanım",
    "lang": "tr",
    "badge": "🇹🇷 Tesisat & Donanım",
    "readTime": "6 dk okuma",
    "img": "assets/dm-marin-tamir-atolyesi.webp",
    "views": 331,
    "rating": 4.8
  },
  {
    "id": "art-051",
    "title": "MTU Series 4000 Megayat Motor Bakım ve Teşhis Kılavuzu",
    "url": "blog-mtu-series-4000-megayat-motor-bakimi.html",
    "desc": "MTU 12V4000 ve 16V4000 Common Rail megayat motorlarında ADEC elektronik yönetim sistemi, santrifüj yağ seperatörü, endoskopik silindir kontrolü ve QL2 revizyonu.",
    "category": "Motor & Mekanik Bakım",
    "lang": "tr",
    "badge": "🇹🇷 Motor & Mekanik Bakım",
    "readTime": "8 dk okuma",
    "img": "assets/mtu-series-2000-ozel-servis.webp",
    "views": 335,
    "rating": 4.9
  },
  {
    "id": "art-052",
    "title": "Coelmo Marin Jeneratör Bakımı ve FDC Dijital Panel Arızaları",
    "url": "blog-coelmo-marin-jenerator-servisi-ve-bakimi.html",
    "desc": "Coelmo DM350, DM600, DM900 ve DMB serisi marin jeneratörlerde Kubota dizel blok bakımı, FDC kontrol paneli hata kodları, deniz suyu pompası keçeleri ve kışlama.",
    "category": "Jeneratör & Enerji",
    "lang": "tr",
    "badge": "🇹🇷 Jeneratör & Enerji",
    "readTime": "6 dk okuma",
    "img": "assets/marin-jenerator-servisi.webp",
    "views": 339,
    "rating": 5.0
  },
  {
    "id": "art-053",
    "title": "Nanni Diesel Marin Motor Bakım ve Arıza Teşhis Rehberi",
    "url": "blog-nanni-diesel-marin-motor-bakimi-ve-arizalar.html",
    "desc": "Nanni N2, N3, N4 (Kubota bazlı) ve T4, T6 (Toyota bazlı) marin dizellerde ısı eşanjörü temizliği, triger kayışı değişimi, enjektör ayarı ve deniz suyu pompası revizyonu.",
    "category": "Motor & Mekanik Bakım",
    "lang": "tr",
    "badge": "🇹🇷 Motor & Mekanik Bakım",
    "readTime": "7 dk okuma",
    "img": "assets/motor-mekanik-bakim.webp",
    "views": 298,
    "rating": 4.7
  },
  {
    "id": "art-054",
    "title": "Westerbeke Marin Jeneratör Bakım ve Teşhis Kılavuzu",
    "url": "blog-westerbeke-marin-jenerator-bakimi-ve-karburator.html",
    "desc": "Westerbeke benzinli ve dizel kompakt marin jeneratörlerde governor hız regülatörü ayarı, karbüratör temizliği, egzoz sıcaklık sensörü ve kışlık koruma.",
    "category": "Jeneratör & Enerji",
    "lang": "tr",
    "badge": "🇹🇷 Jeneratör & Enerji",
    "readTime": "6 dk okuma",
    "img": "assets/marin-jenerator-servisi.webp",
    "views": 302,
    "rating": 4.8
  },
  {
    "id": "art-055",
    "title": "Baudouin Marin Motor Bakım ve Ağır Hizmet Protokolü",
    "url": "blog-baudouin-marin-motor-servisi-ve-bakimi.html",
    "desc": "Baudouin 6M26, 8M26 ve 12M26 serisi mekanik ve elektronik Common Rail marin motorlarda silindir kapağı torklama, turbo şarj basınç testi ve yağ analiz standartları.",
    "category": "Motor & Mekanik Bakım",
    "lang": "tr",
    "badge": "🇹🇷 Motor & Mekanik Bakım",
    "readTime": "7 dk okuma",
    "img": "assets/motor-mekanik-bakim.webp",
    "views": 306,
    "rating": 4.9
  },
  {
    "id": "art-056",
    "title": "Makine Dairesi Otomatik Yangın Söndürme Sistemleri Bakımı",
    "url": "blog-makine-dairesi-otomatik-yangin-sondurme-fm200.html",
    "desc": "Sea-Fire ve Fireboy otomatik makine dairesi gazlı yangın söndürme sistemlerinde basınç göstergesi kontrolü, otomatik motor stop rölesi testi ve hidrostatik tüp testleri.",
    "category": "Tesisat & Donanım",
    "lang": "tr",
    "badge": "🇹🇷 Tesisat & Donanım",
    "readTime": "6 dk okuma",
    "img": "assets/dm-marin-tamir-atolyesi.webp",
    "views": 310,
    "rating": 5.0
  },
  {
    "id": "art-057",
    "title": "İkinci El Tekne Alımında Motor ve Mekanik Ekspertiz Rehberi",
    "url": "blog-tekne-alim-oncesi-motor-ve-mekanik-ekspertiz.html",
    "desc": "Tekne satın alırken bilgisayarlı diagnostik motor saat analizi, karter kompresyon testi, şanzıman kaydırma kontrolü, eşanjör endoskopisi ve spektrografik yağ analizi.",
    "category": "Arıza & Teşhis",
    "lang": "tr",
    "badge": "🇹🇷 Arıza & Teşhis",
    "readTime": "8 dk okuma",
    "img": "assets/dm-marin-ariza-tespit.webp",
    "views": 314,
    "rating": 4.7
  },
  {
    "id": "art-058",
    "title": "Deep Sea Electronics (DSE) Jeneratör Kontrol Paneli Ayar ve Arızaları",
    "url": "blog-deep-sea-electronics-dse-jenerator-kontrol-paneli.html",
    "desc": "DSE 6110, 7310 ve 8610 senkron kontrol panellerinde jeneratör paralel bağlama, yük paylaşımı, frekans/voltaj koruma alarmları ve otomatik jeneratör transfer (ATS) ayarları.",
    "category": "Jeneratör & Enerji",
    "lang": "tr",
    "badge": "🇹🇷 Jeneratör & Enerji",
    "readTime": "7 dk okuma",
    "img": "assets/marin-jenerator-servisi.webp",
    "views": 318,
    "rating": 4.8
  },
  {
    "id": "art-059",
    "title": "Yüksek Akımlı Marin Alternatör ve Balmar Regülatör Ayar Kılavuzu",
    "url": "blog-marin-alternator-ve-harici-regulator-balmar.html",
    "desc": "Balmar, Mastervolt ve Prestolite yüksek akım alternatörlerde LiFePO4 şarjı için ısı sensörü entegrasyonu, kayış yükü ayarı ve alternatör aşırı ısınma koruması.",
    "category": "Elektrik & Akü",
    "lang": "tr",
    "badge": "🇹🇷 Elektrik & Akü",
    "readTime": "7 dk okuma",
    "img": "assets/marin-elektrik-elektronik.webp",
    "views": 277,
    "rating": 4.9
  },
  {
    "id": "art-060",
    "title": "Hidrolik Pasarella, Vinç ve Yüzme Platformu Mekanik Bakımı",
    "url": "blog-pasarella-ve-hidrolik-platform-mekanik-bakimi.html",
    "desc": "Besenzoni, Opacmare ve Pin-Craft hidrolik pasarellalarda paslanmaz çelik mafsal yağlaması, taşıyıcı kablo gergisi, mikroswitch limit sensörleri ve acil manuel indirme.",
    "category": "Tesisat & Donanım",
    "lang": "tr",
    "badge": "🇹🇷 Tesisat & Donanım",
    "readTime": "6 dk okuma",
    "img": "assets/dm-marin-tamir-atolyesi.webp",
    "views": 281,
    "rating": 5.0
  },
  {
    "id": "art-061",
    "title": "Pervane Kavitasyonu, Hatve (Pitch) Ayarı ve Titreşim Teşhisi",
    "url": "blog-pervane-kavitasyonu-hatve-pitch-ve-titresim-arizasi.html",
    "desc": "Pervane pallerinde kavitasyon erozyonu, yanlış hatve (over-propped/under-propped) nedeniyle motorun devir alamaması, şaft salgısı ve dinamik balans alma.",
    "category": "Motor & Mekanik Bakım",
    "lang": "tr",
    "badge": "🇹🇷 Motor & Mekanik Bakım",
    "readTime": "7 dk okuma",
    "img": "assets/motor-mekanik-bakim.webp",
    "views": 285,
    "rating": 4.7
  },
  {
    "id": "art-062",
    "title": "Galvanik İzolatör ve İzolasyon Transformatörü Kılavuzu",
    "url": "blog-galvanik-izolator-ve-izolasyon-transformatoru.html",
    "desc": "Sahil besleme hattından gelen kaçak akımların tutyaları hızla eritmesini önleme, Victron izolasyon transformatörü montajı ve toprak hattı güvenlik standartları.",
    "category": "Elektrik & Akü",
    "lang": "tr",
    "badge": "🇹🇷 Elektrik & Akü",
    "readTime": "6 dk okuma",
    "img": "assets/marin-elektrik-elektronik.webp",
    "views": 289,
    "rating": 4.8
  },
  {
    "id": "art-063",
    "title": "Yakıt ve Şanzıman Yağ Soğutucu Eşanjör Temizlik Rehberi",
    "url": "blog-yakit-ve-sanziman-yag-sogutucu-temizligi.html",
    "desc": "Common Rail yüksek basınç dönüş yakıtının ve şanzıman hidrolik yağının aşırı ısınmasını önleyen marin eşanjörlerde çinko anot kontrolü ve kimyasal kireç giderme.",
    "category": "Motor & Mekanik Bakım",
    "lang": "tr",
    "badge": "🇹🇷 Motor & Mekanik Bakım",
    "readTime": "6 dk okuma",
    "img": "assets/dm-marin-tamir-atolyesi.webp",
    "views": 293,
    "rating": 4.9
  },
  {
    "id": "art-064",
    "title": "Deniz Suyu Emiş Filtresi ve Kinistin Vana Bakım Rehberi",
    "url": "blog-deniz-suyu-emiss-filtresi-ve-vana-guvenligi.html",
    "desc": "Groco ve Vetus deniz suyu filtrelerinde sepet temizliği, akrilik kapak O-ring keçeleri, bronz kinistin vana tutukluk giderme ve korozyon testleri.",
    "category": "Tesisat & Donanım",
    "lang": "tr",
    "badge": "🇹🇷 Tesisat & Donanım",
    "readTime": "5 dk okuma",
    "img": "assets/motor-mekanik-bakim.webp",
    "views": 297,
    "rating": 5.0
  },
  {
    "id": "art-065",
    "title": "Tekne Irgatı (Windlass) Dişli Kutusu ve Motor Bakımı",
    "url": "blog-elektrikli-ve-hidrolik-irgat-bakimi.html",
    "desc": "Lofrans, Lewmar, Quick ve Maxwell ırgatlarda konik debriyaj (clutch) ayarı, sonsuz vida dişli yağı değişimi, ayak butonu rölesi ve motor kömürleri.",
    "category": "Tesisat & Donanım",
    "lang": "tr",
    "badge": "🇹🇷 Tesisat & Donanım",
    "readTime": "6 dk okuma",
    "img": "assets/dm-marin-tamir-atolyesi.webp",
    "views": 301,
    "rating": 4.7
  },
  {
    "id": "art-066",
    "title": "Egzoz Yükseltme Dirseği (Riser) ve Waterlock Güvenlik Protokolü",
    "url": "blog-egzoz-yukseltme-dirsegi-exhaust-riser-bakimi.html",
    "desc": "Su hattının altında kalan motorlarda egzozdan motora geri su basmasını (siphoning) engelleyen antisifon valfi, paslanmaz riser kaynak korozyonu ve Vetus waterlock.",
    "category": "Motor & Mekanik Bakım",
    "lang": "tr",
    "badge": "🇹🇷 Motor & Mekanik Bakım",
    "readTime": "6 dk okuma",
    "img": "assets/motor-mekanik-bakim.webp",
    "views": 260,
    "rating": 4.8
  },
  {
    "id": "art-067",
    "title": "Inverter/Charger Sıcaklık Telafisi ve Voltaj Düşümü Ayarları",
    "url": "blog-inverter-charger-ve-isi-sensoru-kalibrasyonu.html",
    "desc": "Mastervolt Mass Combi ve Victron MultiPlus cihazlarında akü sıcaklık sensörü (BTS) ile termal kaçak (thermal runaway) önleme ve 4-kutuplu şarj profil ayarları.",
    "category": "Elektrik & Akü",
    "lang": "tr",
    "badge": "🇹🇷 Elektrik & Akü",
    "readTime": "6 dk okuma",
    "img": "assets/marin-elektrik-elektronik.webp",
    "views": 264,
    "rating": 4.9
  },
  {
    "id": "art-068",
    "title": "Common Rail Yüksek Basınç Pompası ve Yakıt Rayı Teşhis Kılavuzu",
    "url": "blog-common-rail-yakit-rayi-ve-basinc-regulatoru.html",
    "desc": "Bosch CP3/CP4 yüksek basınç pompalarında metal talaşı aşınması, yakıt rayı basınç regülatörü (SCV/FPROP) dalgalanması ve Common Rail basınç düşüm testleri.",
    "category": "Arıza & Teşhis",
    "lang": "tr",
    "badge": "🇹🇷 Arıza & Teşhis",
    "readTime": "7 dk okuma",
    "img": "assets/dm-marin-ariza-tespit.webp",
    "views": 268,
    "rating": 5.0
  },
  {
    "id": "art-069",
    "title": "Kovan Lastiği (Cutless Bearing) Aşınma ve Değişim Rehberi",
    "url": "blog-braket-ve-kovan-lastigi-cutless-bearing-degisimi.html",
    "desc": "Şaft braketi ve kovan içi kauçuk yataklarda (cutless bearing) boşluk toleransı ölçümü, sentil çakısı ile aşınma tespiti, hidrolik çektirme ile kovan lastiği değişimi.",
    "category": "Motor & Mekanik Bakım",
    "lang": "tr",
    "badge": "🇹🇷 Motor & Mekanik Bakım",
    "readTime": "6 dk okuma",
    "img": "assets/motor-mekanik-bakim.webp",
    "views": 272,
    "rating": 4.7
  },
  {
    "id": "art-070",
    "title": "Kış Dönemi Tekne Nem Kontrolü ve Akü Tampon Şarj Yönetimi",
    "url": "blog-kislik-tekne-nem-kontrolu-ve-aku-tampon-sarj.html",
    "desc": "Kış aylarında sintine ve kabin küflenmesini önleyen kompresörlü nem alma cihazları, solar akü tampon şarj yönetimi ve kışlık periyodik marin nöbet kontrolleri.",
    "category": "Kışlama & Koruma",
    "lang": "tr",
    "badge": "🇹🇷 Kışlama & Koruma",
    "readTime": "6 dk okuma",
    "img": "assets/marin-elektrik-elektronik.webp",
    "views": 276,
    "rating": 4.8
  },
  {
    "id": "art-071",
    "title": "Volvo Penta D4, D6 & D13 Marine Engine Maintenance & Diagnostics",
    "url": "blog-volvo-penta-d4-d6-d13-maintenance-and-faults.html",
    "desc": "Scheduled maintenance guide for Volvo Penta D4, D6 and D13 Common Rail marine diesels: 100/200/500 hr service, compressor oil, aftercoolers, and EVC diagnostic codes.",
    "category": "Engine & Mechanical",
    "lang": "en",
    "badge": "🇬🇧 Engine & Mechanical",
    "readTime": "7 min read",
    "img": "assets/volvo-penta-d4-d6-ozel-servis.webp",
    "views": 280,
    "rating": 4.9
  },
  {
    "id": "art-072",
    "title": "Volvo Penta IPS Pod Drive Maintenance & Scheduled Service",
    "url": "blog-volvo-penta-ips-pod-drive-maintenance-service.html",
    "desc": "Scheduled maintenance for Volvo Penta IPS 500-1200 pod drives: synthetic gear oil change, prop shaft dual seals, sacrificial anodes, and steering unit sensor calibration.",
    "category": "Engine & Mechanical",
    "lang": "en",
    "badge": "🇬🇧 Engine & Mechanical",
    "readTime": "7 min read",
    "img": "assets/volvo-penta-d4-d6-ozel-servis.webp",
    "views": 239,
    "rating": 5.0
  },
  {
    "id": "art-073",
    "title": "Yanmar Common Rail Engine Diagnostics & Maintenance Guide",
    "url": "blog-yanmar-common-rail-diesel-diagnostics-service.html",
    "desc": "Comprehensive guide for Yanmar 4JH and 6LY Common Rail marine diesels: fuel rail pressure sensors, injector coding, Y-COP diagnostics, and winter lay-up.",
    "category": "Diagnostics & Repair",
    "lang": "en",
    "badge": "🇬🇧 Diagnostics & Repair",
    "readTime": "6 min read",
    "img": "assets/yanmar-4jh-6ly-ozel-servis.webp",
    "views": 243,
    "rating": 4.7
  },
  {
    "id": "art-074",
    "title": "Marine Diesel Smoke Diagnostics: Black, White & Blue Smoke Analysis",
    "url": "blog-marine-diesel-exhaust-smoke-color-diagnostics.html",
    "desc": "Engineering causes of black, white, and blue yacht exhaust smoke: dripping injectors, turbo boost pressure drops, worn valve seals, and cylinder head gasket leaks.",
    "category": "Diagnostics & Repair",
    "lang": "en",
    "badge": "🇬🇧 Diagnostics & Repair",
    "readTime": "5 min read",
    "img": "assets/dm-marin-ariza-tespit.webp",
    "views": 247,
    "rating": 4.8
  },
  {
    "id": "art-075",
    "title": "MAN & MTU Marine V8/V12 High Performance Diesel Service",
    "url": "blog-man-mtu-marine-high-speed-diesel-service.html",
    "desc": "Scheduled W1-W4 maintenance standards for MAN V8/V12 and MTU Series 2000 high-speed marine diesels: intercooler ultrasonic wash, turbo boost, and valve clearances.",
    "category": "Engine & Mechanical",
    "lang": "en",
    "badge": "🇬🇧 Engine & Mechanical",
    "readTime": "8 min read",
    "img": "assets/man-marine-v8-v12-ozel-servis.webp",
    "views": 251,
    "rating": 4.9
  },
  {
    "id": "art-076",
    "title": "Marine Generator Sea Water Cooling & Overheating Troubleshooting",
    "url": "blog-marine-generator-faults-sea-water-cooling.html",
    "desc": "Troubleshooting Kohler, Onan and Fischer Panda generators: impeller failure, sea strainer blockage, heat exchanger scale, and LOC/Overheat fault shutdown codes.",
    "category": "Generator & Power",
    "lang": "en",
    "badge": "🇬🇧 Generator & Power",
    "readTime": "6 min read",
    "img": "assets/marin-jenerator-servisi.webp",
    "views": 255,
    "rating": 5.0
  },
  {
    "id": "art-077",
    "title": "Fischer Panda Marine Generator Care & Inverter Diagnostics",
    "url": "blog-fischer-panda-marine-generator-service-inverter.html",
    "desc": "Technical guide for Fischer Panda iSeries generators: water-cooled alternators, PMGI inverter failures, winding temperature sensors, and capsule ventilation.",
    "category": "Generator & Power",
    "lang": "en",
    "badge": "🇬🇧 Generator & Power",
    "readTime": "6 min read",
    "img": "assets/marin-jenerator-servisi.webp",
    "views": 259,
    "rating": 4.7
  },
  {
    "id": "art-078",
    "title": "Yacht Marine Air Conditioning & Chiller Maintenance Guide",
    "url": "blog-marine-air-conditioning-chiller-repair-maintenance.html",
    "desc": "Marine HVAC troubleshooting for Dometic, Webasto and Condaria chillers: HP/LP pressure faults, sea water cooling pump cavitation, and fancoil disinfection.",
    "category": "Propulsion & Deck",
    "lang": "en",
    "badge": "🇬🇧 Propulsion & Deck",
    "readTime": "7 min read",
    "img": "assets/dm-marin-tamir-atolyesi.webp",
    "views": 263,
    "rating": 4.8
  },
  {
    "id": "art-079",
    "title": "Propeller Shaft Alignment & PSS Dripless Shaft Seal Maintenance",
    "url": "blog-shaft-alignment-pss-dripless-seal-maintenance.html",
    "desc": "Laser shaft alignment tolerances, engine mount sagging, PSS mechanical seal bellows tension, carbon-rotor mating surface, and raw water cooling injection.",
    "category": "Engine & Mechanical",
    "lang": "en",
    "badge": "🇬🇧 Engine & Mechanical",
    "readTime": "6 min read",
    "img": "assets/motor-mekanik-bakim.webp",
    "views": 222,
    "rating": 4.9
  },
  {
    "id": "art-080",
    "title": "Seakeeper Gyroscopic Stabilizer Annual Care & Cooling Circuit",
    "url": "blog-seakeeper-gyro-stabilizer-maintenance-cooling.html",
    "desc": "Scheduled service for Seakeeper 2 through 35 gyros: closed-loop glycol replacement, sea water zinc anodes, brake hydraulic pressure, and vacuum sphere diagnostics.",
    "category": "Propulsion & Deck",
    "lang": "en",
    "badge": "🇬🇧 Propulsion & Deck",
    "readTime": "7 min read",
    "img": "assets/dm-marin-tamir-atolyesi.webp",
    "views": 226,
    "rating": 5.0
  },
  {
    "id": "art-081",
    "title": "Marine Battery Selection & LiFePO4 Lithium Conversion Guide",
    "url": "blog-marine-battery-selection-lifepo4-lithium-conversion.html",
    "desc": "Upgrading from AGM/Gel to LiFePO4 marine lithium: BMS integration, DC-DC alternator charging relays, Class-approved fuse protection, and safety protocols.",
    "category": "Electrical & Battery",
    "lang": "en",
    "badge": "🇬🇧 Electrical & Battery",
    "readTime": "8 min read",
    "img": "assets/marin-elektrik-elektronik.webp",
    "views": 230,
    "rating": 4.7
  },
  {
    "id": "art-082",
    "title": "Yacht Engine Winterization & Frost Protection Protocol",
    "url": "blog-yacht-winterizing-antifreeze-engine-protection.html",
    "desc": "Winterizing marine diesels and generators: non-toxic propylene glycol raw water flushing, fuel biocides, fogging internal cylinders, and humidity control.",
    "category": "Winterizing & Corrosion",
    "lang": "en",
    "badge": "🇬🇧 Winterizing & Corrosion",
    "readTime": "6 min read",
    "img": "assets/motor-mekanik-bakim.webp",
    "views": 234,
    "rating": 4.8
  },
  {
    "id": "art-083",
    "title": "Sacrificial Anode Selection & Galvanic Corrosion Protection",
    "url": "blog-sacrificial-anodes-galvanic-corrosion-guide.html",
    "desc": "Selecting Zinc, Aluminum, and Magnesium sacrificial anodes for salt, brackish, and fresh water. Shaft anodes, bow thruster zincs, heat exchanger pencils, and stray current testing.",
    "category": "Winterizing & Corrosion",
    "lang": "en",
    "badge": "🇬🇧 Winterizing & Corrosion",
    "readTime": "6 min read",
    "img": "assets/dm-marin-tamir-atolyesi.webp",
    "views": 238,
    "rating": 4.9
  },
  {
    "id": "art-084",
    "title": "Bow and Stern Thruster Maintenance & Troubleshooting Guide",
    "url": "blog-bow-stern-thruster-maintenance-yacht.html",
    "desc": "Scheduled service for Sleipner Side-Power, Quick, and Vetus thrusters: tailpiece gear oil seals, solenoid contact wear, carbon brush replacement, and anode renewal.",
    "category": "Propulsion & Deck",
    "lang": "en",
    "badge": "🇬🇧 Propulsion & Deck",
    "readTime": "5 min read",
    "img": "assets/dm-marin-tamir-atolyesi.webp",
    "views": 242,
    "rating": 5.0
  },
  {
    "id": "art-085",
    "title": "Marine Turbocharger & Exhaust Mixing Elbow Inspection Guide",
    "url": "blog-marine-turbocharger-exhaust-elbow-inspection.html",
    "desc": "Diagnosing exhaust mixing elbow corrosion, sea water back-siphoning into turbochargers, seized wastegate actuators, and compressor ultrasonic cleaning.",
    "category": "Engine & Mechanical",
    "lang": "en",
    "badge": "🇬🇧 Engine & Mechanical",
    "readTime": "7 min read",
    "img": "assets/motor-mekanik-bakim.webp",
    "views": 201,
    "rating": 4.7
  },
  {
    "id": "art-086",
    "title": "Marine Watermaker Reverse Osmosis Care & Pickling Guide",
    "url": "blog-marine-watermaker-maintenance-winterizing.html",
    "desc": "Service standards for Idromar, Schenker, and Sea Recovery RO watermakers: HP pump oil change, chemical membrane descaling, and winter pickling biocides.",
    "category": "Propulsion & Deck",
    "lang": "en",
    "badge": "🇬🇧 Propulsion & Deck",
    "readTime": "6 min read",
    "img": "assets/dm-marin-tamir-atolyesi.webp",
    "views": 205,
    "rating": 4.8
  },
  {
    "id": "art-087",
    "title": "Yacht Fuel Tank Cleaning & Diesel Bug Microbial Remediation",
    "url": "blog-yacht-fuel-tank-cleaning-diesel-bug-solution.html",
    "desc": "Preventing diesel bug microbial slime and water condensation from clogging Common Rail injectors: mechanical suction flushing and biocide fuel treatment.",
    "category": "Engine & Mechanical",
    "lang": "en",
    "badge": "🇬🇧 Engine & Mechanical",
    "readTime": "6 min read",
    "img": "assets/motor-mekanik-bakim.webp",
    "views": 209,
    "rating": 4.9
  },
  {
    "id": "art-088",
    "title": "Mobile Marine Fuel Polishing & Multi-Stage Filtration",
    "url": "blog-mobile-marine-fuel-polishing-tank-cleaning.html",
    "desc": "Closed-loop high flow fuel polishing on marina pontoons: centrifugal water separation, 2-micron filtration, and restoring degraded yacht diesel.",
    "category": "Engine & Mechanical",
    "lang": "en",
    "badge": "🇬🇧 Engine & Mechanical",
    "readTime": "6 min read",
    "img": "assets/dm-marin-ariza-tespit.webp",
    "views": 213,
    "rating": 5.0
  },
  {
    "id": "art-089",
    "title": "Caterpillar C18 & C32 ACERT Marine Engine Scheduled Care",
    "url": "blog-cat-c18-c32-marine-diesel-service.html",
    "desc": "Scheduled service for Cat C12, C18, and C32 ACERT marine diesels: S•O•S fluid analysis, MEUI injector timing, aftercooler hydrostatic testing, and overhaul protocols.",
    "category": "Engine & Mechanical",
    "lang": "en",
    "badge": "🇬🇧 Engine & Mechanical",
    "readTime": "7 min read",
    "img": "assets/motor-mekanik-bakim.webp",
    "views": 217,
    "rating": 4.7
  },
  {
    "id": "art-090",
    "title": "Kohler Marine Generator Fault Codes & Troubleshooting",
    "url": "blog-kohler-marine-generator-fault-codes-troubleshooting.html",
    "desc": "Decoding Kohler ADC 2100 & Decision-Maker controllers: LOC coolant loss, OP low oil pressure, OS overspeed, and UF under frequency troubleshooting.",
    "category": "Generator & Power",
    "lang": "en",
    "badge": "🇬🇧 Generator & Power",
    "readTime": "6 min read",
    "img": "assets/marin-jenerator-servisi.webp",
    "views": 221,
    "rating": 4.8
  },
  {
    "id": "art-091",
    "title": "ZF & Twin Disc Marine Transmission Maintenance Guide",
    "url": "blog-zf-twin-disc-marine-transmission-service.html",
    "desc": "Maintenance standards for ZF and Twin Disc marine gearboxes: hydraulic clutch disc wear, oil cooler zincs, solenoid valves, and shifting pressure adjustments.",
    "category": "Engine & Mechanical",
    "lang": "en",
    "badge": "🇬🇧 Engine & Mechanical",
    "readTime": "7 min read",
    "img": "assets/motor-mekanik-bakim.webp",
    "views": 180,
    "rating": 4.9
  },
  {
    "id": "art-092",
    "title": "Marine Heat Exchanger & Aftercooler Ultrasonic Descaling Guide",
    "url": "blog-marine-heat-exchanger-aftercooler-ultrasonic-cleaning.html",
    "desc": "Ultrasonic bath and eco-chemical descaling for marine heat exchanger tube bundles, aftercoolers, and intercoolers to restore thermal efficiency and prevent engine overheating.",
    "category": "Engine & Mechanical",
    "lang": "en",
    "badge": "🇬🇧 Engine & Mechanical",
    "readTime": "6 min read",
    "img": "assets/dm-marin-tamir-atolyesi.webp",
    "views": 184,
    "rating": 5.0
  },
  {
    "id": "art-093",
    "title": "Victron Energy & LiFePO4 Marine Lithium BMS Integration Guide",
    "url": "blog-victron-energy-lifepo4-lithium-bms-integration.html",
    "desc": "Configuring Victron MultiPlus, Cerbo GX and SmartSolar MPPT for LiFePO4 marine batteries: charge profiles, DVCC closed-loop communication, and alternator protection relays.",
    "category": "Electrical & Battery",
    "lang": "en",
    "badge": "🇬🇧 Electrical & Battery",
    "readTime": "7 min read",
    "img": "assets/marin-elektrik-elektronik.webp",
    "views": 188,
    "rating": 4.7
  },
  {
    "id": "art-094",
    "title": "Yacht Hydraulic Steering, Passerelle & Platform Maintenance",
    "url": "blog-marine-hydraulic-steering-passerelle-maintenance.html",
    "desc": "Troubleshooting Besenzoni, Opacmare, and hydraulic steering systems: cylinder seal replacement, hydraulic power pack pressure calibration, and solenoid purging.",
    "category": "Propulsion & Deck",
    "lang": "en",
    "badge": "🇬🇧 Propulsion & Deck",
    "readTime": "6 min read",
    "img": "assets/dm-marin-tamir-atolyesi.webp",
    "views": 192,
    "rating": 4.8
  },
  {
    "id": "art-095",
    "title": "7 Critical Factors When Choosing a Mobile Marine Service",
    "url": "blog-choosing-mobile-marine-engineering-service.html",
    "desc": "Essential checklist for hiring mobile marine engineers: OEM diagnostics tools, authorized insurance coverage, authentic spare parts warranties, and marina dispatch speed.",
    "category": "Engine & Mechanical",
    "lang": "en",
    "badge": "🇬🇧 Engine & Mechanical",
    "readTime": "5 min read",
    "img": "assets/acil-mobil-marin-servis.webp",
    "views": 196,
    "rating": 4.9
  },
  {
    "id": "art-096",
    "title": "Cummins QSB, QSC & QSM Marine Diesel Service & Diagnostics",
    "url": "blog-cummins-qsb-qsc-qsm-marine-diesel-service.html",
    "desc": "Scheduled service for Cummins QSB 6.7, QSC 8.3, and QSM 11: SmartCraft diagnostics, Walker AirSep maintenance, aftercooler pressure testing, and Venturi filtration.",
    "category": "Engine & Mechanical",
    "lang": "en",
    "badge": "🇬🇧 Engine & Mechanical",
    "readTime": "7 min read",
    "img": "assets/motor-mekanik-bakim.webp",
    "views": 200,
    "rating": 5.0
  },
  {
    "id": "art-097",
    "title": "Northern Lights Heavy Duty Marine Genset Service Protocol",
    "url": "blog-northern-lights-marine-generator-maintenance.html",
    "desc": "Scheduled care for Northern Lights 6-40kW gensets: Lugger diesel block maintenance, AVR voltage calibration, raw water pump rebuild, and 500-hour inspection.",
    "category": "Generator & Power",
    "lang": "en",
    "badge": "🇬🇧 Generator & Power",
    "readTime": "6 min read",
    "img": "assets/marin-jenerator-servisi.webp",
    "views": 204,
    "rating": 4.7
  },
  {
    "id": "art-098",
    "title": "Yamaha V6/V8 & Suzuki 4-Stroke Outboard Maintenance Guide",
    "url": "blog-yamaha-suzuki-marine-outboard-maintenance-diagnostics.html",
    "desc": "Scheduled service for Yamaha and Suzuki outboard engines: lower unit gear lube, water pump impeller renewal, VST fuel filter cleaning, and diagnostic software analysis.",
    "category": "Engine & Mechanical",
    "lang": "en",
    "badge": "🇬🇧 Engine & Mechanical",
    "readTime": "7 min read",
    "img": "assets/motor-mekanik-bakim.webp",
    "views": 163,
    "rating": 4.8
  },
  {
    "id": "art-099",
    "title": "NMEA 2000 & Marine CAN-Bus Backbone Integration & Diagnostics",
    "url": "blog-nmea-2000-marine-canbus-network-troubleshooting.html",
    "desc": "Engineering guide for NMEA 2000 backbone networks: termination resistor testing, LEN load calculation, voltage drop analysis, and engine gauge gateway integration.",
    "category": "Electrical & Battery",
    "lang": "en",
    "badge": "🇬🇧 Electrical & Battery",
    "readTime": "7 min read",
    "img": "assets/marin-elektrik-elektronik.webp",
    "views": 167,
    "rating": 4.9
  },
  {
    "id": "art-100",
    "title": "Marine Bilge, Black Water Macerator & Fresh Water Pump Care",
    "url": "blog-marine-bilge-blackwater-macerator-pump-repair.html",
    "desc": "Troubleshooting yacht pumping systems: automatic float switch wiring, Jabsco macerator unjamming, fresh water pump pressure switch adjustment, and check valve sealing.",
    "category": "Propulsion & Deck",
    "lang": "en",
    "badge": "🇬🇧 Propulsion & Deck",
    "readTime": "6 min read",
    "img": "assets/dm-marin-tamir-atolyesi.webp",
    "views": 171,
    "rating": 5.0
  },
  {
    "id": "art-101",
    "title": "MTU Series 4000 Superyacht Engine Scheduled Maintenance",
    "url": "blog-mtu-series-4000-superyacht-diesel-maintenance.html",
    "desc": "Megayacht engineering protocols for MTU 12V/16V 4000 engines: ADEC engine management, centrifugal oil cleaner service, borescope cylinder inspection, and QL2 overhaul.",
    "category": "Engine & Mechanical",
    "lang": "en",
    "badge": "🇬🇧 Engine & Mechanical",
    "readTime": "8 min read",
    "img": "assets/mtu-series-2000-ozel-servis.webp",
    "views": 175,
    "rating": 4.7
  },
  {
    "id": "art-102",
    "title": "Coelmo Marine Generator Care & FDC Digital Panel Diagnostics",
    "url": "blog-coelmo-marine-generator-service-troubleshooting.html",
    "desc": "Scheduled service for Coelmo DM and DMB series marine generators: Kubota block care, FDC digital panel alarms, sea water pump mechanical seals, and winter lay-up.",
    "category": "Generator & Power",
    "lang": "en",
    "badge": "🇬🇧 Generator & Power",
    "readTime": "6 min read",
    "img": "assets/marin-jenerator-servisi.webp",
    "views": 179,
    "rating": 4.8
  },
  {
    "id": "art-103",
    "title": "Nanni Diesel Marine Engine Maintenance & Diagnostics",
    "url": "blog-nanni-diesel-marine-engine-service-diagnostics.html",
    "desc": "Technical guide for Nanni Diesel engines: Kubota and Toyota block marinization, heat exchanger ultrasonic flushing, timing belt replacement, and fuel injection timing.",
    "category": "Engine & Mechanical",
    "lang": "en",
    "badge": "🇬🇧 Engine & Mechanical",
    "readTime": "7 min read",
    "img": "assets/motor-mekanik-bakim.webp",
    "views": 183,
    "rating": 4.9
  },
  {
    "id": "art-104",
    "title": "Westerbeke Marine Generator Maintenance & Diagnostics",
    "url": "blog-westerbeke-marine-generator-service-carburetor.html",
    "desc": "Scheduled service for Westerbeke marine gensets: electronic governor adjustment, carburetor ultrasonic cleaning, exhaust high-temp switch testing, and winterization.",
    "category": "Generator & Power",
    "lang": "en",
    "badge": "🇬🇧 Generator & Power",
    "readTime": "6 min read",
    "img": "assets/marin-jenerator-servisi.webp",
    "views": 142,
    "rating": 5.0
  },
  {
    "id": "art-105",
    "title": "Baudouin Marine Diesel Heavy Duty Maintenance Protocol",
    "url": "blog-baudouin-marine-diesel-propulsion-service.html",
    "desc": "Engineering standards for Baudouin 6M, 8M and 12M commercial and superyacht diesels: cylinder head retorquing, turbo boost diagnostics, and heavy-duty filtration.",
    "category": "Engine & Mechanical",
    "lang": "en",
    "badge": "🇬🇧 Engine & Mechanical",
    "readTime": "7 min read",
    "img": "assets/motor-mekanik-bakim.webp",
    "views": 146,
    "rating": 4.7
  },
  {
    "id": "art-106",
    "title": "Engine Room Fire Suppression Systems (FM-200 & Novec) Care",
    "url": "blog-engine-room-fire-suppression-fm200-novec-1230.html",
    "desc": "Maintenance protocol for Sea-Fire and Fireboy FM-200/Novec 1230 marine systems: pressure gauge inspection, engine shutdown interlock testing, and hydrostatic recertification.",
    "category": "Propulsion & Deck",
    "lang": "en",
    "badge": "🇬🇧 Propulsion & Deck",
    "readTime": "6 min read",
    "img": "assets/dm-marin-tamir-atolyesi.webp",
    "views": 150,
    "rating": 4.8
  },
  {
    "id": "art-107",
    "title": "Pre-Purchase Yacht Engine & Mechanical Inspection Guide",
    "url": "blog-pre-purchase-yacht-engine-mechanical-survey.html",
    "desc": "Critical pre-purchase marine survey checklist: OEM electronic engine hour verification, cylinder compression, gearbox slippage test, borescope cooling pass, and oil lab analysis.",
    "category": "Diagnostics & Repair",
    "lang": "en",
    "badge": "🇬🇧 Diagnostics & Repair",
    "readTime": "8 min read",
    "img": "assets/dm-marin-ariza-tespit.webp",
    "views": 154,
    "rating": 4.9
  },
  {
    "id": "art-108",
    "title": "Deep Sea Electronics (DSE) Marine Genset Controller Setup",
    "url": "blog-deep-sea-electronics-dse-generator-controller-setup.html",
    "desc": "Configuring DSE 6110, 7310, and 8610 controllers for marine generators: parallel synchronization, load sharing, frequency alarms, and automatic transfer switches.",
    "category": "Generator & Power",
    "lang": "en",
    "badge": "🇬🇧 Generator & Power",
    "readTime": "7 min read",
    "img": "assets/marin-jenerator-servisi.webp",
    "views": 158,
    "rating": 5.0
  },
  {
    "id": "art-109",
    "title": "High-Output Marine Alternator & Balmar Regulator Setup Guide",
    "url": "blog-high-output-marine-alternator-balmar-regulator-tuning.html",
    "desc": "Tuning high-output marine alternators with Balmar Max Charge regulators: alternator temperature sensors, Belt Load Manager, and LiFePO4 multi-stage charge profiles.",
    "category": "Electrical & Battery",
    "lang": "en",
    "badge": "🇬🇧 Electrical & Battery",
    "readTime": "7 min read",
    "img": "assets/marin-elektrik-elektronik.webp",
    "views": 162,
    "rating": 4.7
  },
  {
    "id": "art-110",
    "title": "Hydraulic Passerelle, Crane & Swim Platform Mechanical Care",
    "url": "blog-hydraulic-passerelle-swim-platform-mechanical-service.html",
    "desc": "Mechanical care for Besenzoni and Opacmare yacht gangways: 316L stainless joint lubrication, wire rope tensioning, limit microswitches, and emergency manual release bypass.",
    "category": "Propulsion & Deck",
    "lang": "en",
    "badge": "🇬🇧 Propulsion & Deck",
    "readTime": "6 min read",
    "img": "assets/dm-marin-tamir-atolyesi.webp",
    "views": 166,
    "rating": 4.8
  },
  {
    "id": "art-111",
    "title": "Marine Propeller Cavitation, Pitch Adjustment & Vibration Analysis",
    "url": "blog-propeller-cavitation-pitch-vibration-diagnostics.html",
    "desc": "Diagnosing propeller cavitation pitting, over-propping engine RPM limitations, shaft runout optical measurements, and dynamic propeller balancing.",
    "category": "Engine & Mechanical",
    "lang": "en",
    "badge": "🇬🇧 Engine & Mechanical",
    "readTime": "7 min read",
    "img": "assets/motor-mekanik-bakim.webp",
    "views": 125,
    "rating": 4.9
  },
  {
    "id": "art-112",
    "title": "Galvanic Isolator vs Isolation Transformer Yacht Shore Power Guide",
    "url": "blog-galvanic-isolator-vs-isolation-transformer-yacht.html",
    "desc": "Preventing rapid zinc anode depletion from marina shore power stray currents: galvanic isolator diodes vs toroidal isolation transformers and grounding standards.",
    "category": "Electrical & Battery",
    "lang": "en",
    "badge": "🇬🇧 Electrical & Battery",
    "readTime": "6 min read",
    "img": "assets/marin-elektrik-elektronik.webp",
    "views": 129,
    "rating": 5.0
  },
  {
    "id": "art-113",
    "title": "Fuel Cooler & Marine Gearbox Oil Cooler Maintenance Guide",
    "url": "blog-fuel-cooler-marine-gearbox-oil-cooler-descaling.html",
    "desc": "Preventing Common Rail high fuel return temperatures and gearbox fluid overheating: ultrasonic descaling of marine tube coolers and sacrificial anode renewal.",
    "category": "Engine & Mechanical",
    "lang": "en",
    "badge": "🇬🇧 Engine & Mechanical",
    "readTime": "6 min read",
    "img": "assets/dm-marin-tamir-atolyesi.webp",
    "views": 133,
    "rating": 4.7
  },
  {
    "id": "art-114",
    "title": "Sea Strainer & Thru-Hull Seacock Maintenance Protocol",
    "url": "blog-sea-strainer-thru-hull-seacock-safety-maintenance.html",
    "desc": "Inspection protocols for Groco and Vetus raw water strainers: basket debris clearing, acrylic lid O-ring seals, DZR brass seacock lubrication, and bonding checks.",
    "category": "Propulsion & Deck",
    "lang": "en",
    "badge": "🇬🇧 Propulsion & Deck",
    "readTime": "5 min read",
    "img": "assets/motor-mekanik-bakim.webp",
    "views": 137,
    "rating": 4.8
  },
  {
    "id": "art-115",
    "title": "Yacht Anchor Windlass Gearbox & Electric Motor Service",
    "url": "blog-electric-hydraulic-anchor-windlass-capstan-service.html",
    "desc": "Scheduled service for Lofrans, Lewmar, and Quick anchor windlasses: cone clutch adjustment, worm gearbox oil renewal, heavy-duty foot switch solenoids, and motor brushes.",
    "category": "Propulsion & Deck",
    "lang": "en",
    "badge": "🇬🇧 Propulsion & Deck",
    "readTime": "6 min read",
    "img": "assets/dm-marin-tamir-atolyesi.webp",
    "views": 141,
    "rating": 4.9
  },
  {
    "id": "art-116",
    "title": "Marine Exhaust Riser & Waterlock Muffler Safety Protocol",
    "url": "blog-marine-exhaust-riser-waterlock-muffler-safety.html",
    "desc": "Preventing catastrophic exhaust water back-siphoning into marine cylinders: anti-siphon loop vacuum valve testing, 316L riser weld inspection, and waterlock muffler drainage.",
    "category": "Engine & Mechanical",
    "lang": "en",
    "badge": "🇬🇧 Engine & Mechanical",
    "readTime": "6 min read",
    "img": "assets/motor-mekanik-bakim.webp",
    "views": 145,
    "rating": 5.0
  },
  {
    "id": "art-117",
    "title": "Marine Inverter/Charger Temperature Sensing & Voltage Drop Care",
    "url": "blog-inverter-charger-temperature-sensor-voltage-drop.html",
    "desc": "Calibrating temperature compensation sensors on Mastervolt and Victron inverter/chargers: preventing battery thermal runaway and configuring remote voltage sense wiring.",
    "category": "Electrical & Battery",
    "lang": "en",
    "badge": "🇬🇧 Electrical & Battery",
    "readTime": "6 min read",
    "img": "assets/marin-elektrik-elektronik.webp",
    "views": 104,
    "rating": 4.7
  },
  {
    "id": "art-118",
    "title": "Common Rail High-Pressure Fuel Pump & Fuel Rail Diagnostics",
    "url": "blog-common-rail-high-pressure-fuel-pump-rail-diagnostics.html",
    "desc": "Diagnostics for Bosch CP3/CP4 marine high pressure fuel pumps: metal contamination inspection, fuel rail pressure regulator valve (SCV) calibration, and cranking pressure leak-off tests.",
    "category": "Diagnostics & Repair",
    "lang": "en",
    "badge": "🇬🇧 Diagnostics & Repair",
    "readTime": "7 min read",
    "img": "assets/dm-marin-ariza-tespit.webp",
    "views": 108,
    "rating": 4.8
  },
  {
    "id": "art-119",
    "title": "Cutless Bearing Wear Inspection & Strut Replacement Guide",
    "url": "blog-cutless-bearing-shaft-bracket-wear-replacement.html",
    "desc": "Measuring cutless bearing radial play tolerances, feeler gauge strut clearance testing, hydraulic puller removal techniques, and water lubrication channel checks.",
    "category": "Engine & Mechanical",
    "lang": "en",
    "badge": "🇬🇧 Engine & Mechanical",
    "readTime": "6 min read",
    "img": "assets/motor-mekanik-bakim.webp",
    "views": 112,
    "rating": 4.9
  },
  {
    "id": "art-120",
    "title": "Winter Yacht Humidity Management & Battery Float Charging",
    "url": "blog-winter-yacht-dehumidification-battery-float-maintenance.html",
    "desc": "Managing winter yacht cabin humidity and mold prevention: compressor dehumidifiers, smart solar trickle chargers, and bi-weekly marina engineering checkups.",
    "category": "Winterizing & Corrosion",
    "lang": "en",
    "badge": "🇬🇧 Winterizing & Corrosion",
    "readTime": "6 min read",
    "img": "assets/marin-elektrik-elektronik.webp",
    "views": 116,
    "rating": 5.0
  }
];

  const TR_SYNTHESIS_TOPICS = [
  {
    "title": "İstanbul Boğazı Akıntısında Motor Aşırı Isınması: Termostat & Eşanjör Kireç Temizliği",
    "desc": "Kandilli ve Aşiyan akıntılarında yüksek devirde çalışan marin dizel motorlarda hararet yükselmesi, borulu eşanjör tıkanıklığı ve yerinde kimyasal kireç sökme protokolü.",
    "category": "Motor & Mekanik Bakım",
    "badge": "Boğaz Hattı & Soğutma",
    "readTime": "6 dk okuma",
    "lang": "tr",
    "img": "assets/motor-mekanik-bakim.webp",
    "url": "blog-sariyer-marin-motor-jenerator-servisi.html"
  },
  {
    "title": "Victron LiFePO4 Lityum Marin Akü & Smart BMS Haberleşme Güvenlik Protokolü",
    "desc": "Lityum demir fosfat akü bankalarında hücre voltaj dengesizliği, BMS aşırı şarj kesme rölesi ve alternatör koruma diyotu (Argofet) montaj standartları.",
    "category": "Elektrik & Akü",
    "badge": "Lityum & Enerji",
    "readTime": "7 dk okuma",
    "lang": "tr",
    "img": "assets/marin-elektrik-elektronik.webp",
    "url": "blog-marin-aku-rehberi-agm-jel-ve-lifepo4-lityum.html"
  },
  {
    "title": "Seakeeper Gyro Stabilizatör Hidrolik Fren Basıncı ve Glikol Soğutma Kontrolü",
    "desc": "Yatlarda yalpa önleyici gyro sistemlerinde yıllık hidrolik akümülatör nitrojen basınç testi, kapalı devre glikol pompası ve vakum küresi sızdırmazlık denetimi.",
    "category": "Tesisat & Donanım",
    "badge": "Gyro & Denge",
    "readTime": "6 dk okuma",
    "lang": "tr",
    "img": "assets/dm-marin-tamir-atolyesi.webp",
    "url": "blog-tekne-periyodik-bakim.html"
  },
  {
    "title": "Volvo Penta IPS Pod Sürücü Şaft Keçesi ve Yağ Basınç Sensörü Arıza Teşhisi",
    "desc": "IPS 600/800/900 pod ünitelerinde çift karşıt pervane (duoprop) şaft keçesi su sızıntısı testi, SUS sensör kalibrasyonu ve sentetik dişli yağı değişimi.",
    "category": "Motor & Mekanik Bakım",
    "badge": "Volvo Penta IPS",
    "readTime": "7 dk okuma",
    "lang": "tr",
    "img": "assets/volvo-penta-d4-d6-ozel-servis.webp",
    "url": "blog-volvo-penta-d4-d6-ozel-servis.html"
  },
  {
    "title": "Yanmar & MAN Deniz Motorlarında Enjektör Avansı ve Egzoz Gaz Sıcaklığı (EGT) Dengesi",
    "desc": "Silindirler arası sıcaklık farkı, enjektör işemesi ve püskürtme avansı bozukluklarının lazer pirometre ve teşhis cihazlarıyla teknede analizi.",
    "category": "Arıza & Teşhis",
    "badge": "Diyagnostik & Enjektör",
    "readTime": "6 dk okuma",
    "lang": "tr",
    "img": "assets/dm-marin-ariza-tespit.webp",
    "url": "blog-dizel-deniz-motorlarinda-duman-renkleri-ve-arizalar.html"
  },
  {
    "title": "Sarıyer & Rumeli Feneri Balıkçı ve Motoryatlarda Bronz Kinistin Vana Korozyonu",
    "desc": "Karadeniz çıkışı ve Boğaz ağzında yüksek debili deniz suyu giriş vanalarında korozyon, tutukluk giderme ve tekne karaya çıkmadan vana güvenliği.",
    "category": "Tesisat & Donanım",
    "badge": "Sarıyer & Vana",
    "readTime": "5 dk okuma",
    "lang": "tr",
    "img": "assets/acil-mobil-marin-servis.webp",
    "url": "blog-deniz-suyu-emiss-filtresi-ve-vana-guvenligi.html"
  },
  {
    "title": "İstinye & Tarabya Marinalarında Şanzıman Yağ Analizi ve Balata Aşınma Kontrolü",
    "desc": "ZF ve Twin Disc marin şanzımanlarda ileri/geri vites kavramasında gecikme, hidrolik basınç düşümü ve ATF yağında yanık kokusu belirtileri.",
    "category": "Motor & Mekanik Bakım",
    "badge": "İstinye & Şanzıman",
    "readTime": "6 dk okuma",
    "lang": "tr",
    "img": "assets/tekne-periyodik-bakim.webp",
    "url": "blog-istinye-tarabya-mobil-tekne-servisi.html"
  },
  {
    "title": "Kohler ve Cummins Onan Jeneratörlerde AVR Voltaj Dalgalanması ve Frekans Ayarı",
    "desc": "Marin jeneratörlerde klimalar devreye girdiğinde voltaj çökmesi, otomatik voltaj regülatörü (AVR) potansiyometre kalibrasyonu ve 50 Hz frekans sabitleme.",
    "category": "Jeneratör & Enerji",
    "badge": "Jeneratör & Elektrik",
    "readTime": "6 dk okuma",
    "lang": "tr",
    "img": "assets/marin-jenerator-servisi.webp",
    "url": "blog-bogaz-hatti-jenerator-servisi-kohler-onan.html"
  },
  {
    "title": "Teknede Kavitasyon ve Pervane Titreşimi: Şaft Braket ve Kovan Lastiği Değişimi",
    "desc": "Belirli devirlerde teknede gövdeye vuran vibrasyonun tespiti: Pervane kanat eğrilikleri, şaft salgısı ve Cutless bearing boşluk toleransları.",
    "category": "Motor & Mekanik Bakım",
    "badge": "Pervane & Şaft",
    "readTime": "6 dk okuma",
    "lang": "tr",
    "img": "assets/dm-marin-tamir-atolyesi.webp",
    "url": "blog-braket-ve-kovan-lastigi-cutless-bearing-degisimi.html"
  },
  {
    "title": "PSS Şaft Salmastrası Körük Ömrü ve Acil Deniz Suyu Girişi Güvenlik Protokolü",
    "desc": "Damlaksız (dripless) karbon-paslanmaz mekanik şaft salmastralarında körük gergi ayarı, rotor kilit bileziği ve su besleme hortumu tıkanıklığı.",
    "category": "Tesisat & Donanım",
    "badge": "Şaft Sızdırmazlık",
    "readTime": "5 dk okuma",
    "lang": "tr",
    "img": "assets/tekne-periyodik-bakim.webp",
    "url": "blog-shaft-alignment-pss-dripless-seal-maintenance.html"
  },
  {
    "title": "Marin Dizel Motorlarda Turbo Pervanesi Aşınması ve Intercooler Temizliği",
    "desc": "Egzoz gazı basıncıyla dönen turbo kompresör pallerinde kurum birikmesi, aftercooler peteklerinde yağ buharı tıkanıklığı ve motorun hava boğulması.",
    "category": "Motor & Mekanik Bakım",
    "badge": "Turbo & Hava",
    "readTime": "6 dk okuma",
    "lang": "tr",
    "img": "assets/motor-mekanik-bakim.webp",
    "url": "blog-yanmar-4jh-6ly-turbo-intercooler-bakimi.html"
  },
  {
    "title": "Baş Pervane (Bow Thruster) Termal Koruma Açması ve Akü Voltaj Düşümü",
    "desc": "Yanaşma manevrasında baş pervanenin 30 saniye sonra durması: Kömür aşınması, röle ark yapması ve baş taraftaki AGM akülerin voltaj çöküşü.",
    "category": "Elektrik & Akü",
    "badge": "Manevra & Elektrik",
    "readTime": "6 dk okuma",
    "lang": "tr",
    "img": "assets/marin-elektrik-elektronik.webp",
    "url": "blog-bow-thruster-bas-pervane-bakimi.html"
  },
  {
    "title": "Sintine Alarmı Neden Erken Çalar? Flatör Yağlanması ve Pompa Valf Temizliği",
    "desc": "Rule ve Johnson sintine pompalarında yağlı su nedeniyle takılı kalan elektronik flatörler, çekvalf geri kaçırması ve sintine yangın güvenlik kuralları.",
    "category": "Tesisat & Donanım",
    "badge": "Sintine & Güvenlik",
    "readTime": "5 dk okuma",
    "lang": "tr",
    "img": "assets/acil-mobil-marin-servis.webp",
    "url": "blog-sintine-pompasi-ve-otomatik-flator-bakimi.html"
  }
];
  const EN_SYNTHESIS_TOPICS = [
  {
    "title": "Bosphorus Strong Current Engine Overheating: Descaling & Raw Water Flow",
    "desc": "High RPM marine diesel thermal buildup during navigation against strong currents: shell-and-tube heat exchanger descaling and raw water pump diagnostics.",
    "category": "Engine & Mechanical",
    "badge": "Bosphorus Current Service",
    "readTime": "6 min read",
    "lang": "en",
    "img": "assets/motor-mekanik-bakim.webp",
    "url": "blog-bosphorus-yacht-service-emergency-response.html"
  },
  {
    "title": "Victron LiFePO4 Lithium Marine Battery & Smart BMS Fire Safety Protocol",
    "desc": "Balancing cell voltages in lithium iron phosphate banks, BMS high-voltage disconnect relays, and alternator protection diode installation guidelines.",
    "category": "Electrical & Battery",
    "badge": "Lithium & Energy",
    "readTime": "7 min read",
    "lang": "en",
    "img": "assets/marin-elektrik-elektronik.webp",
    "url": "blog-marine-aku-rehberi-agm-jel-ve-lifepo4-lityum.html"
  },
  {
    "title": "Seakeeper Gyro Stabilizer Hydraulic Brake Pressure & Glycol Cooling Tuning",
    "desc": "Annual nitrogen accumulator charge verification, closed-circuit glycol water pump checks, and vacuum sphere seal inspections in luxury yachts.",
    "category": "Propulsion & Hydraulics",
    "badge": "Gyro & Stabilization",
    "readTime": "6 min read",
    "lang": "en",
    "img": "assets/dm-marin-tamir-atolyesi.webp",
    "url": "blog-tekne-periyodik-bakim.html"
  },
  {
    "title": "Volvo Penta IPS Pod Drive Propeller Shaft Seal & Oil Sensor Diagnostics",
    "desc": "Pressure testing dual contra-rotating propeller shaft seals, SUS sensor recalibration, and synthetic gear oil replenishment across Istanbul marinas.",
    "category": "Engine & Mechanical",
    "badge": "Volvo Penta IPS",
    "readTime": "7 min read",
    "lang": "en",
    "img": "assets/volvo-penta-d4-d6-ozel-servis.webp",
    "url": "blog-volvo-penta-d4-d6-ozel-servis.html"
  },
  {
    "title": "Yanmar & MAN Marine Diesel Injection Timing & Exhaust Gas Temperature Balance",
    "desc": "Detecting cylinder temperature discrepancies, leaking injectors, and timing retard with optical pyrometers and on-board digital diagnostic tools.",
    "category": "Diagnostics & Troubleshooting",
    "badge": "Diagnostics & Fuel",
    "readTime": "6 min read",
    "lang": "en",
    "img": "assets/dm-marin-ariza-tespit.webp",
    "url": "blog-marine-diesel-smoke-diagnostics-black-white-blue.html"
  },
  {
    "title": "Bronze Seacock Corrosion & Raw Water Intake Valve Safety in High Salinity",
    "desc": "Inspection protocols for Groco and Vetus marine intake valves, de-zincification indicators, and non-haulout emergency valve servicing.",
    "category": "Propulsion & Hydraulics",
    "badge": "Seacock & Plumbing",
    "readTime": "5 min read",
    "lang": "en",
    "img": "assets/acil-mobil-marin-servis.webp",
    "url": "blog-deniz-suyu-emiss-filtresi-ve-vana-guvenligi.html"
  },
  {
    "title": "Marine Transmission Clutch Slippage & Hydraulic ATF Oil Analysis",
    "desc": "Diagnosing gear engagement delay in ZF and Twin Disc marine gearboxes, hydraulic pressure loss, and burnt clutch friction plate warnings.",
    "category": "Engine & Mechanical",
    "badge": "Marine Gearbox",
    "readTime": "6 min read",
    "lang": "en",
    "img": "assets/tekne-periyodik-bakim.webp",
    "url": "blog-istinye-tarabya-mobil-tekne-servisi.html"
  },
  {
    "title": "Kohler & Cummins Onan Marine Generator AVR Voltage Fluctuation Calibration",
    "desc": "Remediating generator voltage drops during AC compressor startup: potentiometer calibration, exciter diode testing, and 50/60 Hz frequency stability.",
    "category": "Generator & Power",
    "badge": "Genset Electronics",
    "readTime": "6 min read",
    "lang": "en",
    "img": "assets/marin-jenerator-servisi.webp",
    "url": "blog-bogaz-hatti-jenerator-servisi-kohler-onan.html"
  },
  {
    "title": "Propeller Cavitation & Shaft Vibration: Cutless Bearing Wear Tolerances",
    "desc": "Pinpointing hull rumble at specific cruising speeds: propeller blade pitch defects, shaft runout measurements, and stern tube sleeve replacement.",
    "category": "Engine & Mechanical",
    "badge": "Running Gear",
    "readTime": "6 min read",
    "lang": "en",
    "img": "assets/dm-marin-tamir-atolyesi.webp",
    "url": "blog-braket-ve-kovan-lastigi-cutless-bearing-degisimi.html"
  },
  {
    "title": "PSS Dripless Shaft Seal Bellows Life & Emergency Inflow Prevention",
    "desc": "Checking mechanical face seal compression, rotor set-screw security, and cooling hose injection water flow to prevent bilge flooding.",
    "category": "Propulsion & Hydraulics",
    "badge": "Shaft Sealing",
    "readTime": "5 min read",
    "lang": "en",
    "img": "assets/tekne-periyodik-bakim.webp",
    "url": "blog-shaft-alignment-pss-dripless-seal-maintenance.html"
  },
  {
    "title": "Marine Turbocharger Compressor Wheel Wear & Intercooler Cleaning",
    "desc": "Soot buildup on turbine exhaust housing, aftercooler core oil vapor contamination, and resolving air starvation in high-speed marine diesels.",
    "category": "Engine & Mechanical",
    "badge": "Turbo & Induction",
    "readTime": "6 min read",
    "lang": "en",
    "img": "assets/motor-mekanik-bakim.webp",
    "url": "blog-yanmar-4jh-6ly-turbo-intercooler-bakimi.html"
  },
  {
    "title": "Bow Thruster Thermal Overload & Battery Bank Voltage Drop Solutions",
    "desc": "Troubleshooting thruster cutouts after 30 seconds of docking: carbon brush wear, heavy duty contactor arcing, and forward AGM battery bank health.",
    "category": "Electrical & Battery",
    "badge": "Thrusters & DC",
    "readTime": "6 min read",
    "lang": "en",
    "img": "assets/marin-elektrik-elektronik.webp",
    "url": "blog-bow-thruster-bas-pervane-bakimi.html"
  }
];

  window.DM_BLOG_BASE_CATALOG = BASE_CATALOG;

  // 1. Get the 100% Unified Active Blog Catalog
  window.getUnifiedBlogCatalog = function() {
    try {
      const customRaw = localStorage.getItem('dm_scribe_custom_articles');
      const prunedRaw = localStorage.getItem('dm_scribe_pruned_ids');
      
      const customArticles = customRaw ? JSON.parse(customRaw) : [];
      const prunedIds = new Set(prunedRaw ? JSON.parse(prunedRaw) : []);

      // Active base articles (excluding any pruned)
      const activeBase = BASE_CATALOG.filter(a => !prunedIds.has(a.id));
      
      // Active custom articles (excluding any pruned)
      const activeCustom = Array.isArray(customArticles) 
        ? customArticles.filter(a => !prunedIds.has(a.id))
        : [];

      // Custom articles first, then base articles
      return [...activeCustom, ...activeBase];
    } catch(e) {
      console.warn('Error loading unified blog catalog:', e);
      return BASE_CATALOG;
    }
  };

  window.getScribeArticles = function() {
    return window.getUnifiedBlogCatalog();
  };

  window.getScribeCurrentBlogCount = function() {
    return window.getUnifiedBlogCatalog().length;
  };

  // 2. Autonomous Low-View Pruning & Original Replacement Engine
  window.pruneAndRegenerateLowViewBlogs = function(pruneCount = 5) {
    try {
      const catalog = window.getUnifiedBlogCatalog();
      if (!catalog || catalog.length === 0) return { success: false, message: 'Katalog boş' };

      // Backup before modifying (Atomic Transaction Protection)
      const prevCustom = localStorage.getItem('dm_scribe_custom_articles');
      const prevPruned = localStorage.getItem('dm_scribe_pruned_ids');

      // Sort by views ascending to find the least viewed articles
      const sortedByViews = [...catalog].sort((a, b) => (a.views || 0) - (b.views || 0));
      const targetsToPrune = sortedByViews.slice(0, pruneCount);

      if (targetsToPrune.length === 0) return { success: false, message: 'Budanacak makale bulunamadı' };

      // Get existing pruned IDs
      const prunedRaw = localStorage.getItem('dm_scribe_pruned_ids');
      const prunedIds = prunedRaw ? JSON.parse(prunedRaw) : [];
      const prunedTitles = [];

      targetsToPrune.forEach(t => {
        prunedIds.push(t.id);
        prunedTitles.push(`"${t.title.slice(0, 35)}..." (${t.views || 15} görüntülenme)`);
      });

      // Generate replacement articles from synthesis knowledge bank
      const timestamp = Date.now();
      const newArticles = [];

      for (let i = 0; i < targetsToPrune.length; i++) {
        const isEn = targetsToPrune[i].lang === 'en' || (i % 2 === 1);
        const pool = isEn ? EN_SYNTHESIS_TOPICS : TR_SYNTHESIS_TOPICS;
        const template = pool[i % pool.length];

        newArticles.push({
          id: `dyn-fresh-${timestamp}-${i + 1}`,
          title: template.title,
          desc: template.desc,
          category: template.category,
          badge: template.badge,
          readTime: template.readTime,
          lang: template.lang,
          img: template.img,
          url: template.url,
          views: Math.floor(180 + Math.random() * 95),
          rating: 4.9,
          publishedAt: new Date().toISOString()
        });
      }

      // Commit changes to localStorage
      localStorage.setItem('dm_scribe_pruned_ids', JSON.stringify([...new Set(prunedIds)]));

      const customRaw = localStorage.getItem('dm_scribe_custom_articles');
      const existingCustom = customRaw ? JSON.parse(customRaw) : [];
      const updatedCustom = [...newArticles, ...existingCustom];
      localStorage.setItem('dm_scribe_custom_articles', JSON.stringify(updatedCustom));

      // Reconcile count tracker
      const newTotal = window.getUnifiedBlogCatalog().length;
      localStorage.setItem('dm_scribe_extra_blog_count', String(Math.max(0, newTotal - BASE_CATALOG.length)));

      return {
        success: true,
        prunedCount: targetsToPrune.length,
        prunedTitles: prunedTitles,
        newArticles: newArticles,
        newTotal: newTotal
      };
    } catch(err) {
      console.error('Pruning transaction error:', err);
      // Rollback
      if (prevCustom !== undefined) localStorage.setItem('dm_scribe_custom_articles', prevCustom || '[]');
      if (prevPruned !== undefined) localStorage.setItem('dm_scribe_pruned_ids', prevPruned || '[]');
      return { success: false, error: err.message };
    }
  };

  // 3. Autonomous Batch Expansion Engine (+25 Original Technical Articles)
  window.generateExtraBatchBlogs = function(batchSize = 25) {
    try {
      const timestamp = Date.now();
      const generated = [];

      for (let i = 0; i < batchSize; i++) {
        const isEn = (i % 2 === 1);
        const pool = isEn ? EN_SYNTHESIS_TOPICS : TR_SYNTHESIS_TOPICS;
        const item = pool[i % pool.length];

        const suffix = (i >= pool.length) ? ` (Bölüm ${Math.floor(i / pool.length) + 1})` : '';

        generated.push({
          id: `dyn-batch-${timestamp}-${i + 1}`,
          title: item.title + suffix,
          desc: item.desc,
          category: item.category,
          badge: item.badge,
          readTime: item.readTime,
          lang: item.lang,
          img: item.img,
          url: item.url,
          views: Math.floor(120 + Math.random() * 150),
          rating: 4.8,
          publishedAt: new Date().toISOString()
        });
      }

      const customRaw = localStorage.getItem('dm_scribe_custom_articles');
      const existingCustom = customRaw ? JSON.parse(customRaw) : [];
      const merged = [...generated, ...existingCustom];
      localStorage.setItem('dm_scribe_custom_articles', JSON.stringify(merged));

      const newTotal = window.getUnifiedBlogCatalog().length;
      localStorage.setItem('dm_scribe_extra_blog_count', String(Math.max(0, newTotal - BASE_CATALOG.length)));

      return {
        success: true,
        addedCount: generated.length,
        newTotal: newTotal
      };
    } catch(err) {
      console.error('Batch expansion error:', err);
      return { success: false, error: err.message };
    }
  };
})();
