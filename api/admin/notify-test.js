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
    await sendNotification({
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

    return res.status(200).json({
      success: true,
      message: 'Test bildirimi başarıyla tetiklendi (Telegram / Webhook yapılandırmanızı kontrol edin).'
    });
  } catch (err) {
    return res.status(500).json({ error: 'Test bildirimi gönderilirken hata: ' + err.message });
  }
};
