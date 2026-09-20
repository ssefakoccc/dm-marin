// api/track.js
const { getServiceClient } = require('./_lib/supabase');

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const rawPath = typeof body.path === 'string' ? body.path.slice(0, 150) : '/';
    const ref = typeof body.ref === 'string' ? body.ref.slice(0, 200) : '';
    const vid = typeof body.vid === 'string' ? body.vid.replace(/[^a-zA-Z0-9_-]/g, '').slice(0, 64) : '';
    const device = body.device === 'mobile' ? 'mobile' : 'desktop';

    const supabase = getServiceClient();
    if (!supabase) {
      return res.status(200).json({ ok: true });
    }

    const todayStr = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    // 1. Fetch current analytics record from site_settings
    const { data: setRow } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'analytics_data')
      .maybeSingle();

    let analytics = (setRow && setRow.value) || {
      days: {},
      sources: { google: 0, direct: 0, whatsapp: 0, other: 0 },
      devices: { mobile: 0, desktop: 0 },
      pages: {},
      totalPageviews: 0,
      knownVisitors: []
    };

    if (!analytics.days) analytics.days = {};
    if (!analytics.sources) analytics.sources = { google: 0, direct: 0, whatsapp: 0, other: 0 };
    if (!analytics.devices) analytics.devices = { mobile: 0, desktop: 0 };
    if (!analytics.pages) analytics.pages = {};
    if (!Array.isArray(analytics.knownVisitors)) analytics.knownVisitors = [];

    // Ensure today's day record exists
    if (!analytics.days[todayStr]) {
      analytics.days[todayStr] = {
        date: todayStr,
        pageviews: 0,
        visitors: 0,
        vids: []
      };
    }

    const dayObj = analytics.days[todayStr];
    dayObj.pageviews = (dayObj.pageviews || 0) + 1;
    analytics.totalPageviews = (analytics.totalPageviews || 0) + 1;

    // Unique visitor check
    if (vid) {
      if (!Array.isArray(dayObj.vids)) dayObj.vids = [];
      if (!dayObj.vids.includes(vid)) {
        dayObj.vids.push(vid);
        dayObj.visitors = dayObj.vids.length;
      }
      if (!analytics.knownVisitors.includes(vid)) {
        analytics.knownVisitors.push(vid);
        // Keep knownVisitors array capped at 5000 to prevent unbounded growth
        if (analytics.knownVisitors.length > 5000) {
          analytics.knownVisitors = analytics.knownVisitors.slice(-3000);
        }
      }
    } else {
      dayObj.visitors = (dayObj.visitors || 0) + 1;
    }

    // Device
    const devKey = device === 'mobile' ? 'mobile' : 'desktop';
    analytics.devices[devKey] = (analytics.devices[devKey] || 0) + 1;

    // Source
    let srcKey = 'direct';
    const refLower = (ref || '').toLowerCase();
    if (refLower.includes('google')) srcKey = 'google';
    else if (refLower.includes('wa.me') || refLower.includes('whatsapp')) srcKey = 'whatsapp';
    else if (refLower && !refLower.includes('dmmarin.com')) srcKey = 'other';
    analytics.sources[srcKey] = (analytics.sources[srcKey] || 0) + 1;

    // Page
    const cleanPath = (rawPath.split('?')[0] || '/').replace(/^\//, '') || 'index.html';
    analytics.pages[cleanPath] = (analytics.pages[cleanPath] || 0) + 1;

    // Keep only the last 60 days in analytics.days
    const dayKeys = Object.keys(analytics.days).sort();
    if (dayKeys.length > 60) {
      const toDelete = dayKeys.slice(0, dayKeys.length - 60);
      toDelete.forEach(k => delete analytics.days[k]);
    }

    // Save updated analytics
    await supabase
      .from('site_settings')
      .upsert({
        key: 'analytics_data',
        value: analytics,
        updated_at: new Date().toISOString()
      });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Analytics track error:', err.message);
    return res.status(200).json({ ok: true });
  }
};
