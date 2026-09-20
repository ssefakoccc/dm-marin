// api/settings.js
const { getServiceClient } = require('./_lib/supabase');

// Public safe keys whitelist (NEVER expose notification_config, api_keys, tokens)
const PUBLIC_SETTINGS_WHITELIST = [
  'site_info',
  'brands',
  'pages_seo',
  'business_hours',
  'emergency_phone',
  'theme_config',
  'contact_info'
];

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
      .select('key, value');

    if (error) {
      return res.status(200).json({ success: true, data: {} });
    }

    const settingsMap = {};
    (data || []).forEach(item => {
      // SECURITY: Exclude any sensitive keys from public endpoint
      if (PUBLIC_SETTINGS_WHITELIST.includes(item.key) || (!item.key.includes('notification') && !item.key.includes('secret') && !item.key.includes('key') && !item.key.includes('token') && !item.key.includes('admin') && !item.key.includes('inventory'))) {
        settingsMap[item.key] = item.value;
      }
    });

    return res.status(200).json({ success: true, data: settingsMap });
  } catch (err) {
    return res.status(200).json({ success: true, data: {} });
  }
};
