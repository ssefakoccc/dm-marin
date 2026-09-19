// api/admin/service-requests.js
const { getServiceClient } = require('../_lib/supabase');
const { verifyAdmin } = require('../_lib/auth');

const VALID_STATUSES = ['new', 'contacted', 'in_progress', 'completed', 'cancelled'];

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  // 1. Yönetici Yetkilendirmesi
  const adminUser = await verifyAdmin(req, res);
  if (!adminUser) return; // Yanıt verifyAdmin içinde verildi

  const supabase = getServiceClient();
  if (!supabase) {
    return res.status(503).json({ error: 'Supabase servis bağlantısı yapılandırılmamış.' });
  }

  const method = req.method;

  // GET: Talepleri Listele
  if (method === 'GET') {
    try {
      const statusFilter = req.query.status;
      let query = supabase
        .from('service_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (statusFilter && VALID_STATUSES.includes(statusFilter)) {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;
      if (error) {
        return res.status(500).json({ error: error.message });
      }

      return res.status(200).json({ success: true, count: data.length, data });
    } catch (err) {
      return res.status(500).json({ error: 'Sunucu hatası: ' + err.message });
    }
  }

  // PATCH: Durum veya Not Güncelle
  if (method === 'PATCH') {
    try {
      const id = req.query.id || (req.body && req.body.id);
      if (!id) {
        return res.status(400).json({ error: 'Güncellenecek talep ID belirtilmedi.' });
      }

      const status = req.body && req.body.status;
      if (!status || !VALID_STATUSES.includes(status)) {
        return res.status(400).json({
          error: `Geçersiz durum. Geçerli durumlar: ${VALID_STATUSES.join(', ')}`
        });
      }

      const updatePayload = { status };
      if (req.body.admin_notes !== undefined) {
        updatePayload.admin_notes = req.body.admin_notes;
      }

      const { data, error } = await supabase
        .from('service_requests')
        .update(updatePayload)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      return res.status(200).json({ success: true, data });
    } catch (err) {
      return res.status(500).json({ error: 'Sunucu hatası: ' + err.message });
    }
  }

  // DELETE: Talep Sil
  if (method === 'DELETE') {
    try {
      const id = req.query.id || (req.body && req.body.id);
      if (!id) {
        return res.status(400).json({ error: 'Silinecek talep ID belirtilmedi.' });
      }

      const { error } = await supabase
        .from('service_requests')
        .delete()
        .eq('id', id);

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      return res.status(200).json({ success: true, message: 'Talep başarıyla silindi.' });
    } catch (err) {
      return res.status(500).json({ error: 'Sunucu hatası: ' + err.message });
    }
  }

  res.setHeader('Allow', 'GET, PATCH, DELETE');
  return res.status(405).json({ error: 'Desteklenmeyen HTTP metodu.' });
};
