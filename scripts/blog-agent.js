#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");
const MAX_BLOG_LIMIT = 80;

const TOPIC_CATALOG = [
  {
    id: "volvo-penta-d4-d6-d13",
    file_tr: "blog-volvo-penta-d4-d6-d13-bakim-ve-arizalar.html",
    file_en: "blog-volvo-penta-d4-d6-d13-maintenance-and-faults.html",
    category_tr: "Motor & Mekanik Bakım",
    category_en: "Engine & Mechanical",
    image: "assets/volvo-penta-d4-d6-ozel-servis.webp",
    read_tr: "7 dk",
    read_en: "7 min",
    title_tr: "Volvo Penta D4, D6 ve D13 Bakım Rehberi ve Arıza Teşhisi | DM MARİN",
    title_en: "Volvo Penta D4, D6 & D13 Marine Engine Maintenance & Diagnostics | DM MARIN",
    h1_tr: "Volvo Penta D4, D6 ve D13 Bakım Rehberi ve Arıza Teşhisi",
    h1_en: "Volvo Penta D4, D6 & D13 Marine Engine Maintenance & Diagnostics",
    desc_tr: "Volvo Penta D4, D6 ve D13 Common Rail marin dizel motorlarda 100/200/500 saatlik periyodik bakım takvimi, kompresör yağı, aftercooler ve EVC arıza kodları rehberi.",
    desc_en: "Scheduled maintenance guide for Volvo Penta D4, D6 and D13 Common Rail marine diesels: 100/200/500 hr service, compressor oil, aftercoolers, and EVC diagnostic codes.",
    keywords_tr: "volvo penta d6 servis, volvo d4 bakım, volvo penta arıza kodları, d13 marin motor, volvo penta istanbul",
    keywords_en: "volvo penta d6 service, volvo d4 maintenance, volvo penta diagnostics turkey, d13 marine diesel repair"
  },
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
    category_tr: "Arıza & Teşhis",
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
    id: "yanmar-dizel-duman-renkleri",
    file_tr: "blog-yanmar-dizel-motor-duman-renkleri-ve-teshis.html",
    file_en: "blog-marine-diesel-exhaust-smoke-color-diagnostics.html",
    category_tr: "Arıza & Teşhis",
    category_en: "Diagnostics & Repair",
    image: "assets/dm-marin-ariza-tespit.webp",
    read_tr: "5 dk",
    read_en: "5 min",
    title_tr: "Marin Dizel Motorlarda Duman Renkleri: Siyah, Beyaz ve Mavi Duman Teşhisi | DM MARİN",
    title_en: "Marine Diesel Smoke Diagnostics: Black, White & Blue Smoke Analysis | DM MARIN",
    h1_tr: "Marin Dizel Motorlarda Duman Renkleri: Siyah, Beyaz ve Mavi Duman Teşhisi",
    h1_en: "Marine Diesel Smoke Diagnostics: Black, White & Blue Smoke Analysis",
    desc_tr: "Tekne egzozundan çıkan siyah, beyaz ve mavi dumanın mühendislik nedenleri: Enjektör damlatması, turbo basınç kaybı, supap lastiği aşınması ve silindir kapağı su sızıntısı.",
    desc_en: "Engineering causes of black, white, and blue yacht exhaust smoke: dripping injectors, turbo boost pressure drops, worn valve seals, and cylinder head gasket leaks.",
    keywords_tr: "tekne motoru siyah duman, marin dizel beyaz duman, tekne egzoz dumanı arıza, enjektör arızası marin",
    keywords_en: "marine diesel black smoke, yacht engine white smoke, blue diesel exhaust diagnostics, faulty marine injectors"
  },
  {
    id: "man-mtu-marine-yuksek-devirli",
    file_tr: "blog-man-mtu-marine-yuksek-devirli-dizel-bakimi.html",
    file_en: "blog-man-mtu-marine-high-speed-diesel-service.html",
    category_tr: "Motor & Mekanik Bakım",
    category_en: "Engine & Mechanical",
    image: "assets/man-marine-v8-v12-ozel-servis.webp",
    read_tr: "8 dk",
    read_en: "8 min",
    title_tr: "MAN & MTU Marine V8/V12 Yüksek Güçlü Dizel Motor Bakımı | DM MARİN",
    title_en: "MAN & MTU Marine V8/V12 High Performance Diesel Service | DM MARIN",
    h1_tr: "MAN & MTU Marine V8/V12 Yüksek Güçlü Dizel Motor Bakımı",
    h1_en: "MAN & MTU Marine V8/V12 High Performance Diesel Service",
    desc_tr: "MAN i6, V8, V12 ve MTU Series 2000 Common Rail motorlarda W1/W2/W3/W4 bakım paketleri, intercooler ve turboşarj denetimleri, supap boşluk ayarları.",
    desc_en: "Scheduled W1-W4 maintenance standards for MAN V8/V12 and MTU Series 2000 high-speed marine diesels: intercooler ultrasonic wash, turbo boost, and valve clearances.",
    keywords_tr: "man marine v12 servis, mtu series 2000 bakım, man tekne motoru tamiri, mtu yetkili özel servis",
    keywords_en: "man marine v12 service turkey, mtu series 2000 yacht engine overhaul, man yacht diesel bodrum istanbul"
  },
  {
    id: "marin-jenerator-ariza-ve-deniz-suyu",
    file_tr: "blog-marin-jenerator-ariza-ve-deniz-suyu-sogutma.html",
    file_en: "blog-marine-generator-faults-sea-water-cooling.html",
    category_tr: "Jeneratör & Enerji",
    category_en: "Generators & Power",
    image: "assets/cummins-onan-jenerator-servisi.webp",
    read_tr: "6 dk",
    read_en: "6 min",
    title_tr: "Marin Jeneratör Arıza Teşhisi ve Deniz Suyu Soğutma Sistemi | DM MARİN",
    title_en: "Marine Generator Diagnostics & Raw Water Cooling Troubleshooting | DM MARIN",
    h1_tr: "Marin Jeneratör Arıza Teşhisi ve Deniz Suyu Soğutma Sistemi",
    h1_en: "Marine Generator Diagnostics & Raw Water Cooling Troubleshooting",
    desc_tr: "Cummins Onan, Kohler, Fischer Panda ve Westerbeke marin jeneratörlerde aşırı ısınma (overheat), impeller kanat kırılması, ısı eşanjörü tıkanıklığı ve stop etme arızaları.",
    desc_en: "Troubleshooting overheating, broken impeller blades, clogged heat exchangers, and fault codes on Cummins Onan, Kohler, and Fischer Panda marine generators.",
    keywords_tr: "onan jeneratör servisi, kohler tekne jeneratör arıza, marin jeneratör hararet, tekne jeneratör impeller",
    keywords_en: "cummins onan generator service turkey, kohler yacht genset repair, marine generator raw water pump impeller"
  },
  {
    id: "fischer-panda-genset-care",
    file_tr: "blog-fischer-panda-jenerator-bakimi-ve-inverter-arizalari.html",
    file_en: "blog-fischer-panda-marine-generator-service-inverter.html",
    category_tr: "Jeneratör & Enerji",
    category_en: "Generators & Power",
    image: "assets/marin-jenerator-servisi.webp",
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
    category_en: "Systems & Hardware",
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
  },
  {
    id: "tekne-yakit-deposu-temizligi",
    file_tr: "blog-tekne-yakit-deposu-temizligi-ve-diesel-bug.html",
    file_en: "blog-yacht-fuel-tank-cleaning-diesel-bug-solution.html",
    category_tr: "Motor & Mekanik Bakım",
    category_en: "Engine & Mechanical",
    image: "assets/marin-motor-tamiri.webp",
    read_tr: "6 dk",
    read_en: "6 min",
    title_tr: "Tekne Yakıt Deposu Temizliği ve Dizel Mikrobu (Diesel Bug) Çözümü | DM MARİN",
    title_en: "Yacht Fuel Tank Decontamination & Diesel Bug Eradication | DM MARIN",
    h1_tr: "Tekne Yakıt Deposu Temizliği ve Dizel Mikrobu (Diesel Bug) Çözümü",
    h1_en: "Yacht Fuel Tank Decontamination & Diesel Bug Eradication Guide",
    desc_tr: "Dizel yakıt tanklarında biriken çamur, pas ve bakteri kolonilerinin (diesel bug) yakıt filtrelerini tıkamasını engelleyen profesyonel mekanik yıkama.",
    desc_en: "Preventing filter clogging and engine stall: removing diesel bug sludge, water condensation, and asphaltenes from yacht marine fuel tanks.",
    keywords_tr: "dizel mikrobu tekne, mazot çamuru temizleme, tekne yakıt deposu yıkama, diesel bug marin",
    keywords_en: "diesel bug boat, yacht fuel tank cleaning, marine diesel sludge removal, diesel biocide turkey"
  },
  {
    id: "tekne-aku-secimi-lityum",
    file_tr: "blog-tekne-aku-secimi-ve-lityum-donusumu.html",
    file_en: "blog-marine-battery-selection-lifepo4-lithium-conversion.html",
    category_tr: "Elektrik & Akü",
    category_en: "Electrical & Batteries",
    image: "assets/marin-elektrik-elektronik.webp",
    read_tr: "7 dk",
    read_en: "7 min",
    title_tr: "Marin Akü Seçimi ve LiFePO4 Lityum Akü Dönüşüm Rehberi | DM MARİN",
    title_en: "Marine Battery Systems & LiFePO4 Lithium Conversion Guide | DM MARIN",
    h1_tr: "Marin Akü Seçimi ve LiFePO4 Lityum Akü Dönüşüm Rehberi",
    h1_en: "Marine Battery Systems & LiFePO4 Lithium Conversion Guide",
    desc_tr: "AGM ve Jel akülerden LiFePO4 lityum demir fosfat sistemlere geçiş, BMS yönetimi, DC-DC şarj regülatörleri ve marin alternatör koruma kılavuzu.",
    desc_en: "Converting yacht battery banks from AGM/Gel to LiFePO4 Lithium Iron Phosphate: BMS configuration, DC-DC chargers, and high-amp alternator protection.",
    keywords_tr: "tekne lityum akü, lifepo4 marin akü, tekne akü değişimi, victron bms tekne, jel akü marin",
    keywords_en: "marine lithium battery conversion, yacht lifepo4 battery, victron marine charger, boat battery bank upgrade"
  },
  {
    id: "seakeeper-gyro-stabilizer",
    file_tr: "blog-seakeeper-gyro-stabilizer-bakimi.html",
    file_en: "blog-seakeeper-gyro-stabilizer-maintenance-cooling.html",
    category_tr: "Tesisat & Donanım",
    category_en: "Systems & Hardware",
    image: "assets/tekne-periyodik-bakim.webp",
    read_tr: "6 dk",
    read_en: "6 min",
    title_tr: "Seakeeper Gyro Stabilizer Bakımı ve Soğutma Devresi Servisi | DM MARİN",
    title_en: "Seakeeper Gyro Stabilizer Maintenance & Cooling Circuit Servicing | DM MARIN",
    h1_tr: "Seakeeper Gyro Stabilizer Bakımı ve Soğutma Devresi Servisi",
    h1_en: "Seakeeper Gyro Stabilizer Maintenance & Cooling Circuit Servicing",
    desc_tr: "Seakeeper 1, 2, 3, 6, 9, 18 ve 26 gyro stabilizatörlerde glikol kapalı devre soğutma sıvısı değişimi, hidrolik fren basıncı ve rulman titreşim analizi.",
    desc_en: "Scheduled maintenance for Seakeeper 1-26 gyros: closed-loop glycol coolant exchange, hydraulic brake pressure inspection, and bearing vibration telemetry.",
    keywords_tr: "seakeeper servisi, tekne gyro stabilizatör bakımı, seakeeper soğutma sıvısı, seakeeper arıza",
    keywords_en: "seakeeper service turkey, yacht gyro stabilizer maintenance bodrum, seakeeper glycol change, yacht rolling stabilization"
  },
  {
    id: "tekne-su-yapici-watermaker",
    file_tr: "blog-tekne-su-yapici-watermaker-bakimi.html",
    file_en: "blog-marine-watermaker-maintenance-winterizing.html",
    category_tr: "Tesisat & Donanım",
    category_en: "Systems & Hardware",
    image: "assets/dm-marin-tamir-atolyesi.webp",
    read_tr: "6 dk",
    read_en: "6 min",
    title_tr: "Tekne Su Yapıcı (Watermaker) Bakımı ve Membran Koruma Kılavuzu | DM MARİN",
    title_en: "Marine Reverse Osmosis Watermaker Maintenance & Membrane Preservation | DM MARIN",
    h1_tr: "Tekne Su Yapıcı (Watermaker) Bakımı ve Membran Koruma Kılavuzu",
    h1_en: "Marine Reverse Osmosis Watermaker Maintenance & Membrane Preservation",
    desc_tr: "Ters osmoz su yapıcılarda yüksek basınç pompası yağ değişimi, 5/20 mikron ön filtre yenileme, membran kışlama (pickling) ve kireç asitleme.",
    desc_en: "Reverse osmosis watermaker upkeep: high-pressure pump oil change, 5/20 micron pre-filter replacement, chemical pickling, and winter membrane preservation.",
    keywords_tr: "tekne su yapıcı bakımı, watermaker membran koruma, schenker su yapıcı servis, idromar watermaker kışlama",
    keywords_en: "yacht watermaker service turkey, reverse osmosis membrane pickling, schenker watermaker maintenance, marine desalinator repair"
  },
  {
    id: "bow-thruster-bas-pervane",
    file_tr: "blog-bow-thruster-bas-pervane-bakimi.html",
    file_en: "blog-bow-stern-thruster-maintenance-yacht.html",
    category_tr: "Motor & Mekanik Bakım",
    category_en: "Engine & Mechanical",
    image: "assets/dm-marin-mobil-servis.webp",
    read_tr: "5 dk",
    read_en: "5 min",
    title_tr: "Teknelerde Baş ve Kıç Pervane (Bow & Stern Thruster) Bakım Rehberi | DM MARİN",
    title_en: "Bow & Stern Thruster Maintenance & Overhaul Guide | DM MARIN",
    h1_tr: "Teknelerde Baş ve Kıç Pervane (Bow Thruster) Bakım Rehberi",
    h1_en: "Bow & Stern Thruster Maintenance & Overhaul Guide",
    desc_tr: "Side-Power, Sleipner, Quick ve Max Power baş/kıç pervanelerde şanzıman kuyruk yağı, kömür fırça aşınması, tutya değişimi ve tünel temizliği.",
    desc_en: "Maintaining Side-Power/Sleipner and Quick bow/stern thrusters: gear leg oil, motor carbon brushes, sacrificial anodes, and tunnel anti-fouling.",
    keywords_tr: "baş pervane bakımı, bow thruster tutya, tekne manevra pervanesi arıza, side power baş pervane",
    keywords_en: "bow thruster maintenance boat, sleipner stern thruster repair turkey, yacht thruster gearbox oil, side-power service"
  },
  {
    id: "tutya-anot-galvanik-korozyon",
    file_tr: "blog-tutya-anot-ve-galvanik-korozyon-korunma.html",
    file_en: "blog-sacrificial-anodes-galvanic-corrosion-guide.html",
    category_tr: "Kışlama & Koruma",
    category_en: "Winterizing & Protection",
    image: "assets/tekne-periyodik-bakim.webp",
    read_tr: "6 dk",
    read_en: "6 min",
    title_tr: "Galvanik Korozyon Nedir? Çinko, Alüminyum ve Magnezyum Tutya Seçimi | DM MARİN",
    title_en: "Sacrificial Anodes & Galvanic Corrosion Protection for Yachts | DM MARIN",
    h1_tr: "Galvanik Korozyon Nedir? Çinko, Alüminyum ve Magnezyum Tutya Seçimi",
    h1_en: "Sacrificial Anodes & Galvanic Corrosion Protection for Yachts",
    desc_tr: "Tuzlu, tatlı ve acı sularda doğru tutya seçimi, şaft, pervane, bow thruster ve motor bloğu anot kontrolü, galvanik izolatörün önemi.",
    desc_en: "Selecting Zinc, Aluminum, or Magnesium sacrificial anodes for saltwater and brackish waters: shaft collars, prop anodes, and galvanic isolators.",
    keywords_tr: "tekne tutya değişimi, şaft tutyası, çinko tutya alüminyum tutya farkı, tekne galvanik korozyon",
    keywords_en: "sacrificial zinc anodes yacht, shaft anode replacement, boat galvanic corrosion protection, aluminum vs zinc boat anodes"
  },
  {
    id: "kislik-tekne-motoru-kislama",
    file_tr: "blog-kislik-tekne-motoru-ve-antifriz-kislama.html",
    file_en: "blog-yacht-winterizing-antifreeze-engine-protection.html",
    category_tr: "Kışlama & Koruma",
    category_en: "Winterizing & Protection",
    image: "assets/tekne-periyodik-bakim.webp",
    read_tr: "7 dk",
    read_en: "7 min",
    title_tr: "Kışlık Tekne Motoru Kışlama ve Donma Koruması Rehberi | DM MARİN",
    title_en: "Yacht Engine Winterizing & Freeze Protection Guide | DM MARIN",
    h1_tr: "Kışlık Tekne Motoru Kışlama ve Donma Koruması Rehberi",
    h1_en: "Yacht Engine Winterizing & Freeze Protection Guide",
    desc_tr: "Tekne ana makineleri, jeneratör, klima, su yapıcı ve tatlı su devrelerinde toksik olmayan antifriz sirkülasyonu, motor bloğu kışlama protokolü.",
    desc_en: "Step-by-step winterizing protocol for marine diesel engines, generators, air conditioning, and domestic plumbing using non-toxic marine antifreeze.",
    keywords_tr: "tekne kışlama nasıl yapılır, marin motor antifriz basma, tekne donma koruması, tekne kışlık bakım rehberi",
    keywords_en: "yacht winterizing guide, marine engine antifreeze flush, boat winter lay-up turkey, yacht freeze protection"
  },
  {
    id: "marin-turbosarj-egzoz-manifoldu",
    file_tr: "blog-marin-turbosarj-ve-egzoz-manifoldu-bakimi.html",
    file_en: "blog-marine-turbocharger-exhaust-elbow-inspection.html",
    category_tr: "Motor & Mekanik Bakım",
    category_en: "Engine & Mechanical",
    image: "assets/dm-marin-atolye.webp",
    read_tr: "6 dk",
    read_en: "6 min",
    title_tr: "Marin Turboşarj ve Egzoz Dirseği (Exhaust Elbow) Çürüme ve Bakım Rehberi | DM MARİN",
    title_en: "Marine Turbocharger & Exhaust Mixing Elbow Inspection Guide | DM MARIN",
    h1_tr: "Marin Turboşarj ve Egzoz Dirseği (Exhaust Elbow) Çürüme ve Bakım Rehberi",
    h1_en: "Marine Turbocharger & Exhaust Mixing Elbow Inspection Guide",
    desc_tr: "Egzoz dirseğinde deniz suyu korozyonu, turbo pallerinde kurum ve karbon birikimi, paslanmaz egzoz mikseri kontrolü ve motor su basması önleme.",
    desc_en: "Detecting raw water corrosion in exhaust mixing elbows, carbon buildup on turbocharger turbines, and preventing catastrophic engine water ingestion.",
    keywords_tr: "tekne egzoz dirseği çürümesi, marin turbo tamiri, exhaust elbow delinmesi, marin motor su basması",
    keywords_en: "marine exhaust elbow corrosion, yacht turbocharger overhaul, mixing elbow failure boat, turbo boost pressure marin"
  },
  {
    id: "mobil-marin-servis-secimi",
    file_tr: "blog-mobil-marin-servis-secimi-ve-marina-hizmetleri.html",
    file_en: "blog-choosing-mobile-marine-engineering-service.html",
    category_tr: "Motor & Mekanik Bakım",
    category_en: "Engine & Mechanical",
    image: "assets/acil-mobil-marin-servis.webp",
    read_tr: "5 dk",
    read_en: "5 min",
    title_tr: "Marinalarda Mobil Marin Servis Seçerken Nelere Dikkat Edilmelidir? | DM MARİN",
    title_en: "Choosing Certified Mobile Marine Engineering Service in Marinas | DM MARIN",
    h1_tr: "Marinalarda Mobil Marin Servis Seçerken Nelere Dikkat Edilmelidir?",
    h1_en: "Choosing Certified Mobile Marine Engineering Service in Marinas",
    desc_tr: "Marina pontonunda veya açık denizde mobil marin teknisyen çağırırken sertifikasyon, OEM diagnostik cihaz uyumu, şeffaf parça garantisi ve iş güvenliği.",
    desc_en: "Crucial criteria when hiring mobile yacht technicians at marinas: engineering certification, OEM diagnostic tool readiness, warranty, and fast response times.",
    keywords_tr: "mobil marin servis istanbul, yerinde tekne tamiri, marina mobil teknisyen, acil tekne motor servisi",
    keywords_en: "mobile marine service istanbul bodrum, on-site yacht repair marina, emergency boat mechanic turkey"
  },
  {
    id: "caterpillar-cat-c18-c32",
    file_tr: "blog-cat-c18-c32-marin-motor-bakimi.html",
    file_en: "blog-cat-c18-c32-marine-diesel-service.html",
    category_tr: "Motor & Mekanik Bakım",
    category_en: "Engine & Mechanical",
    image: "assets/cat-marine-ozel-servis.webp",
    read_tr: "8 dk",
    read_en: "8 min",
    title_tr: "Caterpillar CAT C18 ve C32 Marin Dizel Motor Bakım Standartları | DM MARİN",
    title_en: "Caterpillar CAT C18 & C32 Marine Diesel Service Standards | DM MARIN",
    h1_tr: "Caterpillar CAT C18 ve C32 Marin Motor Bakım ve Revizyon Standartları",
    h1_en: "Caterpillar CAT C18 & C32 Marine Engine Service & Overhaul Standards",
    desc_tr: "CAT C12, C18 ve C32 ACERT elektronik marin dizel motorlarda MEUI enjektör kalibrasyonu, soğutma kuleleri ultrasonik yıkama ve ECM diagnostik arıza kodları.",
    desc_en: "Scheduled service for CAT C12, C18, and C32 ACERT marine diesels: MEUI injector calibration, heat exchanger descaling, and Cat ET diagnostic telemetry.",
    keywords_tr: "cat marin motor servisi, caterpillar c18 tekne motoru, cat c32 bakım bodrum, cat acurt enjektör",
    keywords_en: "cat marine c18 service turkey, caterpillar c32 yacht engine repair, cat marine et diagnostic bodrum"
  },
  {
    id: "kohler-marine-genset-faults",
    file_tr: "blog-kohler-marin-jenerator-ariza-kodlari-ve-cozumleri.html",
    file_en: "blog-kohler-marine-generator-fault-codes-troubleshooting.html",
    category_tr: "Jeneratör & Enerji",
    category_en: "Generators & Power",
    image: "assets/kohler-onan-marin-jenerator-servisi.webp",
    read_tr: "6 dk",
    read_en: "6 min",
    title_tr: "Kohler Marin Jeneratör Arıza Kodları (LOC, OP, HE) ve Çözümleri | DM MARİN",
    title_en: "Kohler Marine Generator Fault Codes (LOC, OP, HE) Troubleshooting | DM MARIN",
    h1_tr: "Kohler Marin Jeneratör Arıza Kodları (LOC, OP, HE) ve Çözümleri",
    h1_en: "Kohler Marine Generator Fault Codes & Troubleshooting Guide",
    desc_tr: "Kohler Decision-Maker 3500 ve ADC kontrol panellerinde LOC (loss of coolant), OP (oil pressure), HE (high engine temp) arıza kodlarının teşhisi ve sensör onarımı.",
    desc_en: "Diagnostic guide for Kohler marine generators: resolving LOC, OP, HE, and over-crank faults on Decision-Maker 3500 controllers.",
    keywords_tr: "kohler jeneratör arıza kodları, kohler marin servis istanbul, kohler tekne jeneratör tamiri, kohler loc arızası",
    keywords_en: "kohler marine generator troubleshooting, kohler genset loc error turkey, kohler yacht generator service bodrum"
  },
  {
    id: "zf-twin-disc-marine-gearbox",
    file_tr: "blog-zf-twin-disc-marin-sanziman-bakimi.html",
    file_en: "blog-zf-twin-disc-marine-gearbox-maintenance.html",
    category_tr: "Motor & Mekanik Bakım",
    category_en: "Engine & Mechanical",
    image: "assets/marin-motor-tamiri.webp",
    read_tr: "7 dk",
    read_en: "7 min",
    title_tr: "ZF ve Twin Disc Marin Şanzıman Yağ Basıncı ve Kavrama Bakımı | DM MARİN",
    title_en: "ZF & Twin Disc Marine Transmission Oil Pressure & Clutch Service | DM MARIN",
    h1_tr: "ZF ve Twin Disc Marin Şanzıman Yağ Basıncı ve Kavrama Bakımı",
    h1_en: "ZF & Twin Disc Marine Transmission Oil Pressure & Clutch Maintenance",
    desc_tr: "Marin şanzımanlarda hidrolik yağ basıncı ölçümü, disk kavramalarında kaydırma teşhisi, yağ soğutucu eşanjör temizliği ve damper plate kontrolü.",
    desc_en: "Maintaining ZF and Twin Disc marine gearboxes: hydraulic clutch pressure testing, slip prevention, oil cooler descaling, and torsional damper plate inspection.",
    keywords_tr: "zf marin şanzıman servisi, twin disc tekne şanzıman tamiri, marin şanzıman kaydırıyor, şanzıman yağı basıncı tekne",
    keywords_en: "zf marine transmission repair turkey, twin disc yacht gearbox overhaul, marine gearbox hydraulic pressure test"
  },
  {
    id: "marine-heat-exchanger-ultrasonic",
    file_tr: "blog-tekne-isi-esanjoru-aftercooler-ultrasonik-temizleme.html",
    file_en: "blog-marine-heat-exchanger-aftercooler-ultrasonic-cleaning.html",
    category_tr: "Motor & Mekanik Bakım",
    category_en: "Engine & Mechanical",
    image: "assets/dm-marin-atolye.webp",
    read_tr: "6 dk",
    read_en: "6 min",
    title_tr: "Isı Eşanjörü ve Aftercooler Ultrasonik Temizleme ve Kireç Sökme | DM MARİN",
    title_en: "Marine Heat Exchanger & Aftercooler Ultrasonic Descaling | DM MARIN",
    h1_tr: "Isı Eşanjörü ve Aftercooler Ultrasonik Temizleme ve Kireç Sökme",
    h1_en: "Marine Heat Exchanger & Aftercooler Ultrasonic Descaling Guide",
    desc_tr: "Tuzlu su kireci, midye ve çamurla tıkanan bakır-nikel boru demetlerinin (bundle) kimyasal ve ultrasonik banyolarla sıfır dirence kavuşturulması ve motor hararetinin önlenmesi.",
    desc_en: "Ultrasonic bath cleaning and acid descaling for marine cupronickel heat exchanger tube bundles, aftercoolers, and transmission oil coolers.",
    keywords_tr: "tekne eşanjör temizliği, aftercooler kireç sökme, marin ısı eşanjörü ultrasonik, tekne motor hararet önleme",
    keywords_en: "marine heat exchanger cleaning turkey, aftercooler ultrasonic wash, yacht diesel cooling bundle descaling"
  },
  {
    id: "lifepo4-bms-victron-integration",
    file_tr: "blog-victron-energy-lifepo4-lityum-aku-bms-ayarlari.html",
    file_en: "blog-victron-energy-lifepo4-lithium-bms-integration.html",
    category_tr: "Elektrik & Akü",
    category_en: "Electrical & Batteries",
    image: "assets/marin-elektrik-elektronik.webp",
    read_tr: "7 dk",
    read_en: "7 min",
    title_tr: "Victron Energy & LiFePO4 Marin Akü BMS Entegrasyon ve Şarj Ayarları | DM MARİN",
    title_en: "Victron Energy & LiFePO4 Marine Battery BMS Integration | DM MARIN",
    h1_tr: "Victron Energy & LiFePO4 Marin Akü BMS Entegrasyon ve Şarj Ayarları",
    h1_en: "Victron Energy & LiFePO4 Marine Battery BMS Integration Guide",
    desc_tr: "Victron MultiPlus inverter/charger, Cerbo GX ve SmartSolar MPPT cihazlarında LiFePO4 şarj voltajları, DVCC yönetimi ve alternatör koruma rölesi konfigürasyonu.",
    desc_en: "Configuring Victron MultiPlus, Cerbo GX, and SmartSolar MPPT with LiFePO4 batteries: absorption/float voltage presets, DVCC management, and alternator protection.",
    keywords_tr: "victron lityum akü ayarları, cerbo gx marin bms, victron multiplus tekne şarj, lifepo4 marin kurulum",
    keywords_en: "victron energy marine lithium setup, cerbo gx bms integration, victron multiplus yacht charger configuration"
  },
  {
    id: "marine-hydraulic-steering-passerelle",
    file_tr: "blog-marin-hidrolik-dumen-ve-pasarella-bakimi.html",
    file_en: "blog-marine-hydraulic-steering-passerelle-maintenance.html",
    category_tr: "Tesisat & Donanım",
    category_en: "Systems & Hardware",
    image: "assets/dm-marin-tamir-atolyesi.webp",
    read_tr: "6 dk",
    read_en: "6 min",
    title_tr: "Marin Hidrolik Dümen, Pasarella ve Yüzme Platformu Bakımı | DM MARİN",
    title_en: "Marine Hydraulic Steering, Gangway & Platform Service | DM MARIN",
    h1_tr: "Marin Hidrolik Dümen, Pasarella ve Yüzme Platformu Bakımı",
    h1_en: "Marine Hydraulic Steering, Gangway & Platform Service Guide",
    desc_tr: "Besenzoni, Opacmare ve Opac hidrolik pasarellalarda yağ kaçağı tamiri, hidrolik ünite basınç testi, dümen pistonu keçeleri ve selenoid valf temizliği.",
    desc_en: "Servicing Besenzoni and Opacmare yacht gangways, hydraulic steering pumps, swim platform cylinders, and proportional solenoid valves.",
    keywords_tr: "besenzoni pasarella tamiri, tekne hidrolik dümen arıza, opacmare servis bodrum, hidrolik platform tamiri",
    keywords_en: "besenzoni passerelle repair turkey, yacht hydraulic steering bleeding, opacmare gangway service marmaris"
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
  return files.filter(f => f.startsWith("blog-") && f.endsWith(".html") && f !== "blog-en.html").length;
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
  const diagPath = `assets/diagrams/${topic.id}-${lang}.svg`;

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

<section class="section" style="background:#fff;border-bottom:1px solid #e2e8f0;padding:48px 0">
  <div class="container">
    <div class="intro" style="margin-bottom:32px">
      <h2>${isTr ? 'Mühendislik Standartları ve Bakım Esasları' : 'Engineering Standards & Service Protocols'}</h2>
      <div>
        <p style="font-size:16px;line-height:1.8;color:#1e293b">${desc}</p>
      </div>
    </div>

    <!-- INFOGRAPHIC / DIAGRAM CARD -->
    <div style="background:#071b2b;border-radius:18px;overflow:hidden;box-shadow:0 15px 35px rgba(7,27,43,0.15);margin:32px 0">
      <div style="padding:16px 24px;background:#0b253a;border-bottom:1px solid rgba(255,255,255,0.08);display:flex;align-items:center;justify-content:space-between">
        <span style="color:#38bdf8;font-weight:800;font-size:13px;letter-spacing:0.5px">⚡ DM MARİN TEKNİK ŞEMA &amp; DİYAGRAM</span>
        <span style="color:#94a3b8;font-size:12px">0 Token Otonom Mühendislik Çizimi</span>
      </div>
      <div style="padding:20px;text-align:center">
        <img src="${diagPath}" alt="${h1} Şeması" style="max-width:100%;height:auto;border-radius:12px;border:1px solid rgba(56,189,248,0.2)" loading="lazy">
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

function buildIndexPage(lang = "tr") {
  const isTr = lang === "tr";
  const indexFileName = isTr ? "blog.html" : "blog-en.html";
  const altFileName = isTr ? "blog-en.html" : "blog.html";
  const title = isTr ? "Marin Blog & Teknik Rehberler | DM MARİN Yat Servisi" : "Marine Blog & Yacht Engineering Guides | DM MARIN";
  const desc = isTr ? "Tekne sahipleri ve kaptanlar için kapsamlı marin rehberler: Volvo Penta, MAN, MTU, Yanmar motor bakımı, Onan/Kohler jeneratör arızaları, lityum akü ve kışlama kılavuzları." : "Expert marine guides for yacht owners and captains: Volvo Penta, MAN, MTU, Yanmar engine maintenance, Onan/Kohler generator service, and lithium conversion.";
  const h1 = isTr ? "Marin Blog & Teknik Rehberler" : "Marine Blog & Engineering Guides";
  const eyebrow = isTr ? "Bilgi Merkezi · Mühendislik Blogu" : "Knowledge Base · Marine Engineering";
  const subHead = isTr ? "Tekne sahipleri, kaptanlar ve denizciler için motor bakımı, jeneratör arızaları, elektrik sistemleri ve marin kışlama kılavuzları." : "Authoritative technical guides for marine engines, generators, lithium battery systems, and winter lay-up.";

  const cardsHtml = TOPIC_CATALOG.map(t => {
    const file = isTr ? t.file_tr : t.file_en;
    const itemTitle = isTr ? t.h1_tr : t.h1_en;
    const itemDesc = isTr ? t.desc_tr : t.desc_en;
    const cat = isTr ? t.category_tr : t.category_en;
    const read = isTr ? t.read_tr : t.read_en;
    const readText = isTr ? "Rehberi Oku →" : "Read Guide →";

    return `
<article class="blog-card" data-category="${cat}">
  <div class="blog-card-img">
    <img src="${t.image}" alt="${itemTitle}" loading="lazy">
    <span class="blog-badge">${cat}</span>
  </div>
  <div class="blog-card-body">
    <div class="blog-meta">
      <span>⏱ ${read} ${isTr ? 'okuma' : 'read'}</span>
      <span>•</span>
      <span>${isTr ? 'Mühendislik Rehberi' : 'Certified Guide'}</span>
    </div>
    <h3><a href="${file}">${itemTitle}</a></h3>
    <p>${itemDesc}</p>
    <a class="blog-read-link" href="${file}">${readText}</a>
  </div>
</article>`;
  }).join("\n");

  const totalCount = TOPIC_CATALOG.length;
  const countText = isTr ? `Tüm Teknik Makaleler (${totalCount} Rehber)` : `All Marine Guides (${totalCount} Articles)`;

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
<link rel="canonical" href="https://dmmarin.com/${indexFileName}">
<link rel="alternate" hreflang="tr" href="https://dmmarin.com/blog.html">
<link rel="alternate" hreflang="en" href="https://dmmarin.com/blog-en.html">
<meta name="robots" content="index,follow,max-image-preview:large">
<meta name="theme-color" content="#071b2b">
<link rel="stylesheet" href="service-page.css">
<link rel="stylesheet" href="brand-page.css">
<link rel="icon" href="favicon.ico" sizes="any">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<link rel="manifest" href="site.webmanifest">
<meta property="og:type" content="website">
<meta property="og:locale" content="${isTr ? 'tr_TR' : 'en_US'}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="https://dmmarin.com/${indexFileName}">
<meta property="og:image" content="https://dmmarin.com/assets/dm-marin-logo-v2.webp">
<style>
.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
  margin-top: 30px;
}
.blog-card {
  background: #fff;
  border: 1px solid #dce7ea;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(3,22,35,0.04);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.blog-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(3,22,35,0.1);
}
.blog-card-img {
  position: relative;
  height: 200px;
  background: #071b2b;
  overflow: hidden;
}
.blog-card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}
.blog-card:hover .blog-card-img img {
  transform: scale(1.04);
}
.blog-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(7,27,43,0.85);
  color: #19c7df;
  backdrop-filter: blur(8px);
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 11.5px;
  font-weight: 800;
  border: 1px solid rgba(25,199,223,0.3);
}
.blog-card-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.blog-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #64748b;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 8px;
}
.blog-card h3 {
  margin: 0 0 10px;
  font-size: 17px;
  line-height: 1.4;
  font-weight: 800;
  color: #071b2b;
}
.blog-card h3 a {
  color: inherit;
  text-decoration: none;
}
.blog-card h3 a:hover {
  color: #087f93;
}
.blog-card p {
  margin: 0 0 16px;
  color: #475569;
  font-size: 13.5px;
  line-height: 1.6;
  flex: 1;
}
.blog-read-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #087f93;
  font-weight: 800;
  font-size: 13px;
  text-decoration: none;
  margin-top: auto;
}
.blog-read-link:hover {
  text-decoration: underline;
}
.filter-tabs {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  margin-top: 16px;
}
.filter-btn {
  background: #fff;
  border: 1px solid #cbd5e1;
  color: #334155;
  padding: 8px 16px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease;
}
.filter-btn.active, .filter-btn:hover {
  background: #071b2b;
  color: #fff;
  border-color: #071b2b;
}
.search-box {
  padding: 10px 16px;
  border-radius: 999px;
  border: 1px solid #cbd5e1;
  font-size: 13.5px;
  min-width: 260px;
  outline: none;
  transition: border-color 0.2s;
}
.search-box:focus {
  border-color: #087f93;
  box-shadow: 0 0 0 3px rgba(8,127,147,0.15);
}
</style>
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
      <a href="index.html#hizmetler">${isTr ? 'Hizmetler' : 'Services'}</a>
      <a href="index.html#markalar">${isTr ? 'Markalar' : 'Brands'}</a>
      <a href="${indexFileName}" style="color:#087f93;font-weight:700">${isTr ? 'Blog & Rehberler' : 'Blog & Guides'}</a>
      <div class="lang-switch" style="display:flex;gap:4px">
        <a href="blog.html" class="lang-btn ${isTr ? 'active' : ''}" style="text-decoration:none;padding:3px 8px;border-radius:4px;border:1px solid #cbd5e1;font-size:11px;font-weight:700;background:${isTr ? '#071b2b' : '#fff'};color:${isTr ? '#fff' : '#071b2b'}">TR</a>
        <a href="blog-en.html" class="lang-btn ${!isTr ? 'active' : ''}" style="text-decoration:none;padding:3px 8px;border-radius:4px;border:1px solid #cbd5e1;font-size:11px;font-weight:700;background:${!isTr ? '#071b2b' : '#fff'};color:${!isTr ? '#fff' : '#071b2b'}">EN</a>
      </div>
      <a class="cta" href="index.html#randevu">${isTr ? 'Servis Talebi' : 'Request Service'}</a>
    </nav>
  </div>
</header>
<main>
<section class="hero" style="min-height:360px">
  <img src="assets/motor-mekanik-bakim.webp" alt="DM MARİN Teknik Blog" width="1672" height="941" fetchpriority="high">
  <div class="container hero-copy">
    <span class="eyebrow">${eyebrow}</span>
    <h1>${h1}</h1>
    <p>${subHead}</p>
  </div>
</section>

<section class="section" style="background:var(--paper);padding:40px 0 80px">
  <div class="container">
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px">
      <h2 style="margin:0;font-size:24px" id="blog-total-count-header">${countText}</h2>
      <input type="text" class="search-box" id="blog-search-input" placeholder="${isTr ? '🔍 Makalelerde veya konularda ara...' : '🔍 Search technical guides...'}" onkeyup="filterBlogSearch(this.value)">
    </div>

    <div class="filter-tabs">
      <button class="filter-btn active" onclick="filterBlogCategory('all', this)">${isTr ? 'Tümü' : 'All'}</button>
      <button class="filter-btn" onclick="filterBlogCategory('Motor & Mekanik Bakım', this)">${isTr ? 'Motor & Mekanik' : 'Engine & Mechanical'}</button>
      <button class="filter-btn" onclick="filterBlogCategory('Jeneratör & Enerji', this)">${isTr ? 'Jeneratör' : 'Generators'}</button>
      <button class="filter-btn" onclick="filterBlogCategory('Elektrik & Akü', this)">${isTr ? 'Elektrik & Akü' : 'Electrical & Batteries'}</button>
      <button class="filter-btn" onclick="filterBlogCategory('Tesisat & Donanım', this)">${isTr ? 'Tesisat & Donanım' : 'Systems & Hardware'}</button>
      <button class="filter-btn" onclick="filterBlogCategory('Kışlama & Koruma', this)">${isTr ? 'Kışlama & Koruma' : 'Winterizing & Protection'}</button>
      <button class="filter-btn" onclick="filterBlogCategory('Arıza & Teşhis', this)">${isTr ? 'Arıza Teşhisi' : 'Diagnostics'}</button>
    </div>

    <div class="blog-grid" id="blog-grid-container">
      ${cardsHtml}
    </div>
  </div>
</section>
</main>
<footer class="footer">
  <div class="container footer-in">
    <span>© 2026 DM MARİN</span>
    <span>${isTr ? 'Bağımsız çok markalı özel marin teknik servis. Tüm Türkiye geneli mobil destek.' : 'Independent multi-brand marine engineering. Fast mobile dispatch across Turkish waters.'}</span>
  </div>
</footer>
<div class="mobile-bar">
  <a class="mobile-call" href="tel:+905437240992">☎ ${isTr ? 'Hemen Ara' : 'Call Now'}</a>
  <a class="mobile-wa" href="https://wa.me/905437240992" target="_blank" rel="noopener">WhatsApp</a>
</div>

<script>
let currentCategory = 'all';
let searchQuery = '';

function filterBlogCategory(cat, btn) {
  currentCategory = cat;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  applyFilters();
}

function filterBlogSearch(query) {
  searchQuery = (query || '').toLowerCase().trim();
  applyFilters();
}

function applyFilters() {
  const cards = document.querySelectorAll('.blog-card');
  let visibleCount = 0;
  cards.forEach(card => {
    const cardCat = card.dataset.category || '';
    const text = card.textContent.toLowerCase();
    
    const matchesCat = (currentCategory === 'all' || cardCat.includes(currentCategory));
    const matchesSearch = (!searchQuery || text.includes(searchQuery));
    
    if (matchesCat && matchesSearch) {
      card.style.display = 'flex';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  const headerEl = document.getElementById('blog-total-count-header');
  if (headerEl) {
    const isTurkish = document.documentElement.lang === 'tr';
    headerEl.textContent = isTurkish ? ('Teknik Makaleler (' + visibleCount + ' Rehber Gösteriliyor)') : ('Marine Guides (' + visibleCount + ' Articles Showing)');
  }
}
</script>
</body>
</html>
`;
}

function runAgentCycle() {
  console.log("=".repeat(70));
  console.log("🤖 SCRIBE-SEO: OTONOM MARİN BLOG VE İÇERİK AJANI BAŞLATILDI");
  console.log("🔒 Güvenlik & Disk Sınırı: Maksimum " + MAX_BLOG_LIMIT + " Makale Limiti");
  console.log("=".repeat(70));

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

  // Generate / update blog.html and blog-en.html
  fs.writeFileSync(path.join(ROOT_DIR, "blog.html"), buildIndexPage("tr"), "utf-8");
  fs.writeFileSync(path.join(ROOT_DIR, "blog-en.html"), buildIndexPage("en"), "utf-8");
  console.log("✓ blog.html ve blog-en.html portal sayfaları tüm makalelerle güncellendi.");

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

  const finalCount = getExistingBlogCount();
  console.log(`🎯 Ajan Döngüsü Tamamlandı: ${createdCount} yeni makale üretildi. Toplam Blog: ${finalCount} / ${MAX_BLOG_LIMIT}. Toplam İndeksli Sayfa: ${allHtml.length}`);
  console.log("=".repeat(70));
}

if (require.main === module) {
  runAgentCycle();
}

module.exports = { runAgentCycle, MAX_BLOG_LIMIT, getExistingBlogCount, TOPIC_CATALOG };
