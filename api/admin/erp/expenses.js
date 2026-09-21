// api/admin/erp/expenses.js
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
      let query = supabase.from('erp_expenses').select('*').order('date', { ascending: false });
      if (req.query.date) query = query.eq('date', req.query.date);
      const { data, error } = await query;
      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json({ success: true, data: data || [] });
    } catch (err) { return res.status(500).json({ error: err.message }); }
  }

  if (method === 'POST') {
    try {
      const body = req.body || {};
      const { data, error } = await supabase.from('erp_expenses').insert({
        id: (body.id && !body.id.startsWith('e-')) ? body.id : undefined,
        description: body.description || body.desc || '',
        amount: Number(body.amount) || 0,
        category: body.category || '',
        date: body.date || new Date().toISOString().split('T')[0],
        pay_method: body.payMethod || (body.status === 'paid' ? 'Nakit' : 'Bekliyor'),
        operator: body.operator || '',
        notes: body.notes || (body.status ? `Durum: ${body.status}` : '')
      }).select().single();
      if (error) return res.status(500).json({ error: error.message });
      return res.status(201).json({ success: true, data });
    } catch (err) { return res.status(500).json({ error: err.message }); }
  }

  if (method === 'PUT') {
    if (!id) return res.status(400).json({ error: 'id gerekli' });
    try {
      const body = req.body || {};
      const fields = {};
      if (body.description !== undefined || body.desc !== undefined) fields.description = body.description || body.desc;
      if (body.amount !== undefined) fields.amount = Number(body.amount) || 0;
      if (body.category !== undefined) fields.category = body.category;
      if (body.date !== undefined) fields.date = body.date;
      if (body.payMethod !== undefined) fields.pay_method = body.payMethod;
      if (body.status !== undefined) {
        fields.notes = `Durum: ${body.status}`;
        if (body.status === 'paid' && !body.payMethod) fields.pay_method = 'Nakit (Ödendi)';
      }
      if (body.notes !== undefined) fields.notes = body.notes;

      const { data, error } = await supabase.from('erp_expenses').update(fields).eq('id', id).select().single();
      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json({ success: true, data });
    } catch (err) { return res.status(500).json({ error: err.message }); }
  }

  if (method === 'DELETE') {
    if (!id) return res.status(400).json({ error: 'id gerekli' });
    try {
      const { error } = await supabase.from('erp_expenses').delete().eq('id', id);
      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json({ success: true });
    } catch (err) { return res.status(500).json({ error: err.message }); }
  }

  res.setHeader('Allow', 'GET, POST, PUT, DELETE');
  return res.status(405).json({ error: 'Desteklenmeyen metod.' });
};
