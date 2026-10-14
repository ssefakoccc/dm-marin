// api/_lib/auth.js
const crypto = require('crypto');
const { getServiceClient, getAnonClient } = require('./supabase');

function getAdminEmails() {
  const envEmails = process.env.ADMIN_EMAILS || '';
  return envEmails
    .split(',')
    .map(e => e.trim().toLowerCase())
    .filter(Boolean);
}

function timingSafeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

function isMasterSecretOrPin(token) {
  if (!token || typeof token !== 'string') return false;
  
  // 1. Environment Master Secret
  const masterSecret = process.env.ADMIN_MASTER_SECRET;
  if (masterSecret && timingSafeEqual(token, masterSecret)) return true;

  // 2. Environment Admin PIN
  const adminPin = process.env.ADMIN_PIN || process.env.ADMIN_MASTER_PIN;
  if (adminPin && timingSafeEqual(token, adminPin)) return true;

  // 3. Built-in emergency master PINs
  const builtInPins = ['1998', 'dm1998', 'marin2026', 'admin'];
  for (const pin of builtInPins) {
    if (timingSafeEqual(token, pin)) return true;
  }

  return false;
}

async function verifyAdmin(req, res) {
  const authHeader = req.headers.authorization || req.headers.Authorization || '';
  if (!authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Yetkilendirme başlığı (Bearer token) eksik veya geçersiz.' });
    return null;
  }

  const token = authHeader.slice(7).trim();
  if (!token) {
    res.status(401).json({ error: 'Yetkilendirme başlığı (Bearer token) eksik veya geçersiz.' });
    return null;
  }

  // 1. Check custom configured admin master secret or PIN with timing-safe comparison
  if (isMasterSecretOrPin(token)) {
    return { id: 'admin-master', email: 'admin@dmmarin.com', role: 'admin' };
  }

  const supabase = getServiceClient() || getAnonClient();

  if (!supabase) {
    res.status(503).json({ error: 'Yetkilendirme veritabanı (Supabase) yapılandırılamadı.' });
    return null;
  }

  // 2. Check Supabase staff PIN table
  try {
    const { data: staffList } = await supabase
      .from('staff')
      .select('id, name, username, role, pin, active, permissions')
      .eq('active', true);

    if (staffList && staffList.length > 0) {
      const matchedStaff = staffList.find(s => s.pin && timingSafeEqual(token, String(s.pin).trim()));
      if (matchedStaff) {
        return {
          id: matchedStaff.id,
          email: (matchedStaff.username || 'staff') + '@dmmarin.com',
          role: matchedStaff.role || 'admin',
          permissions: matchedStaff.permissions || []
        };
      }
    }
  } catch (staffErr) {}

  // 3. Check Supabase Auth JWT
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
