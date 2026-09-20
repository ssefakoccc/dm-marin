// api/admin/notify-test.js
const { verifyAdmin } = require('../_lib/auth');
const { sendNotification } = require('../_lib/notifier');

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Sadece POST istekleri kabul edilir.' });
  }

  const adminUser = await verifyAdmin(req, res);
  if (!adminUser) return;

  try {
    const result = await sendNotification({
      id: 'TEST-' + Math.floor(1000 + Math.random() * 9000),
      name: 'Test Müşteri (Admin Panel Denemesi)',
      phone: '+90 543 724 09 92',
      email: 'servis@dmmarin.com',
      boat_name: 'Sea Ray 320 Sundancer',
      marina_location: 'Setur Kalamış Marina / Ponton C-12',
      service_type: 'Motor & Mekanik Bakım + Cihazlı Teşhis',
      message: 'Bu bir test bildirimidir. DM MARİN bildirim entegrasyonu başarıyla çalışıyor!',
      source_page: '/admin.html [Test Bildirimi]'
    });

    const summaryParts = [];
    let hasAnyConfigured = false;
    let hasSuccess = false;

    if (result.email && result.email.configured) {
      hasAnyConfigured = true;
      if (result.email.ok) {
        summaryParts.push('📧 E-posta: Başarılı');
        hasSuccess = true;
      } else {
        summaryParts.push(`📧 E-posta Hatası: ${result.email.error}`);
      }
    } else {
      summaryParts.push('📧 E-posta: Yapılandırılmadı (Resend API Key giriniz)');
    }

    if (result.telegram && result.telegram.configured) {
      hasAnyConfigured = true;
      if (result.telegram.ok) {
        summaryParts.push('📱 Telegram: Başarılı');
        hasSuccess = true;
      } else {
        summaryParts.push(`📱 Telegram Hatası: ${result.telegram.error}`);
      }
    }

    if (result.webhook && result.webhook.configured) {
      hasAnyConfigured = true;
      if (result.webhook.ok) {
        summaryParts.push('🔗 Webhook: Başarılı');
        hasSuccess = true;
      } else {
        summaryParts.push(`🔗 Webhook Hatası: ${result.webhook.error}`);
      }
    }

    if (!hasAnyConfigured) {
      return res.status(200).json({
        success: false,
        result,
        message: 'Hiçbir bildirim kanalı (E-posta, Telegram veya Webhook) yapılandırılmamış. Lütfen ayarları kaydedin.'
      });
    }

    return res.status(200).json({
      success: hasSuccess,
      result,
      message: summaryParts.join(' | ')
    });
  } catch (err) {
    return res.status(500).json({ error: 'Test bildirimi gönderilirken hata: ' + err.message });
  }
};

