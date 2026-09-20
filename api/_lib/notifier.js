// api/_lib/notifier.js
const { getServiceClient } = require('./supabase');

async function sendNotification(requestData) {
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

    // Fallback to process.env if not in DB
    const telegramToken = (config && config.telegram_bot_token) || process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = (config && config.telegram_chat_id) || process.env.TELEGRAM_CHAT_ID;
    const webhookUrl = (config && config.webhook_url) || process.env.ADMIN_WEBHOOK_URL;

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

    const promises = [];

    // 1. Telegram Alert
    if (telegramToken && telegramChatId) {
      const tgText = `🚨 *YENİ SERVİS TALEBİ - DM MARİN*\n\n` +
        `👤 *Ad Soyad:* ${name}\n` +
        `📞 *Telefon:* \`${phone}\`\n` +
        `✉️ *E-posta:* ${email}\n` +
        `🚤 *Tekne/Motor:* ${boat_name}\n` +
        `📍 *Konum:* ${marina_location}\n` +
        `🛠 *Hizmet:* ${service_type}\n` +
        `📝 *Açıklama:* ${message}\n` +
        `🌐 *Sayfa:* ${source_page}\n\n` +
        `🔗 [Admin Paneline Git](https://dmmarin.com/admin.html)`;

      promises.push(
        fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: tgText,
            parse_mode: 'Markdown'
          })
        }).catch(err => console.error('Telegram notification error:', err.message))
      );
    }

    // 2. Generic Webhook (Make / Zapier / Slack / Discord / Custom API)
    if (webhookUrl && webhookUrl.startsWith('http')) {
      const payload = {
        event: 'service_request.created',
        timestamp: new Date().toISOString(),
        request: {
          id,
          name,
          phone,
          email,
          boat_name,
          marina_location,
          service_type,
          message,
          source_page
        }
      };

      let reqBody = JSON.stringify(payload);
      if (webhookUrl.includes('discord.com/api/webhooks')) {
        reqBody = JSON.stringify({
          username: 'DM MARİN Servis Botu',
          embeds: [{
            title: '🚨 Yeni Servis Talebi',
            color: 2282478, // cyan #22D3EE
            fields: [
              { name: '👤 Müşteri', value: name, inline: true },
              { name: '📞 Telefon', value: phone, inline: true },
              { name: '✉️ E-posta', value: email, inline: true },
              { name: '🚤 Tekne / Motor', value: boat_name, inline: true },
              { name: '📍 Konum / Marina', value: marina_location, inline: true },
              { name: '🛠 Hizmet', value: service_type, inline: true },
              { name: '📝 Açıklama', value: message || 'Belirtilmedi' }
            ],
            footer: { text: `DM MARİN Dispatch · ${source_page}` },
            timestamp: new Date().toISOString()
          }]
        });
      }

      promises.push(
        fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: reqBody
        }).catch(err => console.error('Webhook notification error:', err.message))
      );
    }

    // 3. Direct Email via Resend API
    const resendApiKey = process.env.RESEND_API_KEY || (config && config.resend_api_key);
    const adminEmail = (config && config.admin_email) || process.env.ADMIN_EMAIL || 'servis@dmmarin.com';

    if (resendApiKey && adminEmail) {
      promises.push(
        fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey}`
          },
          body: JSON.stringify({
            from: 'DM MARİN Servis <onboarding@resend.dev>',
            to: [adminEmail],
            subject: `🚨 Yeni Servis Talebi: ${name} (${boat_name})`,
            html: `
              <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#102734">
                <div style="background:#071b2b;padding:20px;text-align:center;border-radius:10px 10px 0 0">
                  <h2 style="color:#fff;margin:0">🚨 Yeni Servis Talebi Alındı</h2>
                </div>
                <div style="border:1px solid #dce7ea;padding:24px;border-radius:0 0 10px 10px;background:#fff">
                  <p>Web sitesinden yeni bir müşteri servis talebi iletti:</p>
                  <table style="width:100%;border-collapse:collapse;font-size:14px">
                    <tr style="border-bottom:1px solid #f0f4f6"><td style="padding:8px 0;color:#6b7b84;width:130px">Müşteri:</td><td style="padding:8px 0;font-weight:bold">${name}</td></tr>
                    <tr style="border-bottom:1px solid #f0f4f6"><td style="padding:8px 0;color:#6b7b84">Telefon:</td><td style="padding:8px 0;font-weight:bold"><a href="tel:${phone}" style="color:#087f93">${phone}</a></td></tr>
                    <tr style="border-bottom:1px solid #f0f4f6"><td style="padding:8px 0;color:#6b7b84">E-posta:</td><td style="padding:8px 0">${email}</td></tr>
                    <tr style="border-bottom:1px solid #f0f4f6"><td style="padding:8px 0;color:#6b7b84">Tekne / Motor:</td><td style="padding:8px 0;font-weight:bold">${boat_name}</td></tr>
                    <tr style="border-bottom:1px solid #f0f4f6"><td style="padding:8px 0;color:#6b7b84">Marina / Konum:</td><td style="padding:8px 0">${marina_location}</td></tr>
                    <tr style="border-bottom:1px solid #f0f4f6"><td style="padding:8px 0;color:#6b7b84">Hizmet Türü:</td><td style="padding:8px 0;font-weight:bold">${service_type}</td></tr>
                    <tr style="border-bottom:1px solid #f0f4f6"><td style="padding:8px 0;color:#6b7b84">Açıklama:</td><td style="padding:8px 0">${message}</td></tr>
                    <tr><td style="padding:8px 0;color:#6b7b84">Kaynak Sayfa:</td><td style="padding:8px 0">${source_page}</td></tr>
                  </table>
                  <div style="margin-top:24px;text-align:center">
                    <a href="https://dmmarin.com/admin.html" style="background:#087f93;color:#fff;padding:12px 24px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block">Admin Paneline Git →</a>
                  </div>
                </div>
              </div>
            `
          })
        }).catch(err => console.error('Resend email notification error:', err.message))
      );
    }

    await Promise.allSettled(promises);
  } catch (e) {
    console.error('sendNotification exception:', e.message);
  }
}

module.exports = { sendNotification };
