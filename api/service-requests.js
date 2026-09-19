// api/service-requests.js
const crypto = require('crypto');
const { getServiceClient } = require('./_lib/supabase');

// Basit in-memory rate limiting (Son 1 dakikada aynı hash'ten max 5 istek)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

function hashIp(rawIp) {
  const salt = process.env.IP_HASH_SALT || 'dm-marin-salt-2026';
  return crypto.createHash('sha256').update((rawIp || 'unknown') + salt).digest('hex');
}

function checkRateLimit(ipHash) {
  const now = Date.now();
  const record = rateLimitMap.get(ipHash);
  if (!record || now - record.startTime > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ipHash, { startTime: now, count: 1 });
    return true;
  }
  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  record.count += 1;
  return true;
}

// Periyodik bellek temizliği
if (!global._cleanupTimer) {
  global._cleanupTimer = setInterval(() => {
    const now = Date.now();
    for (const [key, val] of rateLimitMap.entries()) {
      if (now - val.startTime > RATE_LIMIT_WINDOW) rateLimitMap.delete(key);
    }
  }, 120000);
}

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Sadece POST istekleri kabul edilir.' });
  }

  // 1. IP Hash & Rate Limit Kontrolü (Ham IP asla saklanmaz)
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
  const ipHash = hashIp(clientIp.split(',')[0].trim());

  if (!checkRateLimit(ipHash)) {
    return res.status(429).json({ error: 'Çok fazla istek gönderildi. Lütfen bir dakika bekleyin.' });
  }

  // 2. Honeypot (Spam koruması)
  const body = req.body || {};
  if (body.website || body._hp) {
    // Bot tuzağına düştü; sessizce başarılı dön
    return res.status(200).json({ success: true, message: 'Talebiniz alındı.' });
  }

  // 3. Server-side Validasyon
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const phone = typeof body.phone === 'string' ? body.phone.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const boatName = typeof body.boat_name === 'string' ? body.boat_name.trim() : (body.boat ? String(body.boat).trim() : '');
  const marinaLocation = typeof body.marina_location === 'string' ? body.marina_location.trim() : (body.location ? String(body.location).trim() : '');
  const serviceType = typeof body.service_type === 'string' ? body.service_type.trim() : (body.service ? String(body.service).trim() : '');
  const brand = typeof body.brand === 'string' ? body.brand.trim() : '';
  const model = typeof body.model === 'string' ? body.model.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';
  const preferredContact = body.preferred_contact || (body.callback ? 'telefon' : 'whatsapp');
  const sourcePage = typeof body.source_page === 'string' ? body.source_page.trim() : '/index.html';
  const consent = body.consent !== false;

  if (!name || name.length < 2) {
    return res.status(400).json({ error: 'Lütfen geçerli bir ad soyad girin.' });
  }

  if (!phone || phone.replace(/\D/g, '').length < 10) {
    return res.status(400).json({ error: 'Lütfen en az 10 haneli geçerli bir telefon numarası girin.' });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Lütfen geçerli ve zorunlu bir e-posta adresi girin.' });
  }

  // 4. Supabase DB Kaydı
  const supabase = getServiceClient();

  if (!supabase) {
    // Veritabanı yapılandırması henüz tamamlanmamışsa
    return res.status(503).json({
      error: 'Veritabanı bağlantısı yapılandırılmamış (SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY gerekli).',
      fallback: 'whatsapp'
    });
  }

  try {
    const { data, error } = await supabase
      .from('service_requests')
      .insert([
        {
          name,
          phone,
          email: email || null,
          boat_name: boatName || null,
          marina_location: marinaLocation || null,
          service_type: serviceType || null,
          brand: brand || null,
          model: model || null,
          message: message || null,
          preferred_contact: preferredContact,
          source_page: sourcePage,
          status: 'new',
          consent,
          ip_hash: ipHash
        }
      ])
      .select('id, created_at')
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({ error: 'Talep kaydedilirken veritabanı hatası oluştu: ' + error.message });
    }

    return res.status(201).json({
      success: true,
      id: data.id,
      message: 'Servis talebiniz başarıyla alındı. Ekibimiz en kısa sürede iletişime geçecektir.'
    });
  } catch (err) {
    console.error('Server error on service-requests:', err);
    return res.status(500).json({ error: 'Sunucu hatası: ' + err.message });
  }
};
