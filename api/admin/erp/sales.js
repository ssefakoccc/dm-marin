// api/admin/erp/sales.js (Handles both sales and purchases via resource router)
const { getServiceClient } = require('../../_lib/supabase');
const { verifyAdmin } = require('../../_lib/auth');

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const adminUser = await verifyAdmin(req, res);
  if (!adminUser) return;
  const supabase = getServiceClient();
  if (!supabase) return res.status(503).json({ error: 'Supabase bağlantısı yok.' });

  const isPurchase = req.query.type === 'purchases' || (req.url && req.url.includes('purchases'));
  const tableName = isPurchase ? 'erp_purchases' : 'erp_sales';

  const method = req.method;
  const id = req.query.id;

  if (method === 'GET') {
    try {
      let query = supabase.from(tableName).select('*').order(isPurchase ? 'date' : 'created_at', { ascending: false });
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
      let insertData = {};

      if (isPurchase) {
        const totalAmount = Number(body.totalTL) || Number(body.total) || 0;
        const itemsList = Array.isArray(body.items) && body.items.length > 0 
          ? body.items 
          : (body.prodName ? [{ prodId: body.prodId, name: body.prodName, qty: body.qty, unitPrice: body.unitPrice, totalTL: totalAmount }] : []);

        insertData = {
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
        };
      } else {
        insertData = {
          id: (body.id && !body.id.startsWith('POS-') && !body.id.startsWith('SRV-')) ? body.id : undefined,
          invoice_no: body.invoiceNo || body.id || '',
          customer_id: (body.customerId && !body.customerId.startsWith('c-')) ? body.customerId : null,
          customer_name: body.customerName || '',
          boat_name: body.boatName || '',
          items: body.items || [],
          total: Number(body.total) || 0,
          paid: Number(body.paid) || (body.status === 'paid' ? Number(body.total) || 0 : 0),
          discount: Number(body.discount) || 0,
          pay_method: body.payType || body.payMethod || 'cash',
          status: body.status || 'paid',
          date: body.date || new Date().toISOString().split('T')[0],
          operator: body.operator || '',
          notes: body.notes || (body.laborCost ? `İşçilik: ₺${body.laborCost}` : '')
        };
      }

      const { data, error } = await supabase.from(tableName).insert(insertData).select().single();
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
      const { data, error } = await supabase.from(tableName).update(fields).eq('id', id).select().single();
      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json({ success: true, data });
    } catch (err) { return res.status(500).json({ error: err.message }); }
  }

  if (method === 'DELETE') {
    if (!id) return res.status(400).json({ error: 'id gerekli' });
    try {
      const { error } = await supabase.from(tableName).delete().eq('id', id);
      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json({ success: true });
    } catch (err) { return res.status(500).json({ error: err.message }); }
  }

  res.setHeader('Allow', 'GET, POST, PUT, DELETE');
  return res.status(405).json({ error: 'Desteklenmeyen metod.' });
};
