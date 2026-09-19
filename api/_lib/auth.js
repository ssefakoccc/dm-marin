// api/_lib/auth.js
const { getServiceClient, getAnonClient } = require('./supabase');

function getAdminEmails() {
  const envEmails = process.env.ADMIN_EMAILS || '';
  return envEmails
    .split(',')
    .map(e => e.trim().toLowerCase())
    .filter(Boolean);
}

async function verifyAdmin(req, res) {
  const authHeader = req.headers.authorization || req.headers.Authorization || '';
  if (!authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Yetkilendirme başlığı (Bearer token) eksik.' });
    return null;
  }

  const token = authHeader.slice(7).trim();
  const supabase = getServiceClient() || getAnonClient();

  if (!supabase) {
    res.status(503).json({ error: 'Supabase servis bağlantısı yapılandırılmamış (SUPABASE_URL eksik).' });
    return null;
  }

  try {
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data || !data.user) {
      res.status(401).json({ error: 'Geçersiz veya süresi dolmuş oturum jetonu.' });
      return null;
    }

    const userEmail = (data.user.email || '').trim().toLowerCase();
    const allowedAdmins = getAdminEmails();

    if (allowedAdmins.length > 0 && !allowedAdmins.includes(userEmail)) {
      res.status(403).json({ error: 'Erişim reddedildi: Bu e-posta adresi yönetici listesinde (ADMIN_EMAILS) bulunmuyor.' });
      return null;
    }

    return data.user;
  } catch (err) {
    res.status(500).json({ error: 'Yetkilendirme doğrulaması sırasında sunucu hatası oluştu: ' + err.message });
    return null;
  }
}

module.exports = {
  verifyAdmin,
  getAdminEmails
};
