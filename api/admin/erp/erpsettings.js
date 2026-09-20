// api/admin/erp/erpsettings.js — kategoriler, markalar, lokasyonlar
const { getServiceClient } = require('../../_lib/supabase');
const { verifyAdmin } = require('../../_lib/auth');

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const adminUser = await verifyAdmin(req, res);
  if (!adminUser) return;
  const supabase = getServiceClient();
  if (!supabase) return res.status(503).json({ error: 'Supabase bağlantısı yok.' });

  const method = req.method;

  if (method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('key, value')
        .in('key', ['erp_categories', 'erp_brands', 'erp_locations']);
      if (error) return res.status(500).json({ error: error.message });
      const result = {};
      (data || []).forEach(row => { result[row.key] = row.value; });
      return res.status(200).json({ success: true, data: result });
    } catch (err) { return res.status(500).json({ error: err.message }); }
  }

  if (method === 'POST') {
    try {
      const body = req.body || {};
      const updates = [];
      ['erp_categories', 'erp_brands', 'erp_locations'].forEach(key => {
        if (body[key] !== undefined) {
          updates.push({ key, value: body[key], updated_at: new Date().toISOString() });
        }
      });
      if (updates.length === 0) return res.status(400).json({ error: 'Güncellenecek veri yok.' });
      const { error } = await supabase.from('site_settings').upsert(updates);
      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json({ success: true });
    } catch (err) { return res.status(500).json({ error: err.message }); }
  }

  res.setHeader('Allow', 'GET, POST');
  return res.status(405).json({ error: 'Desteklenmeyen metod.' });
};
