const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const MASTER_JSON_PATH = path.join(ROOT_DIR, 'assets/data/dm_marin_master_oem_catalog.json');
const MASTER_CSV_PATH = path.join(ROOT_DIR, 'assets/data/dm_marin_master_oem_catalog.csv');
const STOK_HTML_PATH = path.join(ROOT_DIR, 'stok.html');
const ADMIN_HTML_PATH = path.join(ROOT_DIR, 'admin.html');

let catalog = JSON.parse(fs.readFileSync(MASTER_JSON_PATH, 'utf8'));

const additionalBrandParts = {
  // ─── VOLVO PENTA (Ek 30+ Gerçek OEM Parça) ───
  "3841110": {
    brand: "Volvo Penta",
    category: "Mekanik & Contalar",
    name: "Volvo Penta D4 / D6 Blok & Soğutma Devresi Su Tahliye Tapası",
    models: "Volvo Penta D4, D6, D8, D11, D13 Kışlama ve Drenaj Sistemleri",
    cross: "Volvo Penta 3841110, Sierra 18-4228",
    interval: "Kışlama ve Sezon Bakımında",
    specs: "Pirinç Gövdeli O-ringli Hızlı Tahliye Tapası (Kışlama Koruma)"
  },
  "3584145": {
    brand: "Volvo Penta",
    category: "Mekanik & Contalar",
    name: "Volvo Penta D4 / D6 Döküm Egzoz Karışım Dirseği (Exhaust Elbow)",
    models: "Volvo Penta D4-225/260/300, D6-310/370/435 (Kuyruk ve Şaftlı Modeller)",
    cross: "HDI Marine VPF4, Orbitrade 15145, Sierra 18-0422",
    interval: "3-4 Yılda 1 Kontrol / Karbon Tıkanması veya Çatlak Halinde",
    specs: "Korozyona Dayanıklı Ni-Resist Döküm, Dahili Su Enjeksiyon Ceketi, Conta Dahil"
  },
  "3884145": {
    brand: "Volvo Penta",
    category: "Mekanik & Contalar",
    name: "Volvo Penta D4 / D6 Paslanmaz Çelik 316L Egzoz Dirsek Kiti",
    models: "Volvo Penta D4, D6 Serisi Tüm Güç Grupları",
    cross: "HDI Marine VPF4-SS, DM Marine Özel Seri",
    interval: "Ömürlük / 5 Yılda 1 Sezon Başı Kontrol",
    specs: "316L Paslanmaz Çelikten Hassas Kaynaklı, Paslanmaz ve Kireç Tutmaz"
  },
  "3807900": {
    brand: "Volvo Penta",
    category: "İmpeller & Soğutma",
    name: "Volvo Penta D4 / D6 Deniz Suyu Pompası Aşınma Plakası (Wear Plate)",
    models: "Volvo Penta D4 & D6 Johnson F7B Deniz Pompaları",
    cross: "Johnson 01-46744, Orbitrade 15900",
    interval: "İmpeller Aşınmasında / 400 Saatte 1",
    specs: "Hassas Taşlanmış Marin Bronz Aşınma Pulu"
  },
  "3807901": {
    brand: "Volvo Penta",
    category: "İmpeller & Soğutma",
    name: "Volvo Penta D4 / D6 Deniz Suyu Pompası Kamı (Cam Plate)",
    models: "Volvo Penta D4 & D6 F7B Pompa Serisi",
    cross: "Johnson 01-46745, Orbitrade 15901",
    interval: "Pompa Basınç Düşüklüğünde",
    specs: "Bronz Kam Parçası, Sabitleme Vidası Dahil"
  },
  "854409": {
    brand: "Volvo Penta",
    category: "Kuyruk & Şanzıman",
    name: "Volvo Penta 280 / 290 Egzoz Flap Valfi (Exhaust Water Shutter)",
    models: "Volvo Penta 280, 290, SP, DP Kuyruk Sistemleri",
    cross: "Sierra 18-2727, GLM 89130, Mallory 9-72800",
    interval: "Her Kuyruk Bakımında / 2 Yılda 1",
    specs: "Geri Dönen Su Darbesini Önleyen Paslanmaz Pimli Kauçuk Flap"
  },
  "3855516": {
    brand: "Volvo Penta",
    category: "Kuyruk & Şanzıman",
    name: "Volvo Penta SX / DPS Transom Gimbal Halka Kiti",
    models: "Volvo Penta SX-M, SX-A, DPS-A, DPS-B",
    cross: "Sierra 18-2165, Volvo Penta Orijinal",
    interval: "Boşluk / Titreşim Halinde",
    specs: "Ayna Yönlendirme ve Gimbal Taşıyıcı Alüminyum Halka"
  },
  "3852560": {
    brand: "Volvo Penta",
    category: "Kuyruk & Şanzıman",
    name: "Volvo Penta SX / DPS Pervane Tahrik Şaftı Keçesi",
    models: "Volvo Penta SX, DPS-A Kuyruk Sistemleri",
    cross: "Sierra 18-0579, Orbitrade 15560",
    interval: "Her Yağ Değişiminde Kontrol / Su Kaçağında",
    specs: "Paslanmaz Yaylı Çift Dudaklı Nitril Kuyruk Keçesi"
  },
  "3887020": {
    brand: "Volvo Penta",
    category: "Kuyruk & Şanzıman",
    name: "Volvo Penta DPS-A / DPS-B Şaft Keçe Kiti (Inner & Outer Seal)",
    models: "Volvo Penta DPS-A, DPS-B Duoprop Kuyruklar",
    cross: "Volvo Penta 3887020, Orbitrade 15020",
    interval: "Kuyruk Yağına Su Karıştığında / 2 Sezonda 1",
    specs: "İç ve Dış Pervane Şaftı Yüksek Basınç Çiftli Yağ Keçesi Seti"
  },
  "3860842": {
    brand: "Volvo Penta",
    category: "Tutya & Anotlar",
    name: "Volvo Penta D4 / D6 Yakıt Soğutucu Eşanjör Çinko Anodu",
    models: "Volvo Penta D4 ve D6 Serisi Dizel Motorlar",
    cross: "Tecnoseal 00729, Martyr CM3860842Z",
    interval: "100-150 Saat / Sezon Başı Kontrol",
    specs: "1/4\" NPT Pirinç Tapalı Çinko Çubuk Anot"
  },
  "3888324": {
    brand: "Volvo Penta",
    category: "Elektrik & Sensörler",
    name: "Volvo Penta D4 / D6 Hararet Müşürü & Soğutma Sıcaklık Sensörü",
    models: "Volvo Penta D4-180..300, D6-280..435, D3 (EVC Sistemleri)",
    cross: "Volvo Penta 3888324, Bosch Sensör",
    interval: "Hatalı Sıcaklık Değerinde / EVC Hararet Alarmında",
    specs: "M12x1.5 Dişli Hassas NTC Dirençli EVC Motor Sıcaklık Sensörü"
  },
  "3857532": {
    brand: "Volvo Penta",
    category: "Elektrik & Sensörler",
    name: "Volvo Penta D4 / D6 Motor Yağ Basınç Müşürü (0-7 Bar Transducer)",
    models: "Volvo Penta D4 ve D6 EVC-B, EVC-C, EVC-D, EVC-E",
    cross: "Volvo Penta 3857532, VDO Marin",
    interval: "Düşük Yağ Basıncı Hata Kodunda",
    specs: "0-7 Bar Analog / Dijital Dönüştürücülü Hassas Yağ Basınç Sensörü"
  },
  "3843750": {
    brand: "Volvo Penta",
    category: "Elektrik & Sensörler",
    name: "Volvo Penta D4 / D6 Krank Mili Devir Sensörü (Crankshaft Position)",
    models: "Volvo Penta D4-225..300, D6-310..435",
    cross: "Bosch 0281002410, Volvo 3843750",
    interval: "Geç Çalışma / Stop Etme / Arıza Kodunda",
    specs: "Manyetik Endüktif Krank Pozisyon Sensörü, O-ring Dahil"
  },
  "3843751": {
    brand: "Volvo Penta",
    category: "Elektrik & Sensörler",
    name: "Volvo Penta D4 / D6 Eksantrik Mili Faz Sensörü (Camshaft Sensor)",
    models: "Volvo Penta D4 ve D6 EVC Serileri",
    cross: "Bosch 0281002411, Volvo 3843751",
    interval: "Senkronizasyon Hatasında",
    specs: "Hall-Effect Hassas Eksantrik Konum Algılayıcı"
  },
  "3840897": {
    brand: "Volvo Penta",
    category: "Elektrik & Sensörler",
    name: "Volvo Penta D4 / D6 Turbo Emiş Manifold Basınç Sensörü (MAP / Boost)",
    models: "Volvo Penta D4-260..300, D6-310..435 Kompresörlü & Turbolu Motorlar",
    cross: "Bosch 0281002593, Volvo 3840897",
    interval: "Turbo Çekiş Düşüklüğünde / Siyah Dumanda",
    specs: "0-4 Bar Mutlak Basınç ve Emiş Hava Sıcaklık Kombine Sensörü"
  },
  "21634021": {
    brand: "Volvo Penta",
    category: "Elektrik & Sensörler",
    name: "Volvo Penta D4 / D6 Common Rail Yakıt Kütük Basınç Sensörü (Rail Pressure)",
    models: "Volvo Penta D4, D6, D8, D11 Common Rail Sistemleri",
    cross: "Bosch 0281002930, Volvo 21634021",
    interval: "Yakıt Basınç Alarmında / Tekleme Arızasında",
    specs: "2000 Bar Dayanımlı Piezoelektrik Common Rail Kütük Sensörü"
  },
  "21634024": {
    brand: "Volvo Penta",
    category: "Elektrik & Sensörler",
    name: "Volvo Penta D4 / D6 Yüksek Basınç CP3 Pompası Yakıt Ölçüm Valfi (SCV/MPROP)",
    models: "Volvo Penta D4-225..300, D6-310..435 Bosch CP3.3 Pompalar",
    cross: "Bosch 0928400666, Volvo 21634024",
    interval: "Rölanti Dalgalanması / Yüksek Basınç Düşmesinde",
    specs: "Darbe Genişlik Modülasyonlu (PWM) Yakıt Basınç Regülasyon Solenoidi"
  },
  "21426987": {
    brand: "Volvo Penta",
    category: "Elektrik & Sensörler",
    name: "Volvo Penta D4 / D6 Marin Alternatör 12V 115A (Mitsubishi Orijinal)",
    models: "Volvo Penta D4-180..300, D6-280..435 12V Elektrik Sistemleri",
    cross: "Mitsubishi A003TR0093, Volvo 21426987, Arco 60115",
    interval: "1000 Saat Bakımı / Şarj Lambası Yandığında",
    specs: "12V 115A, Dahili Akıllı Voltaj Regülatörlü, Çift Yalıtımlı Marin Alternatör"
  },
  "21426988": {
    brand: "Volvo Penta",
    category: "Elektrik & Sensörler",
    name: "Volvo Penta D4 / D6 Marin Alternatör 24V 80A (24V Tekne Sistemleri)",
    models: "Volvo Penta D4 ve D6 24V Donanımlı Motoryatlar",
    cross: "Mitsubishi A004TR0094, Volvo 21426988",
    interval: "1000 Saat Bakımı",
    specs: "24V 80 Amper Ağır Hizmet Marin Şarj Dinamosu"
  },
  "3803940": {
    brand: "Volvo Penta",
    category: "Elektrik & Sensörler",
    name: "Volvo Penta D4 / D6 Marin Marş Motoru 12V 3.0kW (Denso Tip)",
    models: "Volvo Penta D4-180..300, D6-280..435 Tüm Yıllar",
    cross: "Denso 428000-1170, Volvo 3803940, Arco 70200",
    interval: "Marş Basmama / Otomatik Boşa Dönme Halinde",
    specs: "12V 3.0kW Yüksek Torklu Planet Redüksiyonlu Su Geçirmez Marş Motoru"
  },
  "3803942": {
    brand: "Volvo Penta",
    category: "Elektrik & Sensörler",
    name: "Volvo Penta D4 / D6 Marin Marş Motoru 24V 4.0kW",
    models: "Volvo Penta D4 ve D6 24V Sistemler",
    cross: "Denso 428000-1180, Volvo 3803942",
    interval: "Arıza Halinde",
    specs: "24V 4.0kW Ağır Hizmet Redüksiyonlu Marin Marş Motoru"
  },
  "3817287": {
    brand: "Volvo Penta",
    category: "Kayış & Kasnak",
    name: "Volvo Penta D4 / D6 Ara Avare Kayış Gergi Kasnağı (Idler Pulley)",
    models: "Volvo Penta D4-225..300, D6-310..435",
    cross: "Gates T38018, INA 532058010, Volvo 3817287",
    interval: "Kayış Değişiminde / Rulman Ses Yaptığında",
    specs: "Çift Sıra Bilyalı Toz ve Nem Korumalı Çelik Avare Kasnak"
  },
  "3817288": {
    brand: "Volvo Penta",
    category: "Kayış & Kasnak",
    name: "Volvo Penta D4 / D6 Otomatik Serpentine Kayış Gergisi (Belt Tensioner)",
    models: "Volvo Penta D4 ve D6 Serisi Tüm Güç Grupları",
    cross: "Litens 999120, Gates DriveAlign, Volvo 3817288",
    interval: "Kayış Ötmesi veya Titreşiminde / 600 Saatte 1",
    specs: "Dahili Hidrolik Sönümleyicili Ağır Hizmet Yaylı Kayış Gergi Mekanizması"
  },
  "875805": {
    brand: "Volvo Penta",
    category: "Tutya & Anotlar",
    name: "Volvo Penta 280 / 290 Ayna Bar Tutya Anodu (Çinko Çubuk)",
    models: "Volvo Penta 280, 290, SP-A, DP-A, DP-B, DP-C, DP-D",
    cross: "Tecnoseal 00706, Martyr CM875805Z",
    interval: "Her Sezon Başı Değişim",
    specs: "Transom Ayna Askı Barı Çinko Tutyası, Paslanmaz Cıvatalı"
  },
  "873395": {
    brand: "Volvo Penta",
    category: "Tutya & Anotlar",
    name: "Volvo Penta DP-S / SX-A Kuyruk Tutya Anot Bloğu",
    models: "Volvo Penta DP-S, SX-A, SX-M Kuyruk Sistemleri",
    cross: "Tecnoseal 00715, Martyr CM873395Z",
    interval: "Her Sezon Başı Değişim",
    specs: "Ayna Alt Kısım Blok Çinko Anot"
  },
  "21405494": {
    brand: "Volvo Penta",
    category: "Mekanik & Contalar",
    name: "Volvo Penta D4 / D6 Isı Eşanjörü Temizleme Conta Kiti",
    models: "Volvo Penta D4, D6 Marin Dizel Motorlar",
    cross: "Volvo Penta 21405494 Orijinal Kit",
    interval: "2 Yılda 1 Eşanjör Asit Temizliği ve Bakımında",
    specs: "Ön ve Arka Kapak O-ringleri, Tüp Demeti Sızdırmazlık Lastikleri"
  },
  "21405495": {
    brand: "Volvo Penta",
    category: "Mekanik & Contalar",
    name: "Volvo Penta D4 / D6 Yağ Soğutucu Petek Conta Takımı",
    models: "Volvo Penta D4, D6 Yağ Soğutma Modülü",
    cross: "Volvo Penta 21405495 Orijinal Kit",
    interval: "Yağ Soğutucu Revizyonunda",
    specs: "Isıya ve Yağa Dayanıklı Özel Kalıplı Profil Contalar"
  },
  "21405496": {
    brand: "Volvo Penta",
    category: "Mekanik & Contalar",
    name: "Volvo Penta D4 / D6 Intercooler (Hava Soğutucu) Conta Kiti",
    models: "Volvo Penta D4-260/300, D6-310/370/435 Turbo Aftercooler",
    cross: "Volvo Penta 21405496",
    interval: "Aftercooler Asit Yıkama Bakımında",
    specs: "Intercooler Gövde ve Tüp Petek Su Yalıtım Contaları"
  },
  "3887019": {
    brand: "Volvo Penta",
    category: "Kuyruk & Şanzıman",
    name: "Volvo Penta DPH / DPR Şaft Keçe Kiti (Inner & Outer Duo-Prop Seal)",
    models: "Volvo Penta DPH-A..D, DPR Kuyruk Sistemleri",
    cross: "Volvo Penta 3887019, Orbitrade 15019",
    interval: "Kuyruk Yağına Su Sızdığında / 2 Sezonda 1",
    specs: "Çift Pervane Milleri İçin Paslanmaz Yaylı Özel İkili Keçe Takımı"
  },
  "3887024": {
    brand: "Volvo Penta",
    category: "Kuyruk & Şanzıman",
    name: "Volvo Penta DPH Kuyruk Yağ Seviye Tapası & Mıknatıslı Vida",
    models: "Volvo Penta DPH, DPR, DPS Kuyruklar",
    cross: "Volvo Penta 3887024, Sierra 18-2374",
    interval: "Her Yağ Değişiminde Çapak Kontrolü",
    specs: "Neodimyum Mıknatıslı Metal Çapak Yakalayıcı Tapa, O-ring Dahil"
  },

  // ─── YANMAR MARINE (Ek 15+ Gerçek OEM Parça) ───
  "129470-13560": {
    brand: "Yanmar",
    category: "Mekanik & Contalar",
    name: "Yanmar 4JH Serisi Paslanmaz Egzoz Karıştırma Dirseği Flanş Contası",
    models: "Yanmar 3JH3, 4JH3, 4JH4E, 4JH5E Egzoz Girişi",
    cross: "Yanmar 129470-13560, HDI Marine Gasket",
    interval: "Her Dirsek Sökümünde Zorunlu Değişim",
    specs: "Çelik Takviyeli Yüksek Sıcaklık Grafitli Egzoz Flanş Contası"
  },
  "128990-13520": {
    brand: "Yanmar",
    category: "Mekanik & Contalar",
    name: "Yanmar 2YM / 3YM Paslanmaz Çelik 316L Egzoz Karıştırıcı Dirsek",
    models: "Yanmar 2YM15, 3YM20, 3YM30, 3YM30AE",
    cross: "HDI Marine SSYM, Yanmar Orijinal",
    interval: "4 Yılda 1 Kontrol / Sezon Sonu Kışlama Kontrolü",
    specs: "316L Paslanmaz Çelik, Korozyon ve Paslanma Yapmaz, Su Giriş Rekoru Dahil"
  },
  "129470-42020": {
    brand: "Yanmar",
    category: "İmpeller & Soğutma",
    name: "Yanmar 3JH / 4JH Ham Deniz Suyu Pompası Komple (Johnson F4B)",
    models: "Yanmar 3JH3, 3JH4, 4JH3, 4JH4E, 4JH5E Motorlar",
    cross: "Johnson 10-24509-01, Yanmar 129470-42020",
    interval: "Pompa Gövde Aşınmasında / 1000 Saatte",
    specs: "Bronz Flanşlı Krank Tahrikli Deniz Suyu Pompası, İmpeller Dahil"
  },
  "128990-42500": {
    brand: "Yanmar",
    category: "İmpeller & Soğutma",
    name: "Yanmar 1GM / 2YM / 3YM Komple Ham Deniz Suyu Pompası",
    models: "Yanmar 1GM10, 2YM15, 3YM20, 3YM30",
    cross: "Johnson 10-24508-01, Yanmar 128990-42500",
    interval: "1000 Saat Bakımında",
    specs: "Kompakt Bronz Pompa Gövdesi, Neopren İmpellerli"
  },
  "129470-42530": {
    brand: "Yanmar",
    category: "İmpeller & Soğutma",
    name: "Yanmar 3JH / 4JH Deniz Pompası Kapak O-Ring Contası",
    models: "Yanmar 3JH, 4JH Johnson Pompalar",
    cross: "Johnson 01-42398, Yanmar 129470-42530",
    interval: "Her İmpeller Değişiminde Zorunlu",
    specs: "Yüksek Isı ve Tuzlu Su Dayanımlı NBR Kauçuk O-Ring"
  },
  "129470-12430": {
    brand: "Yanmar",
    category: "Filtreler",
    name: "Yanmar 4JH4-TE / 4JH5E Turbo Emiş Marin Panel Hava Filtresi",
    models: "Yanmar 4JH4-TE, 4JH4-HTE, 4JH5E, 4JH80",
    cross: "Mann C 14 114, Donaldson P633755",
    interval: "200-400 Saat / Sezonluk",
    specs: "Yağ Buharı ve Nem Tutucu Panel Eleman"
  },
  "128270-12540": {
    brand: "Yanmar",
    category: "Filtreler",
    name: "Yanmar 1GM / 2GM / 3GM Susturuculu Hava Filtresi Süngeri",
    models: "Yanmar 1GM, 2GM20, 3GM30, 2YM15, 3YM20, 3YM30",
    cross: "Yanmar Orijinal Susturucu Süngeri",
    interval: "Yılda 1 Kez Temizlik veya Değişim",
    specs: "Yıkanabilir Alev Korumalı Marin Sünger Filtre Elemanı"
  },
  "129470-67200": {
    brand: "Yanmar",
    category: "Kayış & Kasnak",
    name: "Yanmar 4JH Alternatör Tahrik V-Kayışı",
    models: "Yanmar 3JH, 4JH Serisi Marin Motorlar",
    cross: "Gates 6268MC, Dayco V-Belt",
    interval: "300 Saat / 2 Yılda 1 Kez",
    specs: "Yüksek Dayanımlı EPDM Marin V-Kayışı"
  },
  "128990-67250": {
    brand: "Yanmar",
    category: "Kayış & Kasnak",
    name: "Yanmar 2YM / 3YM Su Devridaim Pompası Kayışı",
    models: "Yanmar 2YM15, 3YM20, 3YM30",
    cross: "Gates Marin Seri, Yanmar Orijinal",
    interval: "300 Saat / Sezonluk Kontrol",
    specs: "Aşınma ve Tuza Dayanıklı V-Kayış"
  },
  "129211-77200": {
    brand: "Yanmar",
    category: "Elektrik & Sensörler",
    name: "Yanmar Hitachi 12V 125A Yüksek Kapasiteli Marin Alternatör",
    models: "Yanmar 4JH4E, 4JH5E, 4JH80, 4JH110 (Akü Şarj Paketi)",
    cross: "Hitachi LR1125-701, Yanmar 129211-77200",
    interval: "1000 Saat Bakımı",
    specs: "12V 125 Amper Yüksek Çıkışlı Çift Fanlı Marin Alternatör"
  },
  "129470-77720": {
    brand: "Yanmar",
    category: "Elektrik & Sensörler",
    name: "Yanmar Motor Yağ Basınç Müşürü (1/8\" NPT 0.5 Bar Alarm)",
    models: "Yanmar 2YM, 3YM, 3JH, 4JH Tüm Seriler",
    cross: "Yanmar 129470-77720, VDO Marin",
    interval: "Düşük Yağ Basıncı Uyarı Arızasında",
    specs: "1/8\" NPT Konik Dişli Marin İkaz Müşürü"
  },
  "121575-49800": {
    brand: "Yanmar",
    category: "Elektrik & Sensörler",
    name: "Yanmar Hararet Müşürü & Sıcaklık Sensörü (M16x1.5)",
    models: "Yanmar YM ve JH Serisi Marin Göstergeler",
    cross: "Yanmar 121575-49800, Yazaki Marin",
    interval: "Gösterge Hatalı Ölçtüğünde",
    specs: "M16x1.5 Dişli Marin Çift Kutuplu Sıcaklık Göndericisi"
  },
  "129470-55703": {
    brand: "Yanmar",
    category: "Mekanik & Contalar",
    name: "Yanmar 3JH / 4JH Mekanik Yakıt Otomatiği & Besleme Pompası",
    models: "Yanmar 3JH2, 3JH3, 3JH4, 4JH2, 4JH3, 4JH4E",
    cross: "Yanmar 129470-55703, Carter Marin Pompa",
    interval: "Yakıt Basıncı Düşüklüğünde / Diyafram Arızasında",
    specs: "Mekanik Kollu Düşük Basınç Besleme Pompası, El Pompası Entegre"
  },
  "196420-02653": {
    brand: "Yanmar",
    category: "Kuyruk & Şanzıman",
    name: "Yanmar SD20 / SD25 Saildrive Çift Dudaklı Şaft Yağ Keçe Takımı",
    models: "Yanmar SD20, SD25 Saildrive Yelkenli Sürücüleri",
    cross: "Yanmar 196420-02653, Orbitrade 15653",
    interval: "Her Karaya Çıkışta Kontrol / Yağa Su Girmesinde",
    specs: "Paslanmaz Çelik Yaylı Çift Dudaklı Şaft Sızdırmazlık Keçeleri"
  },
  "196440-02680": {
    brand: "Yanmar",
    category: "Kuyruk & Şanzıman",
    name: "Yanmar SD50 / SD60 Saildrive Üst ve Alt Şaft Keçe Kiti",
    models: "Yanmar SD50, SD60 Sürücüler",
    cross: "Yanmar 196440-02680 Orijinal Kit",
    interval: "2 Sezonda 1 Kez / Karada Değişim",
    specs: "Pervane Şaftı ve Dikey Şaft Su / Yağ Yalıtım Keçe Seti"
  },
  "196440-02690": {
    brand: "Yanmar",
    category: "Kuyruk & Şanzıman",
    name: "Yanmar SD50 Saildrive Kavrama Koni Kiti (Clutch Cone Assembly)",
    models: "Yanmar SD50 Yelkenli Kuyrukları (İleri/Geri Vites Kaçırması Çözümü)",
    cross: "Yanmar 196440-02690 Orijinal Koni Kiti",
    interval: "Vites Geçişinde Kaydırma / Kaçırma Halinde",
    specs: "Bronz İkili Kavrama Konisi, Şimler ve Segmanlar Dahil"
  },

  // ─── MAN MARINE (Ek 10+ Gerçek OEM Parça) ───
  "51.05504-0106": {
    brand: "MAN Marine",
    category: "Filtreler",
    name: "MAN By-Pass Santrifüj Yağ Filtresi Yedek Rotor Kiti",
    models: "MAN D2842, D2848, D2868, D2862 V8/V12 Marin Motorlar",
    cross: "Mann CS 0106, MAN Orijinal Rotor",
    interval: "400 Saat / Her İki Yağ Bakımında",
    specs: "Hassas Dengelenmiş Santrifüj Yağ Temizleme Rotoru"
  },
  "51.08301-0020": {
    brand: "MAN Marine",
    category: "Filtreler",
    name: "MAN Çiftli Turbo Hava Emiş Filtresi Kartuş Seti",
    models: "MAN V8-1200, V12-1550, V12-1800, V12-1900",
    cross: "Mann C 30 1537/1, MAN Orijinal",
    interval: "400 Saat / Yılda 1 Kez",
    specs: "Yüksek Toz Tutma Kapasiteli İkili Marin Hava Filtre Kiti"
  },
  "51.06801-0008": {
    brand: "MAN Marine",
    category: "İmpeller & Soğutma",
    name: "MAN Deniz Pompası Kam & Aşınma Plakası Seti",
    models: "MAN i6 ve V8 Ham Su Pompaları",
    cross: "Johnson Pompa Revizyon Parçası, MAN 51.06801-0008",
    interval: "Pompa Verim Kaybında",
    specs: "Bronz Kam Parçası ve Paslanmaz Aşınma Plakası"
  },
  "51.98141-0003": {
    brand: "MAN Marine",
    category: "Tutya & Anotlar",
    name: "MAN Motor Yağ Soğutucu Çinko Tutya Anot Tapası (3/4\" NPT)",
    models: "MAN D2842, D2868, D2862",
    cross: "Tecnoseal 00903, Martyr CM51981410003Z",
    interval: "100-150 Saat / Sezon Başı",
    specs: "3/4\" NPT Pirinç Tapalı Ağır Hizmet Çinko Anot"
  },
  "51.96801-0280": {
    brand: "MAN Marine",
    category: "Kayış & Kasnak",
    name: "MAN i6 Alternatör Tahrik Serpentine Kayışı 8PK",
    models: "MAN i6-730, i6-800, i6-850 Common Rail",
    cross: "Gates 8PK Serisi, MAN Orijinal",
    interval: "500 Saat / 2 Yılda 1 Kez",
    specs: "8 Kanallı EPDM Marin Ağır Hizmet Kayışı"
  },
  "51.27120-7039": {
    brand: "MAN Marine",
    category: "Elektrik & Sensörler",
    name: "MAN Krank Mili Devir & Pozisyon Sensörü (Inductive Pick-Up)",
    models: "MAN i6, V8, V12 Common Rail Dizel Motorlar",
    cross: "Bosch 0281002214, MAN 51.27120-7039",
    interval: "Motor Çalışmama / Devir Sinyali Yok Alarmında",
    specs: "Ağır Hizmet Korumalı Endüktif Devir Sensörü, Çift O-Ringli"
  },
  "51.27120-7040": {
    brand: "MAN Marine",
    category: "Elektrik & Sensörler",
    name: "MAN Eksantrik Mili Faz Konum Sensörü (Camshaft Phase Sensor)",
    models: "MAN D2868, D2862 CR Motorlar",
    cross: "Bosch 0281002215, MAN 51.27120-7040",
    interval: "Senkron Hatasında",
    specs: "Manyetik Hall-Effect Faz Algılayıcı"
  },
  "51.27421-0160": {
    brand: "MAN Marine",
    category: "Elektrik & Sensörler",
    name: "MAN Turbo Egzoz Gazı Sıcaklık Sensörü (K-Tipi Pyrometer 0-1000°C)",
    models: "MAN i6, V8, V12 Marin Motorlar (EDC ve CR Sistemleri)",
    cross: "MAN 51.27421-0160, VDO Termokupl",
    interval: "Egzoz Sıcaklık Uyarısında / Kablo Hasarında",
    specs: "0-1000°C K-Tipi Paslanmaz Zırhlı Termokupl Egzoz Sensörü"
  },
  "51.10100-6085": {
    brand: "MAN Marine",
    category: "Filtreler",
    name: "MAN CCV Karter Havalandırma Yağ Tahliye Çekvalfi",
    models: "MAN V8-1200, V12-1550..2000 CR Sistemleri",
    cross: "MAN 51.10100-6085, Racor Çekvalf",
    interval: "Karter Basıncı Yükselmesinde",
    specs: "Yağ Buharını Süzüp Kartere Geri İleten Tek Yönlü Membran Çekvalf"
  }
};

// Merge into catalog
let addCount = 0;
let upCount = 0;
for (const [code, item] of Object.entries(additionalBrandParts)) {
  if (catalog[code]) {
    catalog[code] = { ...catalog[code], ...item };
    upCount++;
  } else {
    catalog[code] = item;
    addCount++;
  }
}

console.log(`Added ${addCount} new items, updated ${upCount} items.`);
console.log(`New Master Catalog total: ${Object.keys(catalog).length}`);

// Brand breakdown
const finalBrands = {};
for (const item of Object.values(catalog)) {
  finalBrands[item.brand] = (finalBrands[item.brand] || 0) + 1;
}
console.log("Final Brand Breakdown:", finalBrands);

// Write updated JSON
fs.writeFileSync(MASTER_JSON_PATH, JSON.stringify(catalog, null, 2), 'utf8');

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

// Update admin.html & stok.html catalogs
let adminContent = fs.readFileSync(ADMIN_HTML_PATH, 'utf8');
const agentOemRegex = /const\s+AGENT_OEM_CATALOG\s*=\s*\{[\s\S]*?\n\};/;
adminContent = adminContent.replace(agentOemRegex, "const AGENT_OEM_CATALOG = " + JSON.stringify(catalog, null, 2) + ";");
fs.writeFileSync(ADMIN_HTML_PATH, adminContent, 'utf8');

let stokContent = fs.readFileSync(STOK_HTML_PATH, 'utf8');
const oemCrossRegex = /const\s+OEM_CROSS_DATABASE\s*=\s*\{[\s\S]*?\n\};/;
stokContent = stokContent.replace(oemCrossRegex, "const OEM_CROSS_DATABASE = " + JSON.stringify(catalog, null, 2) + ";");
fs.writeFileSync(STOK_HTML_PATH, stokContent, 'utf8');

console.log("Catalog updated and synchronized in files!");
