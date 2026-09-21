// api/admin/erp/purchases.js
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
      const { data, error } = await supabase.from('erp_purchases').select('*').order('date', { ascending: false });
      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json({ success: true, data: data || [] });
    } catch (err) { return res.status(500).json({ error: err.message }); }
  }

  if (method === 'POST') {
    try {
      const body = req.body || {};
      const totalAmount = Number(body.totalTL) || Number(body.total) || 0;
      const itemsList = Array.isArray(body.items) && body.items.length > 0 
        ? body.items 
        : (body.prodName ? [{ prodId: body.prodId, name: body.prodName, qty: body.qty, unitPrice: body.unitPrice, totalTL: totalAmount }] : []);

      const { data, error } = await supabase.from('erp_purchases').insert({
        id: (body.id && !body.id.startsWith('pur-')) ? body.id : undefined,
        supplier_id: (body.supplierId && !body.supplierId.startsWith('s-')) ? body.supplierId : null,
        supplier_name: body.supplierName || '',
        items: itemsList,
        total: totalAmount,
        paid: Number(body.paid) || (body.status === 'paid' ? totalAmount : 0),
        date: body.date || new Date().toISOString().split('T')[0],
        invoice_no: body.invoiceNo || body.id || '',
        operator: body.operator || '',
        notes: body.notes || (body.status ? `Durum: ${body.status}` : '')
      }).select().single();
      if (error) return res.status(500).json({ error: error.message });
      return res.status(201).json({ success: true, data });
    } catch (err) { return res.status(500).json({ error: err.message }); }
  }

  if (method === 'DELETE') {
    if (!id) return res.status(400).json({ error: 'id gerekli' });
    try {
      const { error } = await supabase.from('erp_purchases').delete().eq('id', id);
      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json({ success: true });
    } catch (err) { return res.status(500).json({ error: err.message }); }
  }

  res.setHeader('Allow', 'GET, POST, DELETE');
  return res.status(405).json({ error: 'Desteklenmeyen metod.' });
};
