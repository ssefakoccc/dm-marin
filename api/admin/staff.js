// api/admin/staff.js
const { getServiceClient } = require('../_lib/supabase');
const { verifyAdmin } = require('../_lib/auth');

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const adminUser = await verifyAdmin(req, res);
  if (!adminUser) return;

  const supabase = getServiceClient();
  if (!supabase) {
    return res.status(503).json({ error: 'Supabase bağlantısı yapılandırılmamış.' });
  }

  const method = req.method;
  const id = req.query.id;

  // GET: Tüm personeli listele
  if (method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('staff')
        .select('*')
        .order('created_at', { ascending: true });
      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json({ success: true, data: data || [] });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // POST: Yeni personel ekle
  if (method === 'POST') {
    try {
      const body = req.body || {};
      const { username, name, role, phone, birth_date, pin, active, permissions } = body;
      if (!username || !name || !pin) {
        return res.status(400).json({ error: 'username, name ve pin zorunludur.' });
      }
      const { data, error } = await supabase
        .from('staff')
        .insert({
          username: username.trim().toLowerCase(),
          name: name.trim(),
          role: (role || '').trim(),
          phone: (phone || '').trim(),
          birth_date: birth_date || null,
          pin: pin.trim(),
          active: active !== false,
          permissions: Array.isArray(permissions) ? permissions : ['stock_manage', 'service_manage', 'pos_sale']
        })
        .select()
        .single();
      if (error) return res.status(500).json({ error: error.message });
      return res.status(201).json({ success: true, data, message: 'Personel eklendi.' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // PUT: Personeli güncelle
  if (method === 'PUT') {
    if (!id) return res.status(400).json({ error: 'Güncellenecek personel id gerekli.' });
    try {
      const body = req.body || {};
      const updateFields = {};
      if (body.username !== undefined) updateFields.username = body.username.trim().toLowerCase();
      if (body.name !== undefined) updateFields.name = body.name.trim();
      if (body.role !== undefined) updateFields.role = body.role.trim();
      if (body.phone !== undefined) updateFields.phone = body.phone.trim();
      if (body.birth_date !== undefined) updateFields.birth_date = body.birth_date || null;
      if (body.pin !== undefined) updateFields.pin = body.pin.trim();
      if (body.active !== undefined) updateFields.active = body.active;
      if (body.permissions !== undefined) updateFields.permissions = body.permissions;
      updateFields.updated_at = new Date().toISOString();
      const { data, error } = await supabase
        .from('staff')
        .update(updateFields)
        .eq('id', id)
        .select()
        .single();
      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json({ success: true, data, message: 'Personel güncellendi.' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // DELETE: Personeli sil
  if (method === 'DELETE') {
    if (!id) return res.status(400).json({ error: 'Silinecek personel id gerekli.' });
    try {
      const { error } = await supabase.from('staff').delete().eq('id', id);
      if (error) return res.status(500).json({ error: error.message });
      return res.status(200).json({ success: true, message: 'Personel silindi.' });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  res.setHeader('Allow', 'GET, POST, PUT, DELETE');
  return res.status(405).json({ error: 'Desteklenmeyen HTTP metodu.' });
};
