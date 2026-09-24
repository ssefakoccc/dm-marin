// api/_lib/notifier.js
const { getServiceClient } = require('./supabase');

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function isSafeWebhookUrl(urlStr) {
  try {
    const parsed = new URL(urlStr);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return false;
    const host = parsed.hostname.toLowerCase();
    if (host === 'localhost' || host === '127.0.0.1' || host === '0.0.0.0' || host.startsWith('192.168.') || host.startsWith('10.') || host.startsWith('172.16.') || host === '169.254.169.254') {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
}

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
    const adminEmail = (config && config.admin_email) || process.env.ADMIN_EMAIL || 'dmmarin46@gmail.com';
    const fromEmail = (config && config.resend_from_email) || process.env.RESEND_FROM_EMAIL || 'DM MARİN Servis <dmmarin46@gmail.com>';

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
    if (webhookUrl && isSafeWebhookUrl(webhookUrl)) {
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
        const replyTo = (email && email.includes('@') && !email.includes('example') && !email.includes('-')) 
          ? email.trim() 
          : adminEmail.trim();

        const cleanSubject = `[DM MARİN] Yeni Servis Talebi: ${name} (${boat_name && boat_name !== '-' ? boat_name : 'Tekne Bakımı'})`;

        const plainText = `DM MARİN - YENİ SERVİS TALEBİ BİLDİRİMİ
============================================================
Müşteri Ad Soyad : ${name}
Telefon          : ${phone}
E-posta          : ${email}
Tekne / Motor    : ${boat_name}
Marina / Konum   : ${marina_location}
Hizmet Türü      : ${service_type}
Açıklama / Not   : ${message}
Kaynak Sayfa     : ${source_page}
Talep ID         : ${id || '-'}
Bildirim Tarihi  : ${new Date().toLocaleString('tr-TR', { timeZone: 'Europe/Istanbul' })}
============================================================
Talebi Görüntüleyin: https://dmmarin.com/admin.html

DM MARİN Mobil Marin Servis · İstanbul ve Marmara
https://dmmarin.com · dmmarin46@gmail.com`;

        const htmlContent = `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${cleanSubject}</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f7f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#102734;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f4f7f9;padding:24px 12px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #dce7ea;box-shadow:0 4px 12px rgba(7,27,43,0.06);">
          <!-- Header -->
          <tr>
            <td style="background:#071b2b;padding:24px 28px;text-align:left;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <h1 style="color:#ffffff;font-size:20px;margin:0 0 4px 0;font-weight:800;letter-spacing:-0.3px;">DM MARİN TEKNİK SERVİS</h1>
                    <p style="color:#19c7df;font-size:13px;margin:0;font-weight:600;">Yeni Müşteri Servis Talebi Bildirimi</p>
                  </td>
                  <td align="right" style="color:#8ba5b5;font-size:12px;">
                    ${new Date().toLocaleDateString('tr-TR')}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Request Details -->
          <tr>
            <td style="padding:28px;">
              <div style="background:#f8fafc;border-left:4px solid #087f93;padding:12px 16px;margin-bottom:20px;border-radius:0 8px 8px 0;">
                <p style="margin:0;font-size:14px;color:#334155;font-weight:600;">
                  Web sitesi üzerinden yeni bir servis veya bakım başvurusu yapıldı.
                </p>
              </div>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="font-size:14px;line-height:1.5;">
                <tr>
                  <td style="padding:10px 0;color:#64748b;width:130px;border-bottom:1px solid #f1f5f9;">Müşteri:</td>
                  <td style="padding:10px 0;color:#0f172a;font-weight:700;border-bottom:1px solid #f1f5f9;">${escapeHtml(name)}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:#64748b;border-bottom:1px solid #f1f5f9;">Telefon:</td>
                  <td style="padding:10px 0;font-weight:700;border-bottom:1px solid #f1f5f9;">
                    <a href="tel:${encodeURIComponent(phone)}" style="color:#087f93;text-decoration:none;">${escapeHtml(phone)}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:#64748b;border-bottom:1px solid #f1f5f9;">E-posta:</td>
                  <td style="padding:10px 0;color:#0f172a;border-bottom:1px solid #f1f5f9;">
                    ${email !== '-' ? `<a href="mailto:${encodeURIComponent(email)}" style="color:#087f93;text-decoration:none;">${escapeHtml(email)}</a>` : '<span style="color:#94a3b8;">Belirtilmedi</span>'}
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:#64748b;border-bottom:1px solid #f1f5f9;">Tekne / Motor:</td>
                  <td style="padding:10px 0;color:#0f172a;font-weight:700;border-bottom:1px solid #f1f5f9;">${escapeHtml(boat_name)}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:#64748b;border-bottom:1px solid #f1f5f9;">Marina / Konum:</td>
                  <td style="padding:10px 0;color:#0f172a;border-bottom:1px solid #f1f5f9;">${escapeHtml(marina_location)}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:#64748b;border-bottom:1px solid #f1f5f9;">Hizmet Türü:</td>
                  <td style="padding:10px 0;color:#087f93;font-weight:700;border-bottom:1px solid #f1f5f9;">${escapeHtml(service_type)}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:#64748b;vertical-align:top;border-bottom:1px solid #f1f5f9;">Açıklama:</td>
                  <td style="padding:10px 0;color:#334155;border-bottom:1px solid #f1f5f9;">${escapeHtml(message)}</td>
                </tr>
                <tr>
                  <td style="padding:10px 0;color:#64748b;">Kaynak Sayfa:</td>
                  <td style="padding:10px 0;color:#64748b;font-size:12px;">${escapeHtml(source_page)}</td>
                </tr>
              </table>

              <!-- Call to Action -->
              <div style="margin-top:28px;text-align:center;">
                <a href="https://dmmarin.com/admin.html" style="background:#087f93;color:#ffffff;padding:12px 28px;text-decoration:none;border-radius:8px;font-weight:700;font-size:14px;display:inline-block;box-shadow:0 2px 6px rgba(8,127,147,0.3);">
                  Talebi Yönetim Panelinde Aç →
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;padding:20px 28px;border-top:1px solid #e2e8f0;text-align:center;font-size:12px;color:#64748b;line-height:1.5;">
              <p style="margin:0 0 4px 0;"><strong>DM MARİN</strong> · Mobil Marin Servis Hizmetleri</p>
              <p style="margin:0;">Bu e-posta dmmarin.com iletişim formu üzerinden oluşturulan otomatik sistem bildirimidir.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

        const emailRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${resendApiKey.trim()}`
          },
          body: JSON.stringify({
            from: fromEmail,
            to: [adminEmail.trim()],
            reply_to: replyTo,
            subject: cleanSubject,
            text: plainText,
            html: htmlContent,
            headers: {
              'X-Entity-Ref-ID': String(id || Date.now()),
              'Auto-Submitted': 'auto-generated',
              'X-Auto-Response-Suppress': 'OOF, AutoReply',
              'Precedence': 'bulk'
            }
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
