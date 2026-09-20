// api/admin/erp/customers.js
const { getServiceClient } = require('../../_lib/supabase');
const { verifyAdmin } = require('../../_lib/auth');

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const adminUser = await verifyAdmin(req, res);
  if (!adminUser) return;
  const supabase = getServiceClient();
  if (!supabase) return res.status(503).json({ error: 'Supabase bağlantısı yok.' });

  const method = req.method;
  const id = req.query.id;

  if (method === 'GET') {
    try {
      const { data, error } = await supabase.from('erp_customers').select('*').order('name', { ascending: true });
      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json({ success: true, data: data || [] });
    } catch (err) { return res.status(500).json({ error: err.message }); }
  }

  if (method === 'POST') {
    try {
      const body = req.body || {};
      const { data, error } = await supabase.from('erp_customers').insert({
        id: body.id || undefined,
        name: body.name || '',
        phone: body.phone || '',
        email: body.email || '',
        boat_name: body.boatName || '',
        boat_type: body.boatType || '',
        engine_brand: body.engineBrand || '',
        engine_model: body.engineModel || '',
        engine_serial: body.engineSerial || '',
        marina: body.marina || '',
        notes: body.notes || '',
        balance: Number(body.balance) || 0
      }).select().single();
      if (error) return res.status(500).json({ error: error.message });
      return res.status(201).json({ success: true, data });
    } catch (err) { return res.status(500).json({ error: err.message }); }
  }

  if (method === 'PUT') {
    if (!id) return res.status(400).json({ error: 'id gerekli' });
    try {
      const body = req.body || {};
      const fields = { updated_at: new Date().toISOString() };
      const allowed = ['name','phone','email','boat_name','boat_type','engine_brand','engine_model','engine_serial','marina','notes','balance'];
      const map = { boatName:'boat_name', boatType:'boat_type', engineBrand:'engine_brand', engineModel:'engine_model', engineSerial:'engine_serial' };
      Object.entries(body).forEach(([k, v]) => {
        const key = map[k] || k;
        if (allowed.includes(key)) fields[key] = v;
      });
      const { data, error } = await supabase.from('erp_customers').update(fields).eq('id', id).select().single();
      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json({ success: true, data });
    } catch (err) { return res.status(500).json({ error: err.message }); }
  }

  if (method === 'DELETE') {
    if (!id) return res.status(400).json({ error: 'id gerekli' });
    try {
      const { error } = await supabase.from('erp_customers').delete().eq('id', id);
      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json({ success: true });
    } catch (err) { return res.status(500).json({ error: err.message }); }
  }

  res.setHeader('Allow', 'GET, POST, PUT, DELETE');
  return res.status(405).json({ error: 'Desteklenmeyen metod.' });
};
