// api/admin/erp/products.js (Handles both products and expenses via resource router)
const { getServiceClient } = require('../../_lib/supabase');
const { verifyAdmin } = require('../../_lib/auth');

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  const adminUser = await verifyAdmin(req, res);
  if (!adminUser) return;
  const supabase = getServiceClient();
  if (!supabase) return res.status(503).json({ error: 'Supabase bağlantısı yok.' });

  const isExpense = req.query.type === 'expenses' || (req.url && req.url.includes('expenses'));
  const tableName = isExpense ? 'erp_expenses' : 'erp_products';

  const method = req.method;
  const id = req.query.id;

  if (method === 'GET') {
    try {
      let query = supabase.from(tableName).select('*');
      if (isExpense) {
        query = query.order('date', { ascending: false });
        if (req.query.date) query = query.eq('date', req.query.date);
      } else {
        query = query.order('created_at', { ascending: true });
      }
      const { data, error } = await query;
      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json({ success: true, data: data || [] });
    } catch (err) { return res.status(500).json({ error: err.message }); }
  }

  if (method === 'POST') {
    try {
      const body = req.body || {};
      let insertData = {};

      if (isExpense) {
        insertData = {
          id: (body.id && !body.id.startsWith('e-')) ? body.id : undefined,
          description: body.description || body.desc || '',
          amount: Number(body.amount) || 0,
          category: body.category || '',
          date: body.date || new Date().toISOString().split('T')[0],
          pay_method: body.payMethod || (body.status === 'paid' ? 'Nakit' : 'Bekliyor'),
          operator: body.operator || '',
          notes: body.notes || (body.status ? `Durum: ${body.status}` : '')
        };
      } else {
        insertData = {
          id: body.id || undefined,
          name: body.name || '',
          oem_ref: body.oemRef || '',
          cross_ref: body.crossRef || '',
          code: body.code || '',
          barcode: body.barcode || '',
          brand: body.brand || '',
          category: body.category || '',
          location: body.location || '',
          buy_price: Number(body.buyPrice) || 0,
          sell_price: Number(body.sellPrice) || 0,
          qty: Number(body.qty) || 0,
          min_qty: Number(body.minQty) || 0,
          notes: body.notes || ''
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

      if (isExpense) {
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
      } else {
        if (body.name !== undefined) fields.name = body.name;
        if (body.oemRef !== undefined) fields.oem_ref = body.oemRef;
        if (body.crossRef !== undefined) fields.cross_ref = body.crossRef;
        if (body.code !== undefined) fields.code = body.code;
        if (body.barcode !== undefined) fields.barcode = body.barcode;
        if (body.brand !== undefined) fields.brand = body.brand;
        if (body.category !== undefined) fields.category = body.category;
        if (body.location !== undefined) fields.location = body.location;
        if (body.buyPrice !== undefined) fields.buy_price = Number(body.buyPrice) || 0;
        if (body.sellPrice !== undefined) fields.sell_price = Number(body.sellPrice) || 0;
        if (body.qty !== undefined) fields.qty = Number(body.qty) || 0;
        if (body.minQty !== undefined) fields.min_qty = Number(body.minQty) || 0;
        if (body.notes !== undefined) fields.notes = body.notes;
      }

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
