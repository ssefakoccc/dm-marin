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

    await Promise.allSettled(promises);
  } catch (e) {
    console.error('sendNotification exception:', e.message);
  }
}

module.exports = { sendNotification };
