# DM MARİN — Google İşletme Profili (Google Business Profile) Kurulum Rehberi

Bu doküman, DM MARİN için Google Haritalar ve Yerel Arama sonuçlarında maksimum görünürlük elde etmek amacıyla hazırlanmış doğrulanmış işletme profili verilerini içerir.

---

## 1. Temel İşletme Bilgileri

- **İşletme Adı:** DM MARİN - Mobil Marin Servis & Tekne Motor Bakımı
- **Birincil Kategori:** Tekne Tamir ve Bakım Servisi (Boat repair shop / Boat maintenance service)
- **İkincil Kategoriler:**
  - Marin Mühendisliği Servisi (Marine engineer)
  - Elektrikçi (Marine electrician)
  - Motor Tamir ve Yenileme (Engine rebuilding service)
  - Jeneratör Servisi (Electric generator shop / service)
- **Web Sitesi:** https://dmmarin.com/
- **Telefon Numarası:** +90 543 724 09 92
- **E-posta:** dmmarin46@gmail.com
- **Çalışma Saatleri:**
  - Pazartesi - Cumartesi: 08:00 – 18:00
  - Pazar: Kapalı (veya Acil Mobil Servis İçin 7/24 Çağrı Kabulü)
  - *Özel Not:* 7/24 Acil Marin Servis ve seyir arızaları için telefon ve WhatsApp hattı sürekli aktiftir.

---

## 2. Hizmet Verilen Bölgeler (Service Areas)

DM MARİN rıhtımda ve marinada yerinde mobil servis sunduğu için profil üzerinde aşağıdaki yerleşim birimleri ve marinalar "Hizmet Bölgesi" olarak eklenmelidir:

### Anadolu Yakası:
1. **Kadıköy** (Setur Kalamış Marina & Setur Fenerbahçe Marina)
2. **Tuzla** (Viaport Marina Tuzla, Tuzla Tersaneler Bölgesi, Aydıntepe)
3. **Pendik** (Pendik Marintürk Marina, Sahil İskeleleri)
4. **Maltepe & Kartal** (Kumcular, Kartal Barınağı)
5. **Adalar** (Büyükada, Heybeliada, Kınalıada, Burgazada bağlama alanları)

### Avrupa Yakası:
6. **Bakırköy** (Ataköy Marina, Mega Yat Rıhtımları)
7. **Beylikdüzü** (West İstanbul Marina, Çekek Sahası)
8. **Büyükçekmece & Silivri** (Yat ve tekne bağlama noktaları)
9. **Sarıyer & Boğaz Hattı** (Tarabya, İstinye, Bebek koyları)

---

## 3. Hizmet Listesi ve Açıklamaları (Services)

Google İşletme Profilinde "Hizmetler" sekmesine birebir eklenecek başlıklar:

1. **Tekne Motor Tamiri ve Mekanik Bakım**
   - *Açıklama:* İçten takma (inboard) ve dıştan takma dizel tekne motorlarında periyodik bakım, revizyon, silindir kapağı, turbo ve eşanjör temizliği.
2. **Marin Jeneratör Servisi ve Bakımı**
   - *Açıklama:* Kohler, Onan, Fischer Panda, Northern Lights ve diğer jeneratörlerde AVR voltaj-frekans ayarı, impeller, su kapanı ve bakım servisi.
3. **7/24 Acil Mobil Marin Servis**
   - *Açıklama:* Seyir öncesi veya seyir halinde marinalarda ve demir yerlerinde donanımlı mobil servis aracıyla 7/24 acil mekanik ve elektrik müdahalesi.
4. **Marin Elektrik ve Elektronik Sistemler**
   - *Açıklama:* Sintine devreleri, şarj dinamoları, Victron/Mastervolt inverter-redresör, marin akü grupları ve galvanik korozyon kaçak tespiti.
5. **Bilgisayarlı / Cihazlı Motor Arıza Tespiti**
   - *Açıklama:* Volvo Penta EVC, MAN EDC, MTU MDEC/ADEC ve Caterpillar ECM sistemlerinde orijinal test cihazlarıyla hata teşhisi.
6. **Tekne Sezonluk ve Periyodik Bakım (Kışlama)**
   - *Açıklama:* Sezon öncesi motor-şanzıman hazırlığı, tutya (anot) değişimleri, kışlama antifriz sirkülasyonu ve seyre hazırlık kontrolleri.
7. **Marin Yedek Parça Tedariği**
   - *Açıklama:* Motor seri numarasına göre filtre, impeller, kayış, conta, turbo ve orijinal marin yedek parça temini.

---

## 4. İşletme Açıklaması (Business Description)

DM MARİN, İstanbul ve Marmara Bölgesi genelindeki tüm marinalarda tekne sahiplerine, motoryat ve yelkenlilere yerinde mobil marin teknik servis hizmeti sunan bağımsız özel servistir. 26 yılı aşkın saha deneyimimizle Volvo Penta, Yanmar, Caterpillar (CAT), MAN Marine, MTU, Cummins Onan, Kohler ve Yamaha başta olmak üzere tüm lider markalarda arıza teşhisini cihazlı ölçümle yapıyor; gereksiz parça değişiminin önüne geçiyoruz.

Kalamış Marina, Fenerbahçe Marina, Ataköy Marina, Viaport Marina Tuzla, Pendik Marintürk ve West İstanbul Marina’da teknenizin yanına geliyor; motor tamiri, marin jeneratör revizyonu, elektrik-elektronik arızaları ve 7/24 acil mobil müdahaleleri rıhtımda gerçekleştiriyoruz. “Denizde kalmayın, biz yola çıkarız.”

---

## 5. Google Search Console & GA4 Entegrasyon Adımları

1. **Google Search Console Doğrulaması:**
   - HTML Meta Etiketi doğrulama yöntemi seçildiğinde verilen `content="DOĞRULAMA_KODU"` değerini Vercel ortam değişkeni `GOOGLE_SITE_VERIFICATION` olarak tanımlayınız.
2. **Google Analytics 4 (GA4):**
   - GA4 panelinden alınan `G-XXXXXXXXXX` ölçüm kimliğini Vercel ortam değişkeni `GA_MEASUREMENT_ID` olarak tanımlayınız.
   - Değişken boş olduğunda site üzerinde hiçbir gereksiz izleme kodu çalıştırılmaz, Core Web Vitals ve sayfa açılış hızı %100 korunur.
