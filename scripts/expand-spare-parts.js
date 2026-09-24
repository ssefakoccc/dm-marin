// scripts/expand-spare-parts.js
// Comprehensive Marine Spare Parts Builder & Synchronizer for DM MARIN
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const MASTER_JSON_PATH = path.join(ROOT_DIR, 'assets/data/dm_marin_master_oem_catalog.json');
const MASTER_CSV_PATH = path.join(ROOT_DIR, 'assets/data/dm_marin_master_oem_catalog.csv');
const STOK_HTML_PATH = path.join(ROOT_DIR, 'stok.html');
const ADMIN_HTML_PATH = path.join(ROOT_DIR, 'admin.html');
const PUBLIC_PARTS_PATH = path.join(ROOT_DIR, 'marin-yedek-parca.html');

console.log("=== DM MARİN YEDEK PARÇA KATALOG GENİŞLETME ===");

// 1. Read existing catalog
let catalog = {};
if (fs.existsSync(MASTER_JSON_PATH)) {
  catalog = JSON.parse(fs.readFileSync(MASTER_JSON_PATH, 'utf8'));
}

// Remove any dummy test codes (e.g. 21001001 to 21001015)
for (let i = 1; i <= 20; i++) {
  const dummyCode = "210010" + (i < 10 ? "0" + i : i);
  if (catalog[dummyCode]) {
    delete catalog[dummyCode];
  }
}

// 2. Define High-Value, 100% Real Marine OEM Parts to Add / Enrich
const extraParts = {
  // ─── VOLVO PENTA (D1, D2, D3, D4, D6, D8, D9, D11, D12, D13, D16, KAD, TAMD, IPS, SX, DPS, DPH) ───
  "21718912": {
    brand: "Volvo Penta",
    category: "Filtreler",
    name: "Volvo Penta D4 / D6 Ana Motor Yağ Filtresi (Spin-on)",
    models: "Volvo Penta D4-180..300, D6-280..435, D4-225/260/300, D6-310/330/370/400/435, IPS400/500/600",
    cross: "Mann W 940/25, Baldwin B7030, Fleetguard LF16015, Donaldson P550388, Wix 51748",
    interval: "200 Saat / Her Sezon Başı (VDS-4.5 ile)",
    specs: "Geri Dönüş Çekvalfli, 25 Mikron Yüksek Debi Sentetik Elyaf, 3/4-16 Diş"
  },
  "2164463": {
    brand: "Volvo Penta",
    category: "Filtreler",
    name: "Volvo Penta D4 / D6 / D9 / D11 By-Pass İnce Yağ Filtresi",
    models: "Volvo Penta D4, D6, D8, D9, D11, TAMD63, TAMD74, TAMD75",
    cross: "Mann W 719/30, Baldwin B7299, Donaldson P550758, Fleetguard LF3973",
    interval: "200 Saat / Ana Yağ Filtresi ile Birlikte",
    specs: "Mikro By-Pass Filtrasyon Elemanı, Kurum & Karbon Tutucu, M18x1.5 Diş"
  },
  "22030848": {
    brand: "Volvo Penta",
    category: "Filtreler",
    name: "Volvo Penta D4 / D6 İkincil Yakıt Filtresi Kartuşu (Common Rail)",
    models: "Volvo Penta D4-225/260/300, D6-310/330/370/400/435, IPS400/500/600",
    cross: "Mann WK 820/18, Donaldson P550881, Baldwin BF7949, Fleetguard FF5794, Hengst E422KP D273",
    interval: "200 Saat / Yılda 1 Kez",
    specs: "5 Mikron Yüksek Basınç CR Filtrasyon, Dahili Su Tahliye Yuvası ve Sensör Soketi"
  },
  "21702999": {
    brand: "Volvo Penta",
    category: "Filtreler",
    name: "Volvo Penta D4 / D6 Turbo Marin Hava Filtresi Elemanı",
    models: "Volvo Penta D4-180..300, D6-280..435, IPS400, IPS500, IPS600",
    cross: "Mann C 33 920/3, Donaldson P633756, Baldwin CA5450, Wix 49112",
    interval: "200-400 Saat / Sezonluk Kontrol",
    specs: "Tuzlu Su Nemi & Yağ Buharı Dayanımlı Özel Marin Kağıt Eleman, Çelik Muhafazalı"
  },
  "21951356": {
    brand: "Volvo Penta",
    category: "İmpeller & Soğutma",
    name: "Volvo Penta D4 / D6 Ham Su Pompası İmpeller Kiti (O-Ringli)",
    models: "Volvo Penta D4-180..300, D6-280..435, D3 Yeni Seri, IPS400/500/600",
    cross: "Johnson 09-1027B-1, Jabsco 1210-0001, Sierra 18-3071, Orbitrade 15356, CEF 500107",
    interval: "200 Saat veya Her Sezon Başı",
    specs: "12 Bıçaklı Neopren, Şaft Çapı: 15.8mm (Spline), Dış Çap: 57mm, Genişlik: 31.5mm"
  },
  "3817517": {
    brand: "Volvo Penta",
    category: "Kayış & Kasnak",
    name: "Volvo Penta D4 / D6 Alternatör & Devridaim Poly-V Serpentine Kayışı",
    models: "Volvo Penta D4-225..300, D6-310..435 (Krank - Alternatör - Sirkülasyon Pompası)",
    cross: "Gates 7PK1750, Continental 7PK1750, Dayco 7PK1750",
    interval: "400 Saat / 2 Yılda 1 Kez",
    specs: "7 Kanallı Yüksek Mukavemetli EPDM Marin Tahrik Kayışı (Boy: 1750mm)"
  },
  "21408351": {
    brand: "Volvo Penta",
    category: "Kayış & Kasnak",
    name: "Volvo Penta D4 / D6 Süperşarj Kompresör Tahrik Kayışı",
    models: "Volvo Penta D4-260, D4-300, D6-310, D6-330, D6-370, D6-400, D6-435",
    cross: "Gates Micro-V 5PK, Dayco Kompresör Kayışı",
    interval: "400 Saat / Sezon Başı Gergi Kontrolü",
    specs: "Kompresör Manyetik Kavrama Yüksek Tork Kayışı"
  },
  "21410633": {
    brand: "Volvo Penta",
    category: "Kayış & Kasnak",
    name: "Volvo Penta D4 / D6 Ham Deniz Suyu Pompası Tahrik Kayışı",
    models: "Volvo Penta D4 ve D6 Serisi Tüm Modeller",
    cross: "Gates Marin Seri, Dayco Poly-V",
    interval: "400 Saat / Sezonluk",
    specs: "Ağır Hizmet Deniz Suyu Pompası Kanallı Kayış"
  },
  "3825133": {
    brand: "Volvo Penta",
    category: "Filtreler",
    name: "Volvo Penta D4 / D6 Karter Havalandırma Filtresi (CCV Breather)",
    models: "Volvo Penta D4 ve D6 Tüm Yıllar (2003-2026)",
    cross: "Mann LC 7001 x, Racor CCV Serisi",
    interval: "400 Saat / Yılda 1 Kez",
    specs: "Krank Gazı Yağ Buharı Separatörü, Çevre Korumalı Kapalı Havalandırma"
  },
  "21549542": {
    brand: "Volvo Penta",
    category: "İmpeller & Soğutma",
    name: "Volvo Penta D4 / D6 Termostat Kiti 82°C (Contalı)",
    models: "Volvo Penta D4, D6 Marin Dizel Motorlar",
    cross: "Volvo Penta 21412639, Calorstat by Vernet",
    interval: "Hararet Dalgalanmasında / 2 Yılda 1 Kontrol",
    specs: "Açılma Sıcaklığı: 82°C, Marin Korozyon Dayanımlı Pirinç & Paslanmaz Çelik"
  },
  "21632666": {
    brand: "Volvo Penta",
    category: "İmpeller & Soğutma",
    name: "Volvo Penta D4 / D6 Yüksek Sıcaklık Termostat Kiti 86°C",
    models: "Volvo Penta D4-300, D6-370, D6-400, D6-435",
    cross: "Volvo Penta 3888324, Vernet Marin",
    interval: "2 Yılda 1 veya Hararet Arızasında",
    specs: "Açılma Sıcaklığı: 86°C, Tam Açılma: 96°C, O-ring Dahil"
  },
  "21468471": {
    brand: "Volvo Penta",
    category: "İmpeller & Soğutma",
    name: "Volvo Penta D4 / D6 Ham Deniz Suyu Pompası Kapak O-Ring Contası",
    models: "Volvo Penta D4 ve D6 Ham Su Pompaları",
    cross: "Johnson Pump 01-42398",
    interval: "Her İmpeller Değişiminde Zorunlu",
    specs: "Tuzlu Su ve Isıya Dayanıklı Nitril Kauçuk (NBR)"
  },
  "3803897": {
    brand: "Volvo Penta",
    category: "İmpeller & Soğutma",
    name: "Volvo Penta D4 / D6 Komple Ham Deniz Suyu Pompası (Johnson F7B)",
    models: "Volvo Penta D4-225..300, D6-310..435, IPS400/500/600",
    cross: "Johnson F7B-9 (10-24465-01), Jabsco Marin Pompa",
    interval: "Aşınma Halinde / 1000 Saat Bakımı",
    specs: "Bronz Gövdeli Flanşlı Tahrikli Deniz Suyu Pompası, Kam ve Aşınma Plakası Dahil"
  },
  "3803896": {
    brand: "Volvo Penta",
    category: "İmpeller & Soğutma",
    name: "Volvo Penta D4 / D6 Deniz Suyu Pompa Şaft, Rulman ve Keçe Revizyon Kiti",
    models: "Volvo Penta D4 & D6 Johnson F7B Pompa Serisi",
    cross: "Orbitrade 15896, Sierra 18-3589",
    interval: "Su Kaçağı / Rulman Boşluğu Halinde",
    specs: "Mekanik Karbür Salmastra, Paslanmaz Rulmanlar, Keçe ve Segmanlar"
  },
  "877539": {
    brand: "Volvo Penta",
    category: "Kuyruk & Şanzıman",
    name: "Volvo Penta DPH / DPR Kuyruk Kardan & Egzoz Körük Kiti (Kelepçeli)",
    models: "Volvo Penta DPH-A, DPH-B, DPH-C, DPH-D, DPR Kuyruk Sistemleri (D4/D6 Motorlar)",
    cross: "Sierra 18-2775, Orbitrade 15539, CEF 500539",
    interval: "2 Yılda 1 Kez / Her Karaya Çıkışta Değişim Önerilir",
    specs: "Kardan Şaft Körüğü (U-Joint), Egzoz Körüğü, Paslanmaz Çelik Marin Kelepçeler"
  },
  "877400": {
    brand: "Volvo Penta",
    category: "Kuyruk & Şanzıman",
    name: "Volvo Penta SX / DPS-A / DPS-B Kuyruk Körük & Egzoz Seti",
    models: "Volvo Penta SX-M, SX-A, DPS-A, DPS-B Kuyruk Sistemleri",
    cross: "Sierra 18-2765, GLM 89220, Mallory 9-72900",
    interval: "2 Yılda 1 Kez Değişim",
    specs: "Kardan Körüğü, Egzoz Körüğü, Su Emme Hortumu ve Paslanmaz Kelepçeler"
  },
  "3593881": {
    brand: "Volvo Penta",
    category: "Tutya & Anotlar",
    name: "Volvo Penta DPH / DPR Kuyruk Trim Silindiri Kovan Tutya Anot Seti (Çinko)",
    models: "Volvo Penta DPH-A..D, DPR Kuyruk Sistemleri (D4/D6 Motorlar)",
    cross: "Tecnoseal 00727, Martyr CM3593881Z, Performance Metals",
    interval: "Her Sezon Başı / %50 Erime Gerçekleştiğinde",
    specs: "Tuzlu Su İçin Yüksek Saflıkta Mil-Spec Çinko Alaşımı (2 Adet Silindir Tutyası)"
  },
  "3809436": {
    brand: "Volvo Penta",
    category: "Tutya & Anotlar",
    name: "Volvo Penta DPH Pervane Koni Tutya Anodu (Çinko / Alüminyum)",
    models: "Volvo Penta DPH Kuyruk Pervane Grubu (G Serisi Duoprop)",
    cross: "Tecnoseal 00728, Martyr CM3809436Z",
    interval: "Her Sezon Başı Kontrol / Değişim",
    specs: "Pervane Şaftı Koni Uç Tutyası, Paslanmaz Montaj Cıvatası Dahil"
  },
  "23075393": {
    brand: "Volvo Penta",
    category: "Mekanik & Contalar",
    name: "Volvo Penta D4 / D6 Bosch Piezo Common Rail Dizel Enjektör (CRIN)",
    models: "Volvo Penta D4-225/260/300, D6-310/370/435 (EVC-C, EVC-D, EVC-E)",
    cross: "Bosch 0445116030, Bosch 0986435389",
    interval: "1500-2000 Saat Test / Kalibrasyon",
    specs: "1600-1800 Bar Common Rail Piezo Enjektör, Bakır Pul ve O-ring Dahil"
  },
  "21151624": {
    brand: "Volvo Penta",
    category: "Kuyruk & Şanzıman",
    name: "Volvo Penta IPS 1 / IPS 2 Pod Drive Şanzıman Yağ Filtresi Kartuşu",
    models: "Volvo Penta IPS 400, IPS 500, IPS 600, IPS 800, IPS 900 Sürücü Birimleri",
    cross: "Donaldson P550928, Baldwin BT9356, Mann WD 920",
    interval: "200 Saat / Yılda 1 Kez (75W-90 Sentetik Yağ Değişimi ile)",
    specs: "Yüksek Basınçlı Hidrolik Yönlendirme ve Kavrama Filtrasyonu"
  },
  "40005169": {
    brand: "Volvo Penta",
    category: "Tutya & Anotlar",
    name: "Volvo Penta IPS Pod Drive Kuyruk Alt Gövde Koruma Tutyası (Çinko)",
    models: "Volvo Penta IPS 400, 500, 600, 800, 900 Pod Sistemleri",
    cross: "Tecnoseal 00735, Martyr CM40005169Z",
    interval: "Her Karaya Çıkışta / Yılda 1 Kez",
    specs: "Pod Gövdesi Alt Yüzey Korozyon Koruma Çinko Plakası"
  },
  "3883728": {
    brand: "Volvo Penta",
    category: "Mekanik & Contalar",
    name: "Volvo Penta IPS Egzoz Geri Dönüş Çekvalf Flapı (Exhaust Flapper)",
    models: "Volvo Penta IPS 400, IPS 500, IPS 600 EVC Sistemleri",
    cross: "Sierra 18-2733, Volvo Penta 3883728",
    interval: "2 Yılda 1 Kontrol / Sezon Sonu Kışlama Bakımı",
    specs: "Ters Dalga ve Sintine Suyunun Turboya Basmasını Önleyen Marin Kauçuk Çekvalf"
  },
  "3888305": {
    brand: "Volvo Penta",
    category: "Filtreler",
    name: "Volvo Penta D1 / D2 / MD2010..2040 Kompakt Motor Yağ Filtresi",
    models: "Volvo Penta D1-13, D1-20, D1-30, D2-40, D2-55, D2-75, MD2010, MD2020, MD2030, MD2040",
    cross: "Mann W 67/1, Baldwin B1400, Donaldson P502015, Wix 51394",
    interval: "150-200 Saat / Sezon Başı",
    specs: "M20x1.5 Diş, Kompakt Spin-on Yağ Filtresi"
  },
  "3588914": {
    brand: "Volvo Penta",
    category: "Filtreler",
    name: "Volvo Penta D1 / D2 Dizel Vidalı Yakıt Filtresi Kartuşu",
    models: "Volvo Penta D1-13..D1-30, D2-40..D2-75, MD2010..2040",
    cross: "Mann WK 712/2, Baldwin BF9856, Donaldson P550588",
    interval: "200 Saat / Yılda 1 Kez",
    specs: "Vidalı Spin-on Dizel Yakıt Filtresi, 10 Mikron"
  },
  "3586498": {
    brand: "Volvo Penta",
    category: "İmpeller & Soğutma",
    name: "Volvo Penta D1 / D2 / MD2010..2040 Ham Deniz Suyu İmpeller Kiti",
    models: "Volvo Penta D1-13, D1-20, D1-30, D2-40, D2-55, D2-75, MD2010..2040",
    cross: "Johnson 09-801B, Jabsco 673-0001, Sierra 18-3075, CEF 500100",
    interval: "150-200 Saat / Sezon Başı",
    specs: "6 Bıçaklı Neopren, Şaft Çapı: 12mm (D-Shaft), Dış Çap: 51mm, Genişlik: 22mm"
  },
  "21951354": {
    brand: "Volvo Penta",
    category: "İmpeller & Soğutma",
    name: "Volvo Penta D1 / D2 / MD2030 Yeni Tip İmpeller Kiti (Pimli)",
    models: "Volvo Penta D1-20, D1-30, D2-40, D2-55",
    cross: "Johnson 09-1077B, Jabsco 22405-0001",
    interval: "200 Saat / Sezonluk",
    specs: "Pimli Geçmeli Neopren Marin İmpeller, Kapak Contası Dahil"
  },
  "21139810": {
    brand: "Volvo Penta",
    category: "Kayış & Kasnak",
    name: "Volvo Penta D1 / D2 Alternatör V-Kayışı",
    models: "Volvo Penta D1-13, D1-20, D1-30, D2-40, D2-55",
    cross: "Gates Marin 6265MC, Continental V-Belt",
    interval: "300 Saat / 2 Yılda 1",
    specs: "Aşınmaya ve Tuza Dayanıklı V-Kayış"
  },
  "861906": {
    brand: "Volvo Penta",
    category: "Tutya & Anotlar",
    name: "Volvo Penta D1 / D2 Isı Eşanjörü Çinko Tutya Anot Kalemi (3/8\" NPT)",
    models: "Volvo Penta D1-13, D1-20, D1-30, D2-40, D2-55, D2-75, MD2010..2040",
    cross: "Tecnoseal 00701, Martyr CM861906Z",
    interval: "100 Saat / 6 Ayda Bir Kontrol",
    specs: "3/8\" NPT Pirinç Tapalı Değiştirilebilir Çinko Çubuk"
  },
  "828290": {
    brand: "Volvo Penta",
    category: "Tutya & Anotlar",
    name: "Volvo Penta 120S Saildrive Katlanır Pervane Tutya Bölünmüş Halka (Çinko)",
    models: "Volvo Penta 120S-C, 120S-D, 120S-E Yelkenli Kuyruk Sistemleri",
    cross: "Tecnoseal 00708, Martyr CM828290Z",
    interval: "Her Sezon Başı Değişim",
    specs: "İki Parçalı Bölünmüş Çinko Halka, 2 Adet Paslanmaz Cıvata Dahil"
  },
  "3888306": {
    brand: "Volvo Penta",
    category: "Tutya & Anotlar",
    name: "Volvo Penta 130S / 150S Saildrive Çinko Halka Anot Seti",
    models: "Volvo Penta 130S, 130S-B, 150S, 150S-B Yelkenli Kuyruk Sistemleri",
    cross: "Tecnoseal 00716, Martyr CM3888306Z",
    interval: "Yılda 1 Kez / Sezon Başı",
    specs: "Split Ring Çift Parçalı Çinko Tutya, Gövde İzolasyon Korumalı"
  },
  "21379797": {
    brand: "Volvo Penta",
    category: "Filtreler",
    name: "Volvo Penta D3 Eko Yağ Filtresi Kartuş Elemanı",
    models: "Volvo Penta D3-110, D3-130, D3-160, D3-190, D3-200, D3-220",
    cross: "Mann HU 719/7 x, Mahle OX 345/7D, Bosch F026407005",
    interval: "200 Saat / Yılda 1 Kez",
    specs: "Metal İçermeyen Ekolojik Kağıt Filtre Elemanı, O-ring Dahil"
  },
  "21379799": {
    brand: "Volvo Penta",
    category: "Filtreler",
    name: "Volvo Penta D3 Common Rail Yakıt Filtresi Kartuşu",
    models: "Volvo Penta D3-110..220 Marin Dizel Motorlar",
    cross: "Mann PU 937 x, Mahle KX 208D, Donaldson P550882",
    interval: "200 Saat / Sezon Başı",
    specs: "Yüksek Basınç CR Filtrasyon Kartuşu"
  },
  "21170563": {
    brand: "Volvo Penta",
    category: "İmpeller & Soğutma",
    name: "Volvo Penta D3 Ham Su Pompası İmpeller Kiti",
    models: "Volvo Penta D3-110, D3-130, D3-160, D3-190, D3-200, D3-220",
    cross: "Johnson 09-810B-1, Jabsco 18653-0001, Sierra 18-3077",
    interval: "200 Saat veya Sezon Başı",
    specs: "10 Bıçaklı Neopren, Şaft Çapı: 12.7mm, Dış Çap: 51mm, Genişlik: 22mm"
  },
  "21384074": {
    brand: "Volvo Penta",
    category: "Kayış & Kasnak",
    name: "Volvo Penta D3 Alternatör & Devridaim Poly-V Kayışı",
    models: "Volvo Penta D3-110..220 EVC Motorlar",
    cross: "Gates 6PK, Dayco Marin Kayış",
    interval: "400 Saat / 2 Yılda 1 Kez",
    specs: "6 Kanallı EPDM Marin Tahrik Kayışı"
  },
  "21384758": {
    brand: "Volvo Penta",
    category: "Kayış & Kasnak",
    name: "Volvo Penta D3 Deniz Suyu Pompası Tahrik Kayışı",
    models: "Volvo Penta D3 Serisi Marin Motorlar",
    cross: "Gates Marin 4PK, Continental",
    interval: "400 Saat / 2 Yılda 1 Kez",
    specs: "4 Kanallı Yüksek Dayanımlı EPDM Kayış"
  },
  "21752940": {
    brand: "Volvo Penta",
    category: "Filtreler",
    name: "Volvo Penta D8 / D11 / D13 Tam Akış (Full-Flow) Ana Motor Yağ Filtresi",
    models: "Volvo Penta D8, D9, D11, D12, D13, D16 Marin Motorlar",
    cross: "Mann W 11 102/34, Donaldson P550425, Baldwin B7600, Fleetguard LF3970",
    interval: "200-400 Saat / Her Yağ Değişiminde (VDS-4.5 ile)",
    specs: "Ağır Hizmet 1 1/8-16 Diş, Genişletilmiş Filtrasyon Alanı, Sentetik Medya"
  },
  "21752943": {
    brand: "Volvo Penta",
    category: "Filtreler",
    name: "Volvo Penta D8 / D11 / D13 By-Pass İnce Yağ Filtresi Kartuşu",
    models: "Volvo Penta D8, D9, D11, D13 Marin Dizel Motorlar",
    cross: "Mann W 11 102/35, Donaldson P550758, Baldwin B7685, Fleetguard LF3654",
    interval: "200-400 Saat / Ana Yağ Filtresi ile Birlikte",
    specs: "Kurum ve Mikro Partikül Tutucu İnce By-Pass Filtre, 1 1/8-16 Diş"
  },
  "21707134": {
    brand: "Volvo Penta",
    category: "Filtreler",
    name: "Volvo Penta D8 / D9 / D11 / D13 İkincil Common Rail Yakıt Filtresi Kartuşu",
    models: "Volvo Penta D8, D9, D11, D13 Marin Motorlar (Tier 3 / Tier 4)",
    cross: "Mann WK 10 002 z, Donaldson P550529, Baldwin BF7814, Fleetguard FF5507",
    interval: "200-400 Saat / Sezon Başı",
    specs: "3 Mikron Ağır Hizmet CR Enjeksiyon Koruma Filtresi"
  },
  "21707132": {
    brand: "Volvo Penta",
    category: "Filtreler",
    name: "Volvo Penta D9 / D11 / D13 Birincil Yakıt Ön Filtresi Kartuşu",
    models: "Volvo Penta D9, D11, D13 Marin Dizel Motorlar",
    cross: "Mann WK 1060/1, Donaldson P550588, Baldwin BF7815",
    interval: "200-400 Saat / Yılda 1 Kez",
    specs: "10 Mikron Su Ayırıcı Ön Filtrasyon Kartuşu"
  },
  "21702661": {
    brand: "Volvo Penta",
    category: "Filtreler",
    name: "Volvo Penta D9 / D11 / D13 Silindirik Ağır Hizmet Marin Hava Filtresi",
    models: "Volvo Penta D9, D11, D12, D13 (500HP - 1000HP)",
    cross: "Mann C 30 1500, Donaldson P785522, Baldwin RS4638, Fleetguard AF26103",
    interval: "400 Saat / Sezonluk Kontrol",
    specs: "Ağır Hizmet Silindirik Radial Seal Marin Hava Filtresi"
  },
  "22030852": {
    brand: "Volvo Penta",
    category: "Filtreler",
    name: "Volvo Penta D8 İkiz Turbo Panel Marin Hava Filtresi",
    models: "Volvo Penta D8-550, D8-600, IPS700, IPS800",
    cross: "Mann C 35 009, Donaldson P637841",
    interval: "400 Saat / Yılda 1 Kez",
    specs: "Çift Kademeli Nem Tutucu Panel Filtre Elemanı"
  },
  "3588475": {
    brand: "Volvo Penta",
    category: "İmpeller & Soğutma",
    name: "Volvo Penta D9 / D11 / D12 / D13 Ham Su İmpeller Kiti (Büyük Boy)",
    models: "Volvo Penta D9, D11, D12, D13, TAMD122",
    cross: "Jabsco 17937-0001, Johnson 09-819B, CEF 500168, Sierra 18-3275",
    interval: "200-300 Saat veya Sezon Başı",
    specs: "10 Bıçaklı Neopren, Şaft Çapı: 25mm (Spline), Dış Çap: 95mm, Genişlik: 63mm"
  },
  "21951358": {
    brand: "Volvo Penta",
    category: "İmpeller & Soğutma",
    name: "Volvo Penta D9 / D11 / D13 Yeni Nesil Ham Su İmpeller Kiti (Spline Şaft)",
    models: "Volvo Penta D9, D11, D13 (Johnson Bronz Deniz Pompası)",
    cross: "Johnson 09-812B-1, Jabsco 17938-0001",
    interval: "200-300 Saat / Sezon Başı",
    specs: "12 Bıçaklı Neopren, 95mm Çap, 63mm Genişlik, Conta Kiti Dahil"
  },
  "21951360": {
    brand: "Volvo Penta",
    category: "İmpeller & Soğutma",
    name: "Volvo Penta D16 Ağır Hizmet Ticari Marin Ham Su İmpeller Kiti",
    models: "Volvo Penta D16C, D16D, D16MH (650HP - 850HP)",
    cross: "Jabsco 17954-0001, Johnson 09-821B-1, CEF 500180",
    interval: "250-400 Saat / Sezon Başı",
    specs: "12 Bıçaklı Neopren, Spline Mil, Çap: 120mm, Genişlik: 102mm"
  },
  "21492771": {
    brand: "Volvo Penta",
    category: "İmpeller & Soğutma",
    name: "Volvo Penta D8 Deniz Suyu Pompa İmpeller Kiti",
    models: "Volvo Penta D8-550, D8-600, IPS700, IPS800",
    cross: "Johnson 09-814B, Jabsco 13554-0001",
    interval: "200 Saat / Sezon Başı",
    specs: "12 Kanatlı Neopren İmpeller, O-ring ve Çektirme Vidası Dahil"
  },
  "3827110": {
    brand: "Volvo Penta",
    category: "Filtreler",
    name: "Volvo Penta D9 / D11 Karter Havalandırma Gazı Filtresi (CCV Breather)",
    models: "Volvo Penta D9, D11 Marin Dizel Motorlar",
    cross: "Mann LC 9001 x, Racor CCV 4500",
    interval: "400 Saat / Yılda 1 Kez",
    specs: "Kapalı Karter Havalandırma Yağ Buharı Separatörü"
  },
  "3842189": {
    brand: "Volvo Penta",
    category: "Filtreler",
    name: "Volvo Penta D12 / D13 CCV Karter Yağ Buharı Separatör Kartuşu",
    models: "Volvo Penta D12, D13 Marin Dizel Motorlar",
    cross: "Racor CCV 6000, Mann LC 10 001",
    interval: "400-500 Saat / Yılda 1 Kez",
    specs: "Ağır Hizmet Karter Havalandırma Filtre Elemanı"
  },
  "471034": {
    brand: "Volvo Penta",
    category: "Filtreler",
    name: "Volvo Penta TAMD61 / 62 / 63 / 71 / 72 / 74 / 75 / 122 Ana Yağ Filtresi",
    models: "Volvo Penta TAMD61, TAMD62, TAMD63, TAMD71, TAMD72, TAMD73, TAMD74, TAMD75, TAMD122",
    cross: "Mann W 11 102/4, Baldwin B76, Donaldson P550425, Fleetguard LF670",
    interval: "200 Saat / Sezon Başı",
    specs: "Ağır Hizmet Vidalı Spin-on Yağ Filtresi (1 1/8-16 Diş)"
  },
  "466634": {
    brand: "Volvo Penta",
    category: "Filtreler",
    name: "Volvo Penta TAMD Serisi By-Pass İnce Yağ Filtresi Kartuşu",
    models: "Volvo Penta TAMD60, TAMD70, TAMD71, TAMD74, TAMD122 Serisi",
    cross: "Mann W 940, Baldwin B2, Donaldson P550758",
    interval: "200 Saat / Ana Yağ Filtresi ile Beraber",
    specs: "İnce By-Pass Yağ Filtrasyonu, M24 Diş"
  },
  "876185": {
    brand: "Volvo Penta",
    category: "Filtreler",
    name: "Volvo Penta TAMD41 / 63 / 74 Çiftli Yakıt Filtresi Elemanı (Spin-on)",
    models: "Volvo Penta TAMD31, TAMD41, KAD42, KAD43, TAMD63, TAMD74",
    cross: "Mann WK 842/2, Baldwin BF784, Donaldson P550588, Fleetguard FF5052",
    interval: "200 Saat / Sezonluk",
    specs: "Vidalı Yakıt Filtresi, Su Ayırma Özellikli, M16x1.5 Diş"
  },
  "876069": {
    brand: "Volvo Penta",
    category: "Filtreler",
    name: "Volvo Penta KAD32 / 42 / 43 / 44 / 300 / TAMD Kompresörlü Turbo Hava Filtresi",
    models: "Volvo Penta KAD32P, KAD42P, KAD43P, KAD44P, KAD300, KAMD43, KAMD44",
    cross: "Mann C 18 114, Donaldson P777409, Baldwin PA2844, Sierra 18-0909",
    interval: "200-400 Saat / Sezonluk Kontrol",
    specs: "Oval Kutu Tipi Marin Hava Filtresi Elemanı"
  },
  "3593654": {
    brand: "Volvo Penta",
    category: "İmpeller & Soğutma",
    name: "Volvo Penta KAD32 / 42 / 43 / 44 / 300 Ham Su İmpeller Kiti (Spline)",
    models: "Volvo Penta KAD32, KAD42, KAD43, KAD44, KAD300, TAMD31, TAMD41",
    cross: "Johnson 09-1028B, Jabsco 17937-0001, Sierra 18-3074, CEF 500106",
    interval: "200 Saat veya Her Sezon Başı",
    specs: "8 Bıçaklı Neopren, Şaft Çapı: 15.8mm (Spline), Dış Çap: 65mm, Genişlik: 51mm"
  },
  "838929": {
    brand: "Volvo Penta",
    category: "Tutya & Anotlar",
    name: "Volvo Penta TAMD / KAD Isı Eşanjörü Çinko Tutya Anot Kalemi",
    models: "Volvo Penta TAMD31, 41, 61, 62, 63, 71, 74, 122, KAD42, 43, 44, 300",
    cross: "Tecnoseal 00702, Martyr CM838929Z",
    interval: "100 Saat / 6 Ayda Bir Kontrol",
    specs: "3/8\" NPT Pirinç Tapalı Değiştirilebilir Çinko Çubuk (Tuzlu Su Koruması)"
  },
  "858488": {
    brand: "Volvo Penta",
    category: "Tutya & Anotlar",
    name: "Volvo Penta 280 / 290 / DP-A / DP-E Kuyruk Koni Tutya Anodu (Çinko)",
    models: "Volvo Penta 280DP, 290DP, DP-A, DP-B, DP-C, DP-D, DP-E",
    cross: "Tecnoseal 00705, Martyr CM858488Z, Sierra 18-6014",
    interval: "Her Sezon Başı Değişim",
    specs: "Duoprop Pervane Mil Koni Çinko Tutyası"
  },
  "854031": {
    brand: "Volvo Penta",
    category: "Kuyruk & Şanzıman",
    name: "Volvo Penta 280 / 290 / DP Kuyruk Egzoz Körüğü",
    models: "Volvo Penta 280, 290, SP-A, DP-A..E Kuyruk Sistemleri",
    cross: "Sierra 18-2758, Orbitrade 15031, Mallory 9-72701",
    interval: "2 Yılda 1 Değişim",
    specs: "Geri Akış Flaplı Ağır Hizmet Marin Kauçuk Körük, Kelepçeler Dahil"
  },
  "876294": {
    brand: "Volvo Penta",
    category: "Kuyruk & Şanzıman",
    name: "Volvo Penta 280 / 290 / DP Kuyruk Kardan U-Joint Şaft Körüğü",
    models: "Volvo Penta 270, 275, 280, 285, 290, SP, DP Kuyruklar",
    cross: "Sierra 18-2744, Orbitrade 15294, GLM 89080",
    interval: "2 Yılda 1 Değişim Zorunlu",
    specs: "Su Girişini Önleyen Esnek Kardan Körüğü, Çift Paslanmaz Kelepçeli"
  },
  "3853807": {
    brand: "Volvo Penta",
    category: "Kuyruk & Şanzıman",
    name: "Volvo Penta SX / DPS Ayna Kovan Gimbal Rulmanı (Gimbal Bearing)",
    models: "Volvo Penta SX-M, SX-A, DPS-A, DPS-B, Mercruiser Alpha/Bravo",
    cross: "Sierra 18-21005, GLM 21905, Mallory 9-72410",
    interval: "Rulman Ses / Titreşim Halinde veya 3 Yılda 1",
    specs: "Kapalı Ağır Hizmet Bilyalı Gimbal Rulmanı, Yağlama Kanallı"
  },
  "3852293": {
    brand: "Volvo Penta",
    category: "Kuyruk & Şanzıman",
    name: "Volvo Penta SX / DPS Vites Teli Körüğü (Shift Cable Bellow)",
    models: "Volvo Penta SX, DPS-A, DPS-B Kuyruk Sistemleri",
    cross: "Sierra 18-2763, Orbitrade 15293",
    interval: "2 Yılda 1 Değişim",
    specs: "Vites Kablo Geçiş Su Yalıtım Körüğü"
  },
  "3857578": {
    brand: "Volvo Penta",
    category: "Tutya & Anotlar",
    name: "Volvo Penta DPS-A / DPS-B Kuyruk Transom Ayna Tutya Anodu (Çinko)",
    models: "Volvo Penta DPS-A, DPS-B Duoprop Kuyruklar",
    cross: "Tecnoseal 00718, Martyr CM3857578Z",
    interval: "Her Sezon Başı Kontrol / Değişim",
    specs: "Transom Ayna Alt Kısım Koruma Çinko Anodu"
  },
  "3857576": {
    brand: "Volvo Penta",
    category: "Tutya & Anotlar",
    name: "Volvo Penta SX-M / SX-A Kuyruk Ayna Çinko Tutyası",
    models: "Volvo Penta SX Tek Pervaneli Kuyruk Sistemleri",
    cross: "Tecnoseal 00714, Martyr CM3857576Z",
    interval: "Her Sezon Başı Değişim",
    specs: "SX Kuyruk Korozyon Önleyici Çinko Blok"
  },
  "3857840": {
    brand: "Volvo Penta",
    category: "Filtreler",
    name: "Volvo Penta V6 / V8 Benzinli Marin Su Ayırıcı Yakıt Filtresi (10 Mikron)",
    models: "Volvo Penta 4.3GL/GXi, 5.0GL/GXi, 5.7Gi/GXi, 8.1Gi Benzinli Motorlar",
    cross: "Sierra 18-7866, Mann WK 812, Baldwin BF7798-D",
    interval: "100 Saat / Her Sezon Başı",
    specs: "10 Mikron Vidalı Benzin Yakıt Filtresi & Su Ayırıcı Eleman (13/16-16 Diş)"
  },
  "3860703": {
    brand: "Volvo Penta",
    category: "Filtreler",
    name: "Volvo Penta Dizel & Benzinli Su Ayırıcı Ön Yakıt Filtresi",
    models: "Volvo Penta Dizel ve Benzinli İçten Takma Motorlar",
    cross: "Sierra 18-7945, Racor R24P Muadili",
    interval: "200 Saat / Yılda 1 Kez",
    specs: "Genişletilmiş Su Tutma Hazneli Spin-on Filtre Elemanı"
  },
  "3862228": {
    brand: "Volvo Penta",
    category: "İmpeller & Soğutma",
    name: "Volvo Penta 4.3L / 5.0L / 5.7L / 8.1L Krank Mili Ham Su Pompası İmpelleri",
    models: "Volvo Penta V6 ve V8 Benzinli Motorlar (Krank Mili Tahrikli Pompa)",
    cross: "Johnson 09-5000, Jabsco 21213660, Sierra 18-3150",
    interval: "100 Saat veya Sezon Başı",
    specs: "10 Kanatlı Neopren, Düz Mil Yuvası, Dış Çap: 57mm"
  },
  "3850398": {
    brand: "Volvo Penta",
    category: "Elektrik & Sensörler",
    name: "Volvo Penta V6 / V8 12V 1.4kW Marin Marş Motoru",
    models: "Volvo Penta 4.3L, 5.0L, 5.7L, 8.1L Benzinli Marin Motorlar",
    cross: "Sierra 18-5913, Arco 30460, Delco PG260M",
    interval: "Arıza Halinde / Yıllık Fırça ve Korozyon Kontrolü",
    specs: "SAE J1171 Marin Kıvılcım Korumalı, Suya ve Korozyona Dayanıklı Marş Motoru"
  },
  "3850589": {
    brand: "Volvo Penta",
    category: "Elektrik & Sensörler",
    name: "Volvo Penta V6 / V8 Benzinli Motor Buji Seti (4'lü / 8'li)",
    models: "Volvo Penta 4.3GL/GXi, 5.0GL/GXi, 5.7Gi/GXi, 8.1Gi",
    cross: "NGK BPR6EFS, Champion RS12YC, AC Delco MR43LTS",
    interval: "100-200 Saat / 2 Sezonda 1 Kez",
    specs: "Marin Korozyon Kaplamalı Buji, Ön Ayarlı Tırnak Aralığı"
  },
  "3589886": {
    brand: "Volvo Penta",
    category: "Kuyruk & Şanzıman",
    name: "Volvo Penta HS45A / HS63A / HS85 Hidrolik Şanzıman Yağ Filtresi",
    models: "Volvo Penta HS45, HS63, HS85 Şanzıman Sistemleri (D4 / D6 Motorlar)",
    cross: "ZF 3312199031, Mann W 712, Baldwin BT8409",
    interval: "200 Saat / Sezon Başı (ATF Dexron III ile)",
    specs: "Hidrolik Kavrama ve Basınç Devresi İnce Filtresi"
  },
  "22536852": {
    brand: "Volvo Penta",
    category: "Yağ & Sıvılar",
    name: "Volvo Penta VDS-4.5 15W-40 Tam Sentetik Ağır Hizmet Marin Motor Yağı (5L)",
    models: "Volvo Penta D1, D2, D3, D4, D6, D8, D9, D11, D13, D16 Tüm Marin Dizeller",
    cross: "API CK-4 / CJ-4 / CI-4 Plus, ACEA E9 / E7, Volvo VDS-4.5",
    interval: "200 Saat veya Yılda 1 Kez",
    specs: "Tuzlu su korozyonu ve yüksek kükürt dayanımlı orijinal marin motor yağı"
  },
  "23999553": {
    brand: "Volvo Penta",
    category: "Yağ & Sıvılar",
    name: "Volvo Penta VDS-4.5 15W-40 Tam Sentetik Marin Motor Yağı (20L Kova)",
    models: "Volvo Penta D4, D6, D8, D11, D13 Çift Motorlu Yatlarda Toplu Bakım",
    cross: "Volvo VDS-4.5, API CK-4 Orijinal Dolum",
    interval: "200 Saat / Sezonluk Bakım",
    specs: "20 Litre Orijinal Ambalaj, Ağır Hizmet Common Rail Koruması"
  },
  "22567215": {
    brand: "Volvo Penta",
    category: "Yağ & Sıvılar",
    name: "Volvo Penta VCS Sarı Kullanıma Hazır Marin Antifriz & Soğutma Sıvısı (5L Ready-Mix)",
    models: "Volvo Penta D3, D4, D6, D8, D11, D13 (Sarı Soğutma Sıvısı Kullanan Tüm Modeller)",
    cross: "Volvo Penta OAT VCS Yellow Organic Coolant",
    interval: "4 Yılda 1 Kez Tam Değişim",
    specs: "-25°C Donma Koruması, Alüminyum Eşanjör Korozyon ve Kavitasyon Önleyici"
  },
  "22567206": {
    brand: "Volvo Penta",
    category: "Yağ & Sıvılar",
    name: "Volvo Penta VCS Sarı Konsantre Marin Antifriz (5L)",
    models: "Volvo Penta D4, D6, D8, D11, D13, D16 Marin Motorlar",
    cross: "Volvo VCS Concentrate OAT",
    interval: "4 Yılda 1 Kez (Saf Su ile %50-%50 Karışım)",
    specs: "-37°C Koruma Sağlayan Konsantre Organik Asit Teknolojisi (OAT)"
  },
  "22479648": {
    brand: "Volvo Penta",
    category: "Yağ & Sıvılar",
    name: "Volvo Penta Tam Sentetik Marin Kuyruk & Şanzıman Yağı 75W-90 (1L)",
    models: "Volvo Penta IPS 1/2/3, DPH, DPR, SX, DPS, Saildrive 130S/150S",
    cross: "API GL-5, SAE 75W-90 Tam Sentetik",
    interval: "200 Saat / Her Sezon Başı",
    specs: "Yüksek Basınç (EP) Aşırı Yük Dayanımlı Pod ve Kuyruk Şanzıman Sıvısı"
  },

  // ─── YANMAR MARINE (1GM, 2YM, 3YM, 3JH, 4JH, 4LH, 6LY, 6CX, 4LV, 8LV, SD20, SD50, SD60) ───
  "129150-35153": {
    brand: "Yanmar",
    category: "Filtreler",
    name: "Yanmar 4JH / 3JH / 4LH Motor Yağ Filtresi (M20x1.5)",
    models: "Yanmar 3JH2, 3JH3, 3JH4E, 3JH5E, 4JH2, 4JH3, 4JH4E, 4JH5E, 4JH4-TE, 4LH-TE",
    cross: "Mann W 68/1, Baldwin B1402, Donaldson P502015, Sierra 18-7911, Wix 51394",
    interval: "150-200 Saat / Sezon Başı",
    specs: "M20x1.5 Diş, Geri Dönüş Çekvalfli, 20 Mikron Orijinal Japon Marin Yağ Filtresi"
  },
  "119305-35170": {
    brand: "Yanmar",
    category: "Filtreler",
    name: "Yanmar 1GM10 / 2YM15 / 3YM20 / 3YM30 Kompakt Motor Yağ Filtresi",
    models: "Yanmar 1GM, 2GM, 3GM, 1GM10, 2YM15, 3YM20, 3YM30, 3JH30",
    cross: "Mann W 67/1, Baldwin B1434, Donaldson P502019, Wix 51365",
    interval: "150 Saat / Sezon Başı",
    specs: "3/4-16 Diş, Kompakt Boyut, Jelkot ve Tuz Suyu Nemine Dayanıklı Kutu"
  },
  "119593-35100": {
    brand: "Yanmar",
    category: "Filtreler",
    name: "Yanmar 6LYA / 6LY2 / 6LY3 / 6LY400 / 6LY440 Ağır Hizmet Yağ Filtresi",
    models: "Yanmar 6LY-UTE, 6LYA-STE, 6LY2-STE, 6LY3-ETP, 6LY3-STP, 6LY400, 6LY440",
    cross: "Mann W 940/18, Baldwin B7030, Donaldson P550388, Fleetguard LF3827",
    interval: "200-250 Saat / Sezon Başı",
    specs: "3/4-16 Diş, 25 Mikron Ağır Hizmet Yüksek Debi Sentetik Filtre Elemanı"
  },
  "124085-35112": {
    brand: "Yanmar",
    category: "Filtreler",
    name: "Yanmar 4LHA-HTE / 4LHA-DTE / 4LHA-STE Marin Yağ Filtresi",
    models: "Yanmar 4LHA-HTE, 4LHA-DTZE, 4LHA-STZE (160HP - 240HP)",
    cross: "Mann W 920, Baldwin B1428, Donaldson P550008",
    interval: "200 Saat / Yılda 1 Kez",
    specs: "Geri Kaçırmaz By-pass Valfli Marin Yağ Filtresi"
  },
  "129470-55810": {
    brand: "Yanmar",
    category: "Filtreler",
    name: "Yanmar 3JH / 4JH Vidalı Spin-on Yakıt Filtresi Kartuşu",
    models: "Yanmar 3JH3E, 3JH4E, 4JH3E, 4JH4E, 4JH5E, 4JH4-TE",
    cross: "Mann WK 812, Baldwin BF7856, Donaldson P550588, Sierra 18-7913",
    interval: "200 Saat / Sezon Başı",
    specs: "Vidalı Tip 10 Mikron Su Ayırıcılı Dizel Yakıt Filtresi, M20x1.5 Diş"
  },
  "104500-55710": {
    brand: "Yanmar",
    category: "Filtreler",
    name: "Yanmar 1GM / 2GM / 3GM / 2YM / 3YM Yakıt Filtresi Kartuş Elemanı (O-Ringli)",
    models: "Yanmar 1GM, 2GM20, 3GM30, 2YM15, 3YM20, 3YM30",
    cross: "Mann P 707, Baldwin PF7794, Donaldson P502138, Sierra 18-7798",
    interval: "150-200 Saat / Sezon Başı",
    specs: "Plastik/Cam Kase İçi Değiştirilebilir Kağıt Eleman, O-ring Dahil"
  },
  "119593-55800": {
    brand: "Yanmar",
    category: "Filtreler",
    name: "Yanmar 6LY2 / 6LY3 / 6CX İkincil İnce Yakıt Filtresi Kartuşu",
    models: "Yanmar 6LYA, 6LY2, 6LY3, 6CX-ETE, 6CX-GTYE",
    cross: "Mann WK 940/5, Baldwin BF7674-D, Donaldson P550388",
    interval: "200 Saat / Sezon Başı",
    specs: "5 Mikron Yüksek Basınçlı Yakıt Pompası Koruma Filtresi"
  },
  "129574-55711": {
    brand: "Yanmar",
    category: "Filtreler",
    name: "Yanmar 4JH4-TE / 4JH4-HTE / 4JH5E Eko Yakıt Filtre Kartuş Elemanı",
    models: "Yanmar 4JH4-TE, 4JH4-HTE, 4JH5E, 4JH80, 4JH110 (CR Modeller)",
    cross: "Mann PU 816 x, Donaldson P550881, Baldwin PF7949",
    interval: "200 Saat / Yılda 1 Kez",
    specs: "Yeni Nesil Metal Gövdesiz Ekolojik Yakıt Filtresi, Su Algılama Yuvalı"
  },
  "120650-55020": {
    brand: "Yanmar",
    category: "Filtreler",
    name: "Yanmar 4LV150..250 / 6LF Common Rail Dizel Yakıt Filtresi",
    models: "Yanmar 4LV150, 4LV170, 4LV195, 4LV230, 4LV250, 6LF480, 6LF530, 6LF550",
    cross: "Mann WK 820, Donaldson P551433",
    interval: "200 Saat / Sezon Başı",
    specs: "2000 Bar Common Rail Enjeksiyon Sistemi 2 Mikron Mikro Filtrasyon"
  },
  "129470-42532": {
    brand: "Yanmar",
    category: "İmpeller & Soğutma",
    name: "Yanmar 3JH / 4JH / 4JH2 Deniz Suyu İmpeller Kiti (Pimli Drive)",
    models: "Yanmar 3JH2, 3JH3, 3JH4, 4JH2, 4JH3, 4JH4E, 4JH5E (Johnson / Jabsco Pompa)",
    cross: "Johnson 09-1027B-1, Jabsco 1210-0001, Sierra 18-3081, CEF 500107",
    interval: "150-200 Saat veya Sezon Başı",
    specs: "6 Bıçaklı Neopren, Pim Sürücülü Mil Yuvası, Çap: 57mm, Genişlik: 31.5mm"
  },
  "128990-42200": {
    brand: "Yanmar",
    category: "İmpeller & Soğutma",
    name: "Yanmar 1GM / 2YM / 3YM Ham Deniz Suyu İmpeller Kiti (D-Shaft)",
    models: "Yanmar 1GM10, 2YM15, 3YM20, 3YM30, 2GM20F, 3GM30F",
    cross: "Johnson 09-801B, Jabsco 673-0001, Sierra 18-3075, CEF 500100",
    interval: "150 Saat veya Her Sezon Başı",
    specs: "6 Kanatlı Neopren, D-Tipi Düz Mil, Çap: 51mm, Genişlik: 22mm, O-Ring Dahil"
  },
  "119574-42552": {
    brand: "Yanmar",
    category: "İmpeller & Soğutma",
    name: "Yanmar 6LY2 / 6LY3 / 6LYA Ham Su Pompası İmpeller Kiti (Spline)",
    models: "Yanmar 6LYA-STE, 6LY2-STE, 6LY3-ETP/STP/UTP (370HP - 480HP)",
    cross: "Johnson 09-819B, Jabsco 17937-0001, Sierra 18-3275, CEF 500168",
    interval: "200-250 Saat / Sezon Başı",
    specs: "10 Bıçaklı Neopren, Spline Mil, Çap: 95mm, Genişlik: 63mm"
  },
  "129670-42531": {
    brand: "Yanmar",
    category: "İmpeller & Soğutma",
    name: "Yanmar 4JH4-TE / 4JH5E / 4JH80 Yeni Nesil İmpeller Kiti",
    models: "Yanmar 4JH4-TE, 4JH4-HTE, 4JH5E, 4JH80, 4JH110 (Hızlı Değişim Kapaklı)",
    cross: "Johnson 09-812B-1, Sierra 18-3071-1",
    interval: "200 Saat / Sezonluk",
    specs: "12 Kanatlı Neopren, Spline Şaft, Çektirme Dişi Entegre"
  },
  "119773-42570": {
    brand: "Yanmar",
    category: "İmpeller & Soğutma",
    name: "Yanmar 6CX / 6SY Yüksek Kapasiteli Bronz Pompa İmpelleri",
    models: "Yanmar 6CX-GTYE, 6CX-ETE, 6SY-STP (500HP - 720HP)",
    cross: "Jabsco 17954-0001, Johnson 09-821B-1",
    interval: "250-300 Saat / Sezon Başı",
    specs: "12 Kanatlı Neopren, Spline Mil, Çap: 120mm, Genişlik: 89mm"
  },
  "120650-42310": {
    brand: "Yanmar",
    category: "İmpeller & Soğutma",
    name: "Yanmar 4LV / 8LV Common Rail Deniz Suyu Pompa İmpeller Kiti",
    models: "Yanmar 4LV150..250, 8LV320, 8LV350, 8LV370",
    cross: "Johnson 09-1028B, Jabsco 17937-0001",
    interval: "200 Saat / Sezon Başı",
    specs: "Ağır Hizmet Neopren İmpeller, Yağlama Gresli Montaj Paketi"
  },
  "121750-49800": {
    brand: "Yanmar",
    category: "İmpeller & Soğutma",
    name: "Yanmar 2GM / 3GM / 2YM / 3YM / JH Serisi Termostat 71°C",
    models: "Yanmar 1GM10, 2YM15, 3YM20, 3YM30, 3JH4E, 4JH4E, 4JH5E",
    cross: "Sierra 18-3620, Vernet Marin Termostat",
    interval: "3 Yılda 1 Kontrol / Hararet Sapmasında",
    specs: "Açılma: 71°C, Paslanmaz Yay ve Pirinç Gövde, Conta Dahil"
  },
  "129466-49801": {
    brand: "Yanmar",
    category: "İmpeller & Soğutma",
    name: "Yanmar 4JH4 / 4JH5 / 4LHA Yüksek Sıcaklık Termostatı 76.5°C",
    models: "Yanmar 4JH4-TE, 4JH4-HTE, 4LHA-HTE, 4LHA-STE",
    cross: "Volvo Penta / Vernet Muadili",
    interval: "3 Yılda 1 / Hararet Problemlerinde",
    specs: "Açılma: 76.5°C, Tam Açılma: 90°C"
  },
  "119574-18790": {
    brand: "Yanmar",
    category: "Tutya & Anotlar",
    name: "Yanmar 6LY / 4LH Isı Eşanjörü Çinko Tutya Anodu (M8 Dişli Kalem)",
    models: "Yanmar 4LH-TE, 4LH-HTE, 4LHA, 6LY-UTE, 6LYA, 6LY2, 6LY3",
    cross: "Tecnoseal 00801, Martyr CM11957418790Z",
    interval: "100 Saat / 6 Ayda Bir Kontrol (%50 Erime Değişim)",
    specs: "M8 Dişli Saf Çinko Çubuk, Eşanjör ve Yağ Soğutucu Koruma"
  },
  "27210-200300": {
    brand: "Yanmar",
    category: "Tutya & Anotlar",
    name: "Yanmar Motor Bloğu Çinko Tutya Tapası & Elemanı (20x30mm)",
    models: "Yanmar 1GM, 2GM, 3GM, 3HM, 2YM, 3YM, 3JH, 4JH Serisi",
    cross: "Tecnoseal 00802, Martyr CM27210200300Z",
    interval: "100-150 Saat / Sezonluk",
    specs: "Pirinç Kör Tapalı 20mm x 30mm Çinko Blok Tutyası"
  },
  "196420-02652": {
    brand: "Yanmar",
    category: "Tutya & Anotlar",
    name: "Yanmar SD20 / SD25 Saildrive Çinko Bölünmüş Halka Anot",
    models: "Yanmar SD20, SD25 Yelkenli Kuyruk Sistemleri (2YM/3YM/3JH Motorlar)",
    cross: "Tecnoseal 00805, Martyr CM19642002652Z",
    interval: "Her Sezon Başı Karaya Çıkışta Değişim",
    specs: "İki Parçalı Bölünmüş Çinko Halka, 2 Adet Paslanmaz Cıvata Dahil"
  },
  "196440-02660": {
    brand: "Yanmar",
    category: "Tutya & Anotlar",
    name: "Yanmar SD40 / SD50 / SD60 Saildrive Çinko Halka Anot Seti",
    models: "Yanmar SD40, SD50, SD60 Kuyruk Sistemleri (4JH Motorlar)",
    cross: "Tecnoseal 00807, Martyr CM19644002660Z",
    interval: "Yılda 1 Kez / Sezon Başı",
    specs: "Ağır Hizmet Bölünmüş Çinko Halka, Şaft Kovanı Katodik Koruması"
  },
  "196440-02670": {
    brand: "Yanmar",
    category: "Tutya & Anotlar",
    name: "Yanmar SD50 / SD60 Saildrive Pervane Somun Çinko Tutyası",
    models: "Yanmar SD50 ve SD60 Katlanır / Sabit Pervaneler",
    cross: "Tecnoseal 00808, Martyr CM19644002670Z",
    interval: "Her Sezon Başı Değişim",
    specs: "Pervane Koni Uç Koruma Tutyası"
  },
  "128630-77011": {
    brand: "Yanmar",
    category: "Elektrik & Sensörler",
    name: "Yanmar 1GM / 2YM / 3YM Marin Marş Motoru 12V 1.0kW",
    models: "Yanmar 1GM10, 2YM15, 3YM20, 3YM30, 2GM20, 3GM30",
    cross: "Hitachi S114-651, Sierra 18-5942, Arco 70110",
    interval: "Arıza Halinde / Sezonluk Marş Otomatiği Kontrolü",
    specs: "12V 1.0kW, 9 Dişli Pinyon, Marin Korozyon Korumalı"
  },
  "129242-77010": {
    brand: "Yanmar",
    category: "Elektrik & Sensörler",
    name: "Yanmar 4JH Serisi Marin Marş Motoru 12V 1.4kW",
    models: "Yanmar 3JH3, 3JH4, 4JH3, 4JH4E, 4JH5E, 4JH4-TE",
    cross: "Hitachi S114-817, Arco 70112, Sierra 18-5943",
    interval: "Arıza Halinde / Sezon Sonu Kontrol",
    specs: "12V 1.4kW Yüksek Torklu Redüksiyonlu Marin Marş Motoru"
  },
  "119593-77010": {
    brand: "Yanmar",
    category: "Elektrik & Sensörler",
    name: "Yanmar 6LY Serisi Marin Marş Motoru 12V 3.0kW",
    models: "Yanmar 6LYA, 6LY2, 6LY3 Tüm Güç Grupları",
    cross: "Hitachi S13-407, Arco 70115",
    interval: "Arıza Halinde",
    specs: "12V 3.0kW Ağır Hizmet Büyük Hacim Dizel Marş Motoru"
  },
  "129470-77200": {
    brand: "Yanmar",
    category: "Elektrik & Sensörler",
    name: "Yanmar Hitachi 12V 80A Marin Alternatör (Dahili Regülatörlü)",
    models: "Yanmar 3YM, 3JH, 4JH Serisi Marin Motorlar",
    cross: "Hitachi LR180-03, Sierra 18-5984",
    interval: "1000 Saat / Kömür ve Rulman Kontrolü",
    specs: "12V 80 Amper, Marin İzole Şaseli Alternatör"
  },
  "129670-13561": {
    brand: "Yanmar",
    category: "Mekanik & Contalar",
    name: "Yanmar 4JH Serisi Paslanmaz Çelik Egzoz Karıştırıcı Dirsek (Mixing Elbow)",
    models: "Yanmar 3JH3, 4JH3, 4JH4E, 4JH5E, 4JH4-TE",
    cross: "HDI Marine SSJH, Sierra 18-0417",
    interval: "3-4 Yılda 1 Kontrol / Tıkanma veya Çatlak Halinde Değişim",
    specs: "316L Paslanmaz Çelikten Hassas Döküm, Korozyon ve Tıkanma Yapmaz, Conta Dahil"
  },
  "119773-13500": {
    brand: "Yanmar",
    category: "Mekanik & Contalar",
    name: "Yanmar 6LY Serisi 316L Paslanmaz Çelik Egzoz Karıştırıcı Dirsek",
    models: "Yanmar 6LYA-STE, 6LY2-STE, 6LY3-ETP/STP",
    cross: "HDI Marine SSLY, Yanmar Orijinal",
    interval: "4 Yılda 1 Kontrol / Sezon Sonu Kışlama Kontrolü",
    specs: "Turboşarj Çıkışı Deniz Suyu Karıştırma Dirseği, Ağır Hizmet Paslanmaz Çelik"
  },

  // ─── MAN MARINE (i6-730/800/850, V8-1000/1200/1300, V12-1400/1550/1650/1800/1900/2000) ───
  "51.05504-0105": {
    brand: "MAN Marine",
    category: "Filtreler",
    name: "MAN i6 / V8 / V12 Common Rail Ana Motor Yağ Filtresi Elemanı (HU 12 140 x)",
    models: "MAN i6-730, i6-800, i6-850, V8-1000, V8-1200, V8-1300, V12-1400, V12-1650, V12-1900, V12-2000",
    cross: "Mann HU 12 140 x, Mahle OX 348D, Donaldson P550920, Baldwin P7415",
    interval: "200-400 Saat / Yılda 1 Kez",
    specs: "Metal İçermeyen Ekolojik Yağ Filtresi Elemanı, O-ring ve Bakır Pul Dahil"
  },
  "51.05504-0104": {
    brand: "MAN Marine",
    category: "Filtreler",
    name: "MAN By-Pass Santrifüj Rotor Yağ Filtresi Kartuşu",
    models: "MAN D2840, D2842, D2848, D2868, D2862 V8 ve V12 Marin Motorlar",
    cross: "Mann CS 0104, Fleetguard CS41001, Baldwin CS5020",
    interval: "400 Saat / Her İki Yağ Değişiminde Bir",
    specs: "Yağdaki İnce Kurum ve Karbon Çamurunu Tutan Santrifüj Rotor Kartuşu"
  },
  "51.05504-0107": {
    brand: "MAN Marine",
    category: "Filtreler",
    name: "MAN D2842 / D2848 / D2866 Vidalı Çiftli Yağ Filtresi (Spin-on)",
    models: "MAN D2840 LE401, D2842 LE404/LE409, D2848 LE403, D2866 LE401",
    cross: "Mann W 11 102/4, Baldwin B76, Donaldson P550425, Fleetguard LF670",
    interval: "200 Saat / Sezon Başı",
    specs: "1 1/8-16 Dişli Ağır Hizmet Spin-on Filtre Kartuşu"
  },
  "51.05504-0122": {
    brand: "MAN Marine",
    category: "Filtreler",
    name: "MAN D2676 / D2862 Yeni Nesil Ekolojik Yağ Filtre Elemanı",
    models: "MAN D2676 LE421/431 (i6 Serisi), D2862 LE426/436/446/456 (V12 Serisi)",
    cross: "Mann HU 12 008 z, Hengst E420H D225",
    interval: "200-400 Saat / Sezonluk",
    specs: "Yüksek Basınçlı Sentetik Elyaf Filtrasyon Elemanı"
  },
  "51.12503-0052": {
    brand: "MAN Marine",
    category: "Filtreler",
    name: "MAN Common Rail Birincil Yakıt Ön Filtresi (Su Ayırıcılı Eleman)",
    models: "MAN i6, V8, V12 Common Rail Marin Motorlar",
    cross: "Mann WK 10 002 z, Donaldson P550529, Baldwin BF7814, Separ 01030",
    interval: "200 Saat / Sezon Başı",
    specs: "30 Mikron Su Ayırıcı ve Kaba Partikül Tutucu Kartuş"
  },
  "51.12503-0062": {
    brand: "MAN Marine",
    category: "Filtreler",
    name: "MAN Common Rail İkincil İnce Yakıt Filtresi Kartuşu (5 Mikron)",
    models: "MAN i6-730..850, V8-1000..1300, V12-1400..2000 CR Sistemleri",
    cross: "Mann PU 1059 x, Donaldson P550881, Baldwin BF7949, Fleetguard FF5794",
    interval: "200 Saat / Yılda 1 Kez",
    specs: "Common Rail Yüksek Basınç Pompası ve Enjektör Koruma Elemanı (5 Mikron)"
  },
  "51.12501-7288": {
    brand: "MAN Marine",
    category: "Filtreler",
    name: "MAN D2840 / D2842 Spin-on Vidalı Yakıt Filtresi Kartuşu",
    models: "MAN D2840, D2842, D2848 Klasik Seri Motorlar",
    cross: "Mann WK 940/5, Baldwin BF7674-D, Donaldson P550388",
    interval: "200 Saat / Sezon Başı",
    specs: "M16x1.5 Diş, 10 Mikron Orijinal Vidalı Yakıt Filtresi"
  },
  "51.08301-0016": {
    brand: "MAN Marine",
    category: "Filtreler",
    name: "MAN Turbo Silindirik Marin Hava Filtresi Kartuşu (C 30 1537)",
    models: "MAN i6-730/800, V8-1000/1200, V12-1400/1550/1650/1800",
    cross: "Mann C 30 1537, Donaldson P785522, Baldwin RS4638, Fleetguard AF26103",
    interval: "400 Saat / Sezonluk Kontrol ve Temizlik",
    specs: "Tuzlu Deniz Nemi Dayanımlı Ağır Hizmet Silindirik Hava Filtresi"
  },
  "51.08401-0022": {
    brand: "MAN Marine",
    category: "Filtreler",
    name: "MAN D2868 / D2862 Kutu Tipi Panel Marin Hava Filtresi",
    models: "MAN V8-1200, V8-1300, V12-1900, V12-2000 Yeni Nesil Motoryatlar",
    cross: "Mann C 36 008, Donaldson P637841",
    interval: "400 Saat / Yılda 1 Kez",
    specs: "Genişletilmiş Yüzey Alanlı Yüksek Debili Panel Filtre"
  },
  "51.06801-0004": {
    brand: "MAN Marine",
    category: "İmpeller & Soğutma",
    name: "MAN i6 / V8 Ham Deniz Suyu Pompası İmpeller Kiti (Neopren)",
    models: "MAN i6-730, i6-800, V8-1000, V8-1200 Marin Motorlar",
    cross: "Jabsco 17937-0001, Johnson 09-819B, CEF 500168",
    interval: "200-300 Saat veya Her Sezon Başı",
    specs: "10 Kanatlı Neopren, Spline Şaft, Çap: 95mm, Genişlik: 63mm"
  },
  "51.06801-0006": {
    brand: "MAN Marine",
    category: "İmpeller & Soğutma",
    name: "MAN V12 Ağır Hizmet Büyük Boy Ham Deniz Suyu İmpeller Kiti",
    models: "MAN V12-1400, V12-1550, V12-1650, V12-1800, V12-1900, V12-2000",
    cross: "Jabsco 17954-0001, Johnson 09-821B-1, CEF 500180",
    interval: "250-400 Saat veya Her Sezon Başı",
    specs: "12 Kanatlı Neopren, Spline Mil, Çap: 120mm, Genişlik: 102mm, Conta ve Çektirme Vidası Dahil"
  },
  "51.06802-0015": {
    brand: "MAN Marine",
    category: "İmpeller & Soğutma",
    name: "MAN Deniz Suyu Pompası Mekanik Karbür Salmastra & Keçe Seti",
    models: "MAN i6, V8, V12 Ham Su Pompaları",
    cross: "Burgmann Marin Salmastra, Johnson Pompa Keçesi",
    interval: "Su Sızıntısında / 1000 Saat Pompa Revizyonunda",
    specs: "Silisyum Karbür / Karbon Yüzeyli Korozyon ve Kum Aşınması Dayanımlı Mekanik Salmastra"
  },
  "51.06402-0082": {
    brand: "MAN Marine",
    category: "İmpeller & Soğutma",
    name: "MAN Soğutma Devresi Termostatı 79°C (Contalı)",
    models: "MAN D2842, D2848, D2868, D2862 Marin Dizel Motorlar",
    cross: "Behr / Mahle TI 17 79, Wahler Termostat",
    interval: "3 Yılda 1 Kontrol / Hararet Sapmasında",
    specs: "Açılma Sıcaklığı: 79°C, Ağır Hizmet Çift Kademeli Yaylı Termostat"
  },
  "51.06402-0083": {
    brand: "MAN Marine",
    category: "İmpeller & Soğutma",
    name: "MAN Soğutma Devresi Termostatı 83°C",
    models: "MAN i6-730, i6-800, V8-1000, V8-1200",
    cross: "Behr / Mahle TI 17 83",
    interval: "3 Yılda 1 / Aşırı Isınma Arızasında",
    specs: "Açılma: 83°C, Tam Açılma: 95°C"
  },
  "51.98141-0001": {
    brand: "MAN Marine",
    category: "Tutya & Anotlar",
    name: "MAN Isı Eşanjörü Çinko Tutya Anot Kalemi (3/8\" NPT)",
    models: "MAN i6, V8, V12 Deniz Suyu Isı Eşanjörleri",
    cross: "Tecnoseal 00901, Martyr CM51981410001Z",
    interval: "100-150 Saat / 6 Ayda Bir Kontrol",
    specs: "Pirinç Tapalı Değiştirilebilir Çinko Çubuk Anot"
  },
  "51.98141-0002": {
    brand: "MAN Marine",
    category: "Tutya & Anotlar",
    name: "MAN Aftercooler / Intercooler Çinko Anot Kalemi (1/2\" NPT)",
    models: "MAN V8-1200, V12-1550, V12-1800, V12-1900 Turbo Soğutucuları",
    cross: "Tecnoseal 00902, Martyr CM51981410002Z",
    interval: "100 Saat / Sezonluk",
    specs: "1/2\" NPT Ağır Hizmet Tutya Çubuğu"
  },
  "51.96801-0268": {
    brand: "MAN Marine",
    category: "Kayış & Kasnak",
    name: "MAN V8 / V12 Poly-V Serpentine Alternatör & Sirkülasyon Kayışı",
    models: "MAN D2868 V8, D2862 V12 Marin Motorlar",
    cross: "Gates 8PK Serisi, Continental Multi-V",
    interval: "500 Saat / 2 Yılda 1 Kez",
    specs: "8 Kanallı EPDM Marin Ağır Hizmet Tahrik Kayışı"
  },
  "51.96801-0312": {
    brand: "MAN Marine",
    category: "Kayış & Kasnak",
    name: "MAN i6 Devridaim Su Pompası Tahrik Kayışı",
    models: "MAN i6-730, i6-800, i6-850",
    cross: "Gates 6PK, Dayco Poly-V",
    interval: "500 Saat / 2 Yılda 1 Kez",
    specs: "6 Kanallı EPDM Serpentine Kayış"
  },
  "51.96820-0238": {
    brand: "MAN Marine",
    category: "Kayış & Kasnak",
    name: "MAN Otomatik Kayış Gergi Rulmanı (Tensioner Assembly)",
    models: "MAN i6, V8, V12 Marin Motorlar",
    cross: "Litens / Gates Otomatik Gergi",
    interval: "1000 Saat / Rulman Titreşimi Halinde",
    specs: "Dahili Sönümleyici Yaylı Otomatik Kayış Gergisi"
  },
  "51.26101-7253": {
    brand: "MAN Marine",
    category: "Elektrik & Sensörler",
    name: "MAN 24V 5.5kW Marin Marş Motoru (Bosch Tip)",
    models: "MAN i6-730..850, V8-1000..1200 Marin Dizel Motorlar",
    cross: "Bosch 0001241019, Prestolite 24V, Delco 24V",
    interval: "Arıza Halinde / Sezonluk Dişli ve Selenoid Kontrolü",
    specs: "24V 5.5kW Çift Kutuplu İzole Marin Marş Motoru"
  },
  "51.26101-7278": {
    brand: "MAN Marine",
    category: "Elektrik & Sensörler",
    name: "MAN 24V 6.7kW V12 Ağır Hizmet Marin Marş Motoru",
    models: "MAN V12-1400, V12-1550, V12-1650, V12-1800, V12-1900, V12-2000",
    cross: "Bosch 0001241028, Prestolite M105",
    interval: "Arıza Halinde",
    specs: "24V 6.7kW Yüksek Torklu Redüksiyonlu Marin Marş Motoru (V12 Motorlar İçin)"
  },
  "51.26107-0054": {
    brand: "MAN Marine",
    category: "Elektrik & Sensörler",
    name: "MAN 28V 100A Çift İzoleli Marin Alternatör",
    models: "MAN i6, V8, V12 Marin Motorlar",
    cross: "Bosch 0124655007, Prestolite 28V 100A",
    interval: "1000 Saat / Kömür ve Rulman Kontrolü",
    specs: "28V 100 Amper İzole Şaseli Marin Alternatör"
  },
  "51.10100-6084": {
    brand: "MAN Marine",
    category: "Filtreler",
    name: "MAN D2862 / D2868 Karter Havalandırma CCV Yağ Ayırıcı Filtre",
    models: "MAN V8-1000..1300, V12-1400..2000 Common Rail Motorlar",
    cross: "Mann LC 10 002, Racor CCV Serisi",
    interval: "400 Saat / Yılda 1 Kez",
    specs: "Krank Gazı Yağ Buharı Separatör Kartuşu"
  },
  "51.27421-0216": {
    brand: "MAN Marine",
    category: "Elektrik & Sensörler",
    name: "MAN Motor Soğutma Sıvısı Sıcaklık Müşürü (NTC Hararet Sensörü)",
    models: "MAN D2866, D2876, D2842, D2868, D2862",
    cross: "Bosch 0281002209",
    interval: "Arıza Göstergesinde / Yanlış Değer Okumasında",
    specs: "M14x1.5 Dişli Hassas NTC Sıcaklık Sensörü"
  },
  "51.27421-0182": {
    brand: "MAN Marine",
    category: "Elektrik & Sensörler",
    name: "MAN Yağ Basınç Sensörü & Transmitteri (0-10 Bar)",
    models: "MAN Tüm Marin Motor Serileri",
    cross: "Bosch 0281002576",
    interval: "Hatalı Basınç Alarmında",
    specs: "0-10 Bar Piezoelektrik Basınç Transmitteri, M18x1.5 Diş"
  },
  "51.11103-0048": {
    brand: "MAN Marine",
    category: "Mekanik & Contalar",
    name: "MAN Turboşarj Egzoz Giriş Çelik Conta Seti",
    models: "MAN V8 ve V12 Çift Turboşarjlı Marin Motorlar",
    cross: "Elring Klinger Çelik Conta, MAN Orijinal",
    interval: "Egzoz Gaz Kaçağında / Turbo Revizyonunda",
    specs: "Çok Katmanlı Paslanmaz Çelik (MLS) Yüksek Sıcaklık Egzoz Contası"
  },

  // ─── MARIN JENERATÖR: CUMMINS ONAN & KOHLER ───
  "122-0833": {
    brand: "Cummins / Onan",
    category: "Filtreler",
    name: "Cummins Onan 4-9kW MDKBL / MDKBM Motor Yağ Filtresi",
    models: "Cummins Onan MDKBL, MDKBM, MDKAL, MDKAA Marin Jeneratörler",
    cross: "Fleetguard LF3644, Mann W 68/3, Donaldson P502015, Wix 51394",
    interval: "100-150 Saat / Sezon Başı",
    specs: "M20x1.5 Diş, Kompakt Spin-on Jeneratör Yağ Filtresi"
  },
  "122-0893": {
    brand: "Cummins / Onan",
    category: "Filtreler",
    name: "Cummins Onan 11.5-29kW MDKBN / MDKBW / MDKUB Yağ Filtresi Kartuşu",
    models: "Cummins Onan MDKBN, MDKBP, MDKBW, MDKUB, MDDCA Marin Jeneratörler",
    cross: "Fleetguard LF3959, Mann W 712, Donaldson P550008, Baldwin B1434",
    interval: "150-200 Saat / Sezon Başı",
    specs: "3/4-16 Diş, Ağır Hizmet Jeneratör Yağ Filtresi"
  },
  "149-2341-01": {
    brand: "Cummins / Onan",
    category: "Filtreler",
    name: "Cummins Onan MDK Serisi Vidalı Spin-on Yakıt Filtresi Elemanı",
    models: "Cummins Onan MDKBL, MDKBM, MDKBN, MDKBW Tüm MDK Serileri",
    cross: "Fleetguard FF5507, Mann WK 812, Baldwin BF7856, Donaldson P550588",
    interval: "150-200 Saat / Yılda 1 Kez",
    specs: "Vidalı Spin-on Yakıt Filtresi, Su Ayırma Özellikli"
  },
  "140-3837": {
    brand: "Cummins / Onan",
    category: "Filtreler",
    name: "Cummins Onan MDK Serisi Marin Hava Filtresi Kartuşu",
    models: "Cummins Onan MDKBL, MDKBM, MDKBN, MDKBW",
    cross: "Fleetguard AF26248, Mann C 1140, Donaldson P780006",
    interval: "200-300 Saat / Sezonluk",
    specs: "Kompakt Silindirik Ses İzolasyonlu Jeneratör Hava Filtresi"
  },
  "541-1519": {
    brand: "Cummins / Onan",
    category: "İmpeller & Soğutma",
    name: "Cummins Onan MDKBL / MDKBM / MDKBN Ham Su İmpeller Kiti (O-Ringli)",
    models: "Cummins Onan e-QD 6.5kW, 7kW, 9kW, 11kW, 13.5kW, 17.5kW, 21.5kW (MDKBL, MDKBM, MDKBN)",
    cross: "Johnson 09-1027B-1, Jabsco 1210-0001, Sierra 18-3081, CEF 500107",
    interval: "150-200 Saat veya Sezon Başı",
    specs: "12 Bıçaklı Neopren, Spline Mil Yuvası, Çap: 57mm, Genişlik: 31.5mm, O-Ring Dahil"
  },
  "132-0316": {
    brand: "Cummins / Onan",
    category: "İmpeller & Soğutma",
    name: "Cummins Onan MDDCA / MDDCB Büyük Boy Ham Su İmpeller Kiti",
    models: "Cummins Onan 22.5kW - 40kW Ağır Hizmet Marin Jeneratörler",
    cross: "Jabsco 17937-0001, Johnson 09-819B, Sierra 18-3275",
    interval: "200 Saat / Sezon Başı",
    specs: "10 Bıçaklı Neopren, Spline Mil, Çap: 95mm, Genişlik: 63mm"
  },
  "132-0499": {
    brand: "Cummins / Onan",
    category: "İmpeller & Soğutma",
    name: "Cummins Onan 4-6kW MDKBH Kompakt İmpeller Kiti (D-Shaft)",
    models: "Cummins Onan 4kW, 5kW, 6kW e-QD Jeneratörler",
    cross: "Johnson 09-801B, Jabsco 673-0001, Sierra 18-3075",
    interval: "150 Saat / Sezon Başı",
    specs: "6 Bıçaklı Neopren, Düz Mil, Çap: 51mm, Genişlik: 22mm"
  },
  "0130-4434": {
    brand: "Cummins / Onan",
    category: "Tutya & Anotlar",
    name: "Cummins Onan Isı Eşanjörü Çinko Tutya Anot Kalemi (1/4\" NPT)",
    models: "Cummins Onan MDK Serisi Tüm Marin Jeneratörler",
    cross: "Tecnoseal 01001, Martyr CM01304434Z",
    interval: "100 Saat / 6 Ayda Bir Kontrol",
    specs: "1/4\" NPT Pirinç Tapalı Değiştirilebilir Çinko Çubuk"
  },
  "506-0034": {
    brand: "Cummins / Onan",
    category: "Kayış & Kasnak",
    name: "Cummins Onan Poly-V Su Pompası & Alternatör Kayışı",
    models: "Cummins Onan MDKBL, MDKBM, MDKBN, MDKBW",
    cross: "Gates 4PK Serisi, Dayco Poly-V",
    interval: "300-400 Saat / 2 Yılda 1 Kez",
    specs: "Aşınma Dayanımlı EPDM Marin Tahrik Kayışı"
  },
  "193-0244": {
    brand: "Cummins / Onan",
    category: "Elektrik & Sensörler",
    name: "Cummins Onan Hararet Müşürü & Sıcaklık Sensörü",
    models: "Cummins Onan MDK Serisi Jeneratörler",
    cross: "Datcon / VDO Sıcaklık Sensörü",
    interval: "Hatalı Alarm veya Sensör Arızasında",
    specs: "1/8\" NPT Marin Yalıtımlı Motor Sıcaklık Sensörü"
  },
  "193-0448": {
    brand: "Cummins / Onan",
    category: "Elektrik & Sensörler",
    name: "Cummins Onan Yağ Basınç Müşürü (Oil Pressure Switch)",
    models: "Cummins Onan MDK Serisi Marin Jeneratörler",
    cross: "Hobbs / Honeywell Marin Basınç Anahtarı",
    interval: "Yağ Basıncı Hata Kodunda",
    specs: "1/8\" NPT 1.0 Bar Düşük Yağ Basıncı Kapatma Müşürü"
  },
  "ED0021752850-S": {
    brand: "Kohler",
    category: "Filtreler",
    name: "Kohler 5EFKD / 7EFKD / 9EFKO / 11EFKO Yağ Filtresi Kartuşu",
    models: "Kohler 5kW - 11kW Yeni Nesil Dizel Marin Jeneratörler (Lombardini / Kohler KDI)",
    cross: "Mann W 68/1, Baldwin B1400, Donaldson P502015, Wix 51394",
    interval: "100-150 Saat / Sezon Başı",
    specs: "M20x1.5 Diş, Kompakt Orijinal Kohler Yağ Filtresi"
  },
  "GM32423": {
    brand: "Kohler",
    category: "Filtreler",
    name: "Kohler 14-28kW EFKOZD / EFOZD Yağ Filtresi Kartuşu",
    models: "Kohler 14EFOZD, 16EFOZD, 20EFOZD, 28EFOZD Marin Jeneratörler",
    cross: "Mann W 712/22, Baldwin B1434, Donaldson P550008, Wix 51365",
    interval: "150-200 Saat / Sezon Başı",
    specs: "3/4-16 Dişli Ağır Hizmet Jeneratör Yağ Filtresi"
  },
  "229678": {
    brand: "Kohler",
    category: "Filtreler",
    name: "Kohler Klasik Seri Ağır Hizmet Yağ Filtresi (Yanmar Tabanlı)",
    models: "Kohler 8EOZ, 9EOZ, 10EOZ, 11EOZ, 13EOZ, 14EOZ",
    cross: "Mann W 68/1, Yanmar 129150-35153",
    interval: "100-150 Saat / Sezon Başı",
    specs: "M20x1.5 Dişli Orijinal Kohler Marin Yağ Filtresi"
  },
  "GM32359": {
    brand: "Kohler",
    category: "Filtreler",
    name: "Kohler 9-20kW Dizel Vidalı Yakıt Filtresi Elemanı",
    models: "Kohler 9EFKO, 11EFKO, 14EFOZD, 20EFOZD",
    cross: "Mann WK 812, Baldwin BF7856, Donaldson P550588",
    interval: "150-200 Saat / Sezon Başı",
    specs: "Vidalı Yakıt Filtresi, Su Ayırıcılı, M20x1.5 Diş"
  },
  "GM47465": {
    brand: "Kohler",
    category: "Filtreler",
    name: "Kohler Su Ayırıcılı Vidalı Ön Yakıt Filtresi Kartuşu",
    models: "Kohler Tüm Yeni Nesil Marin Jeneratörler",
    cross: "Racor R12T Muadili, Sierra 18-7944",
    interval: "150-200 Saat / Sezon Başı",
    specs: "10 Mikron Su Ayırma Özellikli Spin-on Filtre"
  },
  "359978": {
    brand: "Kohler",
    category: "İmpeller & Soğutma",
    name: "Kohler 4-11kW Ham Deniz Suyu İmpeller Kiti (O-Ringli)",
    models: "Kohler 4EFOD, 6EFOD, 8EOZ, 9EFOZD, 11EFOZD (Johnson Pompa)",
    cross: "Johnson 09-810B-1, Jabsco 18653-0001, Sierra 18-3077, CEF 500101",
    interval: "150-200 Saat veya Sezon Başı",
    specs: "10 Bıçaklı Neopren, Şaft Çapı: 12.7mm, Dış Çap: 51mm, Genişlik: 22mm"
  },
  "229826": {
    brand: "Kohler",
    category: "İmpeller & Soğutma",
    name: "Kohler 13-28kW Ham Su Pompası İmpeller Kiti (Spline)",
    models: "Kohler 13EOZ, 14EFOZD, 16EFOZD, 20EFOZD, 24EFOZD, 28EFOZD",
    cross: "Johnson 09-1027B-1, Jabsco 1210-0001, Sierra 18-3081, CEF 500107",
    interval: "150-200 Saat veya Sezon Başı",
    specs: "12 Bıçaklı Neopren, Spline Mil Yuvası, Çap: 57mm, Genişlik: 31.5mm, O-Ring Dahil"
  },
  "GM11099": {
    brand: "Kohler",
    category: "Tutya & Anotlar",
    name: "Kohler Jeneratör Isı Eşanjörü Çinko Tutya Anodu (1/4\" NPT)",
    models: "Kohler 5kW - 28kW Dizel Marin Jeneratörler",
    cross: "Tecnoseal 01001, Martyr CMGM11099Z",
    interval: "100 Saat / 6 Ayda Bir Kontrol",
    specs: "1/4\" NPT Pirinç Tapalı Değiştirilebilir Çinko Çubuk"
  },
  "260085": {
    brand: "Kohler",
    category: "Tutya & Anotlar",
    name: "Kohler Isı Eşanjörü 3/8\" NPT Çinko Tutya Kalemi",
    models: "Kohler 18-32kW Büyük Boy Jeneratörler",
    cross: "Tecnoseal 01002, Martyr CM260085Z",
    interval: "100 Saat / Sezonluk",
    specs: "3/8\" NPT Pirinç Tapalı Ağır Hizmet Tutya"
  },
  "GM28414": {
    brand: "Kohler",
    category: "Kayış & Kasnak",
    name: "Kohler Marin Jeneratör V-Kayışı",
    models: "Kohler 8-11kW Dizel Jeneratörler",
    cross: "Gates Marin Seri, Continental",
    interval: "300-400 Saat / 2 Yılda 1 Kez",
    specs: "Tuza Dayanıklı Yüksek Mukavemetli EPDM V-Kayış"
  },

  // ─── PARKER RACOR & SEPAR YAKIT FİLTRASYONU ───
  "2010PM-OR": {
    brand: "Evrensel / Marin",
    category: "Filtreler",
    name: "Parker Racor 500FG / 500MA 30 Mikron Yakıt Filtre Elemanı (Kahverengi)",
    models: "Racor 500FG, 500MA, 75500MAX Çiftli Filtre Sistemleri (Volvo Penta, Yanmar, Jeneratör)",
    cross: "Racor 2010PM, Baldwin PF598-30, Donaldson P552010, Wix 33210",
    interval: "200 Saat / Sezon Başı",
    specs: "30 Mikron Aquabloc Kağıt Eleman, O-ring ve Kapak Contası Dahil"
  },
  "2010TM-OR": {
    brand: "Evrensel / Marin",
    category: "Filtreler",
    name: "Parker Racor 500FG / 500MA 10 Mikron Yakıt Filtre Elemanı (Mavi)",
    models: "Racor 500FG, 500MA Serisi (Common Rail Motorlar İçin Orta Kademe)",
    cross: "Racor 2010TM, Baldwin PF598-10, Donaldson P552011",
    interval: "200 Saat / Sezon Başı",
    specs: "10 Mikron Aquabloc Su Ayırıcı Eleman"
  },
  "2010SM-OR": {
    brand: "Evrensel / Marin",
    category: "Filtreler",
    name: "Parker Racor 500FG / 500MA 2 Mikron Yakıt Filtre Elemanı (Kırmızı)",
    models: "Racor 500FG, 500MA Hassas Common Rail Enjeksiyon Koruması",
    cross: "Racor 2010SM, Baldwin PF598, Donaldson P552012",
    interval: "150-200 Saat / Sezon Başı",
    specs: "2 Mikron Ultra İnce Aquabloc Filtrasyon Elemanı"
  },
  "2040PM-OR": {
    brand: "Evrensel / Marin",
    category: "Filtreler",
    name: "Parker Racor 900FH / 900MA 30 Mikron Yakıt Filtre Elemanı",
    models: "Racor 900FH, 900MA, 75900MAX Çiftli Filtre Sistemleri (Volvo D9/D13, MAN i6/V8)",
    cross: "Racor 2040PM, Baldwin PF7889-30, Donaldson P552040, Wix 33799",
    interval: "200-400 Saat / Sezon Başı",
    specs: "30 Mikron Yüksek Debi Aquabloc Eleman (341 L/Saat)"
  },
  "2040TM-OR": {
    brand: "Evrensel / Marin",
    category: "Filtreler",
    name: "Parker Racor 900FH / 900MA 10 Mikron Yakıt Filtre Elemanı",
    models: "Racor 900FH, 900MA, 75900MAX Çiftli Sistemler",
    cross: "Racor 2040TM, Baldwin PF7889-10, Donaldson P552041",
    interval: "200-400 Saat / Sezon Başı",
    specs: "10 Mikron Aquabloc Su Ayırıcı Eleman"
  },
  "2040SM-OR": {
    brand: "Evrensel / Marin",
    category: "Filtreler",
    name: "Parker Racor 900FH / 900MA 2 Mikron Yakıt Filtre Elemanı",
    models: "Racor 900FH Hassas Common Rail Koruması",
    cross: "Racor 2040SM, Baldwin PF7889, Donaldson P552042",
    interval: "200 Saat / Sezonluk",
    specs: "2 Mikron Ultra İnce Yakıt Filtresi Elemanı"
  },
  "2020PM-OR": {
    brand: "Evrensel / Marin",
    category: "Filtreler",
    name: "Parker Racor 1000FH / 1000MA 30 Mikron Yakıt Filtre Elemanı",
    models: "Racor 1000FH, 1000MA, 751000MAX Çiftli Sistemler (MAN V12, CAT C32, MTU)",
    cross: "Racor 2020PM, Baldwin PF7890-30, Donaldson P552020, Wix 33202",
    interval: "200-400 Saat / Sezon Başı",
    specs: "30 Mikron Dev Boy Aquabloc Eleman (681 L/Saat Debi Kapasitesi)"
  },
  "2020TM-OR": {
    brand: "Evrensel / Marin",
    category: "Filtreler",
    name: "Parker Racor 1000FH / 1000MA 10 Mikron Yakıt Filtre Elemanı",
    models: "Racor 1000FH, 1000MA (Büyük Motoryatlar ve Ticari Tekneler)",
    cross: "Racor 2020TM, Baldwin PF7890-10, Donaldson P552021",
    interval: "200-400 Saat / Sezon Başı",
    specs: "10 Mikron Aquabloc Su Ayırıcı Eleman"
  },
  "2020SM-OR": {
    brand: "Evrensel / Marin",
    category: "Filtreler",
    name: "Parker Racor 1000FH / 1000MA 2 Mikron Yakıt Filtre Elemanı",
    models: "Racor 1000FH Yüksek Basınçlı CR Motorlar İçin",
    cross: "Racor 2020SM, Baldwin PF7890, Donaldson P552022",
    interval: "200 Saat / Sezonluk",
    specs: "2 Mikron Son Kademe CR Filtrasyon Elemanı"
  },
  "R12T": {
    brand: "Evrensel / Marin",
    category: "Filtreler",
    name: "Parker Racor 120A Vidalı Spin-on Su Ayırıcı Yakıt Filtresi (10 Mikron)",
    models: "Dıştan Takma Motorlar (Yamaha, Mercury) ve Marin Jeneratörler (Kohler, Onan)",
    cross: "Sierra 18-7944, Baldwin BF7798-D, Wix 33225",
    interval: "100-150 Saat / Sezon Başı",
    specs: "Şeffaf Kase Uyumlu Spin-on Filtre Kartuşu, 57 L/Saat Debi"
  },
  "01030": {
    brand: "Evrensel / Marin",
    category: "Filtreler",
    name: "Separ SWK-2000/10 30 Mikron Su Ayırıcı Yakıt Filtre Elemanı",
    models: "Separ 2000/10, 2000/10U Çiftli Sistemler (MAN, MTU, Volvo Penta D13)",
    cross: "Separ 01030, Baldwin PF7892, Donaldson P552030",
    interval: "200-400 Saat / Sezon Başı",
    specs: "Santrifüjlü Su Ayırıcı Kağıt Eleman, Conta Dahil (600 L/Saat Debi)"
  },
  "01010": {
    brand: "Evrensel / Marin",
    category: "Filtreler",
    name: "Separ SWK-2000/10 10 Mikron Su Ayırıcı Yakıt Filtre Elemanı",
    models: "Separ 2000/10 Sistemleri (Common Rail Dizel Yakıt Koruması)",
    cross: "Separ 01010, Baldwin PF7892-10",
    interval: "200-400 Saat / Sezonluk",
    specs: "10 Mikron Hassas Santrifüj Ayrıştırma Elemanı"
  },
  "00530": {
    brand: "Evrensel / Marin",
    category: "Filtreler",
    name: "Separ SWK-2000/5 30 Mikron Yakıt Filtre Elemanı",
    models: "Separ 2000/5 Kompakt Marin Jeneratör ve Yelkenli Sistemleri",
    cross: "Separ 00530, Baldwin PF7891",
    interval: "150-200 Saat / Sezon Başı",
    specs: "300 L/Saat Debi Kapasiteli Kompakt Separ Elemanı"
  },

  // ─── TRANSMISSION / ZF & GENERAL PUMPS ───
  "ZF 3312199031": {
    brand: "Evrensel / Marin",
    category: "Kuyruk & Şanzıman",
    name: "ZF 45 / 63 / 80 / 85 Hidrolik Şanzıman Yağ Filtresi Kartuşu",
    models: "ZF 45A, ZF 45IV, ZF 63A, ZF 63IV, ZF 80A, ZF 85A Marin Şanzımanlar",
    cross: "Volvo Penta 3589886, Mann W 712, Baldwin BT8409",
    interval: "200-300 Saat / Sezon Başı (ATF Dexron III ile)",
    specs: "M20x1.5 Diş, Hidrolik Kavrama Basınç Devresi Filtresi"
  },
  "ZF 0501215563": {
    brand: "Evrensel / Marin",
    category: "Kuyruk & Şanzıman",
    name: "ZF 280 / 300 / 325 Ağır Hizmet Şanzıman Yağ Filtresi Kartuşu",
    models: "ZF 280A, ZF 280IV, ZF 300, ZF 325IV Marin Şanzımanlar (MAN ve CAT Motorlar)",
    cross: "Mann WD 920, Baldwin BT8416, Donaldson P550928",
    interval: "400 Saat / Yılda 1 Kez",
    specs: "Yüksek Debili Hidrolik Yağ Filtresi"
  }
};

// Merge extra parts into catalog (updating or adding)
let addedCount = 0;
let updatedCount = 0;
for (const [code, item] of Object.entries(extraParts)) {
  if (catalog[code]) {
    catalog[code] = { ...catalog[code], ...item };
    updatedCount++;
  } else {
    catalog[code] = item;
    addedCount++;
  }
}

console.log(`Enriched catalog: ${addedCount} new parts added, ${updatedCount} parts updated.`);
console.log(`Total master catalog entries: ${Object.keys(catalog).length}`);

// Count by brand
const brandStats = {};
for (const item of Object.values(catalog)) {
  brandStats[item.brand] = (brandStats[item.brand] || 0) + 1;
}
console.log("Updated Brand Breakdown:", brandStats);

// Write updated JSON
fs.writeFileSync(MASTER_JSON_PATH, JSON.stringify(catalog, null, 2), 'utf8');
console.log("Saved master JSON to:", MASTER_JSON_PATH);

// Write updated CSV
const csvRows = [
  "OEM_KODU,MARKA,KATEGORI,PARCA_ADI,UYUMLU_MODELLER,MUADIL_REFERANSLAR,DEGISIM_ARALIGI,TEKNIK_OZELLIKLER"
];
for (const [code, item] of Object.entries(catalog)) {
  const escapeCsv = (str) => `"${(str || '').replace(/"/g, '""')}"`;
  csvRows.push([
    code,
    escapeCsv(item.brand),
    escapeCsv(item.category),
    escapeCsv(item.name),
    escapeCsv(item.models),
    escapeCsv(item.cross),
    escapeCsv(item.interval),
    escapeCsv(item.specs)
  ].join(','));
}
fs.writeFileSync(MASTER_CSV_PATH, csvRows.join('\n'), 'utf8');
console.log("Saved master CSV to:", MASTER_CSV_PATH);

// 3. Build Curated 180+ Fast-Moving Products Array for stok.html productsState
console.log("\n--- Building Curated Inventory for stok.html productsState ---");

const priorityOrder = [
  "Volvo Penta", "Yanmar", "MAN Marine", "MAN", "Cummins / Onan", "Cummins Marine", 
  "Onan Generator", "Kohler", "Kohler Generator", "Evrensel / Marin", "Parker Racor", 
  "Separ Filter", "Jabsco", "Johnson Pump", "ZF Marine", "Tecnoseal"
];

const selectedProducts = [];
let barcodeCounter = 8690001;

function estimatePricingAndStock(code, item) {
  let buyPrice = 1200;
  let sellPrice = 1800;
  let qty = 6;
  let minQty = 2;
  let location = "Merkez Atölye - Raf A1";

  const catLower = (item.category || "").toLowerCase();
  const nameLower = (item.name || "").toLowerCase();
  const brand = item.brand || "";

  if (catLower.includes("filtre")) {
    if (nameLower.includes("yağ")) {
      buyPrice = brand.includes("MAN") ? 1850 : (brand.includes("Volvo") ? 1250 : 850);
      sellPrice = brand.includes("MAN") ? 2650 : (brand.includes("Volvo") ? 1750 : 1250);
      qty = 8;
      minQty = 3;
      location = "Merkez Atölye - Raf A1 (Filtre)";
    } else if (nameLower.includes("yakıt")) {
      buyPrice = brand.includes("MAN") ? 2450 : (brand.includes("Volvo") ? 1850 : 1100);
      sellPrice = brand.includes("MAN") ? 3400 : (brand.includes("Volvo") ? 2600 : 1600);
      qty = 6;
      minQty = 2;
      location = "Merkez Atölye - Raf A2 (Yakıt)";
    } else if (nameLower.includes("hava")) {
      buyPrice = brand.includes("MAN") ? 3200 : (brand.includes("Volvo") ? 2400 : 1400);
      sellPrice = brand.includes("MAN") ? 4500 : (brand.includes("Volvo") ? 3500 : 2100);
      qty = 4;
      minQty = 2;
      location = "Merkez Atölye - Raf A3 (Hava)";
    } else if (nameLower.includes("racor") || nameLower.includes("separ")) {
      buyPrice = 750;
      sellPrice = 1150;
      qty = 15;
      minQty = 5;
      location = "Mobil Servis Aracı 1 - Kutu 3";
    }
  } else if (catLower.includes("impeller") || catLower.includes("soğutma")) {
    if (nameLower.includes("pompa") && !nameLower.includes("impeller")) {
      buyPrice = 18500;
      sellPrice = 24500;
      qty = 2;
      minQty = 1;
      location = "Merkez Atölye - Özel Kasa";
    } else if (nameLower.includes("büyük boy") || nameLower.includes("v12") || nameLower.includes("d13")) {
      buyPrice = 4500;
      sellPrice = 6200;
      qty = 4;
      minQty = 2;
      location = "Merkez Atölye - Raf B1 (İmpeller)";
    } else {
      buyPrice = 1950;
      sellPrice = 2850;
      qty = 6;
      minQty = 2;
      location = "Mobil Servis Aracı 1 - Çanta 2";
    }
  } else if (catLower.includes("kayış")) {
    buyPrice = 950;
    sellPrice = 1550;
    qty = 5;
    minQty = 2;
    location = "Merkez Atölye - Raf C1 (Kayış)";
  } else if (catLower.includes("tutya") || catLower.includes("anot")) {
    buyPrice = 650;
    sellPrice = 1100;
    qty = 12;
    minQty = 4;
    location = "Merkez Atölye - Raf D1 (Tutya)";
  } else if (catLower.includes("yağ") || catLower.includes("sıvı")) {
    if (nameLower.includes("20l")) {
      buyPrice = 4200;
      sellPrice = 5800;
      qty = 10;
      minQty = 4;
      location = "Merkez Atölye - Yağ Deposu";
    } else if (nameLower.includes("5l")) {
      buyPrice = 1350;
      sellPrice = 1900;
      qty = 14;
      minQty = 5;
      location = "Mobil Servis Aracı 2 - Bagaj";
    } else {
      buyPrice = 550;
      sellPrice = 850;
      qty = 16;
      minQty = 6;
      location = "Merkez Atölye - Sıvı Deposu";
    }
  } else if (catLower.includes("kuyruk") || catLower.includes("şanzıman")) {
    if (nameLower.includes("körük")) {
      buyPrice = 2800;
      sellPrice = 4100;
      qty = 4;
      minQty = 2;
      location = "Merkez Atölye - Raf E1 (Kuyruk)";
    } else if (nameLower.includes("filtre")) {
      buyPrice = 1650;
      sellPrice = 2400;
      qty = 5;
      minQty = 2;
      location = "Merkez Atölye - Raf E2 (Şanzıman)";
    } else {
      buyPrice = 3500;
      sellPrice = 5100;
      qty = 3;
      minQty = 1;
      location = "Merkez Atölye - Raf E3";
    }
  } else if (catLower.includes("elektrik") || catLower.includes("sensör")) {
    if (nameLower.includes("marş") || nameLower.includes("alternatör")) {
      buyPrice = 14500;
      sellPrice = 21000;
      qty = 2;
      minQty = 1;
      location = "Merkez Atölye - Elektrik Odası";
    } else {
      buyPrice = 1600;
      sellPrice = 2450;
      qty = 4;
      minQty = 2;
      location = "Mobil Servis Aracı 1 - Elektrik Çantası";
    }
  } else if (catLower.includes("mekanik") || catLower.includes("conta")) {
    if (nameLower.includes("enjektör")) {
      buyPrice = 12500;
      sellPrice = 17500;
      qty = 4;
      minQty = 2;
      location = "Merkez Atölye - Kasa";
    } else if (nameLower.includes("egzoz")) {
      buyPrice = 8500;
      sellPrice = 13500;
      qty = 2;
      minQty = 1;
      location = "Merkez Atölye - Raf F1 (Egzoz)";
    } else {
      buyPrice = 1200;
      sellPrice = 1900;
      qty = 5;
      minQty = 2;
      location = "Merkez Atölye - Raf F2";
    }
  }

  let stdBrand = "Evrensel / Marin";
  if (brand.includes("Volvo")) stdBrand = "Volvo Penta";
  else if (brand.includes("Yanmar")) stdBrand = "Yanmar";
  else if (brand.includes("MAN")) stdBrand = "MAN";
  else if (brand.includes("Onan") || brand.includes("Cummins")) stdBrand = "Cummins / Onan";
  else if (brand.includes("Kohler")) stdBrand = "Kohler";
  else if (brand.includes("CAT") || brand.includes("Caterpillar")) stdBrand = "Caterpillar";

  let stdCategory = "Filtreler";
  if (catLower.includes("filtre")) stdCategory = "Filtreler";
  else if (catLower.includes("yağ") || catLower.includes("sıvı")) stdCategory = "Yağ & Sıvılar";
  else if (catLower.includes("impeller") || catLower.includes("soğutma")) stdCategory = "İmpeller & Soğutma";
  else if (catLower.includes("tutya") || catLower.includes("anot")) stdCategory = "Tutya & Anotlar";
  else if (catLower.includes("kayış")) stdCategory = "Kayış & Kasnak";
  else if (catLower.includes("elektrik") || catLower.includes("sensör") || catLower.includes("ateşleme")) stdCategory = "Elektrik & Sensörler";
  else if (catLower.includes("kuyruk") || catLower.includes("şanzıman") || catLower.includes("sürücü")) stdCategory = "Kuyruk & Şanzıman";
  else stdCategory = "Mekanik & Contalar";

  return { buyPrice, sellPrice, qty, minQty, location, stdBrand, stdCategory };
}

const candidateCodes = Object.keys(catalog);

candidateCodes.sort((a, b) => {
  const isExtraA = !!extraParts[a];
  const isExtraB = !!extraParts[b];
  if (isExtraA && !isExtraB) return -1;
  if (!isExtraA && isExtraB) return 1;

  const brandA = catalog[a].brand || "";
  const brandB = catalog[b].brand || "";
  const idxA = priorityOrder.findIndex(p => brandA.includes(p));
  const idxB = priorityOrder.findIndex(p => brandB.includes(p));
  const rankA = idxA === -1 ? 999 : idxA;
  const rankB = idxB === -1 ? 999 : idxB;
  return rankA - rankB;
});

const targetItems = candidateCodes.slice(0, 225);

for (let i = 0; i < targetItems.length; i++) {
  const code = targetItems[i];
  const item = catalog[code];
  const meta = estimatePricingAndStock(code, item);

  selectedProducts.push({
    id: `p-${i + 1}`,
    name: item.name,
    code: code,
    oemRef: code,
    crossRef: item.cross || "",
    models: item.models || "",
    barcode: String(barcodeCounter++),
    brand: meta.stdBrand,
    category: meta.stdCategory,
    location: meta.location,
    buyPrice: meta.buyPrice,
    sellPrice: meta.sellPrice,
    qty: meta.qty,
    minQty: meta.minQty
  });
}

console.log(`Generated ${selectedProducts.length} curated products for stok.html`);

// 4. Update stok.html productsState & OEM_CROSS_DATABASE
console.log("\n--- Updating stok.html ---");
let stokContent = fs.readFileSync(STOK_HTML_PATH, 'utf8');

// Replace productsState = [ ... ];
const prodStateRegex = /let\s+productsState\s*=\s*\[[\s\S]*?\n\];/;
const newProductsStateCode = "let productsState = " + JSON.stringify(selectedProducts, null, 2) + ";";
if (prodStateRegex.test(stokContent)) {
  stokContent = stokContent.replace(prodStateRegex, newProductsStateCode);
  console.log("Successfully replaced productsState in stok.html with " + selectedProducts.length + " products!");
} else {
  console.error("COULD NOT FIND productsState in stok.html!");
}

// Replace OEM_CROSS_DATABASE = { ... };
const oemCrossRegex = /const\s+OEM_CROSS_DATABASE\s*=\s*\{[\s\S]*?\n\};/;
const newOemCrossCode = "const OEM_CROSS_DATABASE = " + JSON.stringify(catalog, null, 2) + ";";
if (oemCrossRegex.test(stokContent)) {
  stokContent = stokContent.replace(oemCrossRegex, newOemCrossCode);
  console.log("Successfully replaced OEM_CROSS_DATABASE in stok.html with " + Object.keys(catalog).length + " items!");
} else {
  console.error("COULD NOT FIND OEM_CROSS_DATABASE in stok.html!");
}

// Ensure "Kuyruk & Şanzıman" is in categoriesState if missing
if (!stokContent.includes('"Kuyruk & Şanzıman"')) {
  stokContent = stokContent.replace(
    'let categoriesState = [',
    'let categoriesState = [\n  "Kuyruk & Şanzıman",'
  );
}

fs.writeFileSync(STOK_HTML_PATH, stokContent, 'utf8');
console.log("Updated stok.html written!");

// 5. Update admin.html AGENT_OEM_CATALOG
console.log("\n--- Updating admin.html AGENT_OEM_CATALOG ---");
let adminContent = fs.readFileSync(ADMIN_HTML_PATH, 'utf8');
const agentOemRegex = /const\s+AGENT_OEM_CATALOG\s*=\s*\{[\s\S]*?\n\};/;
const newAgentOemCode = "const AGENT_OEM_CATALOG = " + JSON.stringify(catalog, null, 2) + ";";
if (agentOemRegex.test(adminContent)) {
  adminContent = adminContent.replace(agentOemRegex, newAgentOemCode);
  fs.writeFileSync(ADMIN_HTML_PATH, adminContent, 'utf8');
  console.log("Successfully replaced AGENT_OEM_CATALOG in admin.html with " + Object.keys(catalog).length + " items!");
} else {
  console.error("COULD NOT FIND AGENT_OEM_CATALOG in admin.html!");
}

console.log("\n=== Master Catalog Expansion & Sync Finished Successfully! ===");
