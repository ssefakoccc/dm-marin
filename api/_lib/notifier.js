// api/_lib/notifier.js
const { getServiceClient } = require('./supabase');

async function sendNotification(requestData) {
  const result = {
    telegram: { configured: false, ok: false, error: null },
    webhook: { configured: false, ok: false, error: null },
    email: { configured: false, ok: false, error: null }
  };

  try {
    const supabase = getServiceClient();
    let config = null;

    if (supabase) {
      const { data } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'notification_config')
        .maybeSingle();
      if (data && data.value) {
        config = data.value;
      }
    }

    const telegramToken = (config && config.telegram_bot_token) || process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = (config && config.telegram_chat_id) || process.env.TELEGRAM_CHAT_ID;
    const webhookUrl = (config && config.webhook_url) || process.env.ADMIN_WEBHOOK_URL;
    const resendApiKey = (config && config.resend_api_key) || process.env.RESEND_API_KEY;
    const adminEmail = (config && config.admin_email) || process.env.ADMIN_EMAIL || 'dmmarin48@gmail.com';

    const {
      name = '-',
      phone = '-',
      email = '-',
      boat_name = '-',
      marina_location = '-',
      service_type = '-',
      message = '-',
      source_page = '-',
      id = ''
    } = requestData;

    // 1. Telegram
    if (telegramToken && telegramChatId) {
      result.telegram.configured = true;
      try {
        const tgRes = await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: `🚨 *YENİ SERVİS TALEBİ - DM MARİN*\n\n👤 *Ad Soyad:* ${name}\n📞 *Telefon:* \`${phone}\`\n✉️ *E-posta:* ${email}\n🚤 *Tekne:* ${boat_name}\n📍 *Konum:* ${marina_location}\n🛠 *Hizmet:* ${service_type}\n📝 *Açıklama:* ${message}\n\n🔗 [Admin Paneli](https://dmmarin.com/admin.html)`,
            parse_mode: 'Markdown'
          })
        });
        const tgJson = await tgRes.json();
        if (tgRes.ok && tgJson.ok) {
          result.telegram.ok = true;
        } else {
          result.telegram.error = tgJson.description || 'Telegram hatası';
        }
      } catch (err) {
        result.telegram.error = err.message;
      }
    }

    // 2. Webhook
    if (webhookUrl && webhookUrl.startsWith('http')) {
      result.webhook.configured = true;
      try {
        const whRes = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'service_request.created',
            timestamp: new Date().toISOString(),
            request: { id, name, phone, email, boat_name, marina_location, service_type, message, source_page }
          })
        });
        if (whRes.ok) {
          result.webhook.ok = true;
        } else {
          result.webhook.error = `HTTP ${whRes.status}: ${whRes.statusText}`;
        }
      } catch (err) {
        result.webhook.error = err.message;
      }
    }

    // 3. Resend Email
    if (resendApiKey && adminEmail) {
      result.email.configured = true;
      try {
        const emailRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey.trim()}`
          },
          body: JSON.stringify({
            from: 'DM MARİN Servis <onboarding@resend.dev>',
            to: [adminEmail.trim()],
            subject: `🚨 Yeni Servis Talebi: ${name} (${boat_name})`,
            html: `
              <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#102734">
                <div style="background:#071b2b;padding:20px;text-align:center;border-radius:10px 10px 0 0">
                  <h2 style="color:#fff;margin:0">🚨 Yeni Servis Talebi Alındı</h2>
                </div>
                <div style="border:1px solid #dce7ea;padding:24px;border-radius:0 0 10px 10px;background:#fff">
                  <table style="width:100%;border-collapse:collapse;font-size:14px">
                    <tr style="border-bottom:1px solid #f0f4f6"><td style="padding:8px 0;color:#6b7b84;width:130px">Müşteri:</td><td style="padding:8px 0;font-weight:bold">${name}</td></tr>
                    <tr style="border-bottom:1px solid #f0f4f6"><td style="padding:8px 0;color:#6b7b84">Telefon:</td><td style="padding:8px 0;font-weight:bold"><a href="tel:${phone}" style="color:#087f93">${phone}</a></td></tr>
                    <tr style="border-bottom:1px solid #f0f4f6"><td style="padding:8px 0;color:#6b7b84">E-posta:</td><td style="padding:8px 0">${email}</td></tr>
                    <tr style="border-bottom:1px solid #f0f4f6"><td style="padding:8px 0;color:#6b7b84">Tekne / Motor:</td><td style="padding:8px 0;font-weight:bold">${boat_name}</td></tr>
                    <tr style="border-bottom:1px solid #f0f4f6"><td style="padding:8px 0;color:#6b7b84">Marina / Konum:</td><td style="padding:8px 0">${marina_location}</td></tr>
                    <tr style="border-bottom:1px solid #f0f4f6"><td style="padding:8px 0;color:#6b7b84">Hizmet Türü:</td><td style="padding:8px 0;font-weight:bold">${service_type}</td></tr>
                    <tr style="border-bottom:1px solid #f0f4f6"><td style="padding:8px 0;color:#6b7b84">Açıklama:</td><td style="padding:8px 0">${message}</td></tr>
                  </table>
                  <div style="margin-top:24px;text-align:center">
                    <a href="https://dmmarin.com/admin.html" style="background:#087f93;color:#fff;padding:12px 24px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block">Admin Paneline Git →</a>
                  </div>
                </div>
              </div>
            `
          })
        });

        const emailJson = await emailRes.json();
        if (emailRes.ok && emailJson.id) {
          result.email.ok = true;
          result.email.id = emailJson.id;
        } else {
          result.email.error = (emailJson.message || emailJson.error || `HTTP ${emailRes.status}`);
        }
      } catch (err) {
        result.email.error = err.message;
      }
    }
  } catch (e) {
    console.error('sendNotification exception:', e.message);
  }

  return result;
}

module.exports = { sendNotification };
