// api/settings.js
const { getServiceClient } = require('./_lib/supabase');

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'public, s-maxage=30, stale-while-revalidate=120');

  const supabase = getServiceClient();
  if (!supabase) {
    return res.status(200).json({ success: true, data: {} });
  }

  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*');

    if (error) {
      return res.status(200).json({ success: true, data: {} });
    }

    const settingsMap = {};
    (data || []).forEach(item => {
      settingsMap[item.key] = item.value;
    });

    return res.status(200).json({ success: true, data: settingsMap });
  } catch (err) {
    return res.status(200).json({ success: true, data: {} });
  }
};
