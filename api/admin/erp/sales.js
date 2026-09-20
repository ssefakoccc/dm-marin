// api/admin/erp/sales.js
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
      let query = supabase.from('erp_sales').select('*').order('created_at', { ascending: false });
      if (req.query.date) query = query.eq('date', req.query.date);
      if (req.query.limit) query = query.limit(parseInt(req.query.limit));
      const { data, error } = await query;
      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json({ success: true, data: data || [] });
    } catch (err) { return res.status(500).json({ error: err.message }); }
  }

  if (method === 'POST') {
    try {
      const body = req.body || {};
      const { data, error } = await supabase.from('erp_sales').insert({
        id: body.id || undefined,
        invoice_no: body.invoiceNo || '',
        customer_id: body.customerId || null,
        customer_name: body.customerName || '',
        boat_name: body.boatName || '',
        items: body.items || [],
        total: Number(body.total) || 0,
        paid: Number(body.paid) || 0,
        discount: Number(body.discount) || 0,
        pay_method: body.payMethod || 'cash',
        status: body.status || 'paid',
        date: body.date || new Date().toISOString().split('T')[0],
        operator: body.operator || '',
        notes: body.notes || ''
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
      if (body.status !== undefined) fields.status = body.status;
      if (body.paid !== undefined) fields.paid = Number(body.paid) || 0;
      if (body.notes !== undefined) fields.notes = body.notes;
      const { data, error } = await supabase.from('erp_sales').update(fields).eq('id', id).select().single();
      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json({ success: true, data });
    } catch (err) { return res.status(500).json({ error: err.message }); }
  }

  if (method === 'DELETE') {
    if (!id) return res.status(400).json({ error: 'id gerekli' });
    try {
      const { error } = await supabase.from('erp_sales').delete().eq('id', id);
      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json({ success: true });
    } catch (err) { return res.status(500).json({ error: err.message }); }
  }

  res.setHeader('Allow', 'GET, POST, PUT, DELETE');
  return res.status(405).json({ error: 'Desteklenmeyen metod.' });
};
