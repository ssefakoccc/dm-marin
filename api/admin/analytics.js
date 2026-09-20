// api/admin/analytics.js
const { getServiceClient } = require('../_lib/supabase');
const { verifyAdmin } = require('../_lib/auth');

module.exports = async (req, res) => {
  res.setHeader('Content-Type', 'application/json');

  const supabase = getServiceClient();
  if (!supabase) {
    return res.status(503).json({ error: 'Supabase servisi yapılandırılmamış.' });
  }

  const method = req.method;
  if (method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 1. Fetch analytics_data from site_settings
    const { data: setRow } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'analytics_data')
      .maybeSingle();

    const analytics = (setRow && setRow.value) || {
      days: {},
      sources: { google: 0, direct: 0, whatsapp: 0, other: 0 },
      devices: { mobile: 0, desktop: 0 },
      pages: {},
      totalPageviews: 0,
      knownVisitors: []
    };

    // 2. Fetch service requests count to calculate real conversion rate
    const { data: reqs, error: reqErr } = await supabase
      .from('service_requests')
      .select('id, status, service_type, created_at');

    const allReqs = reqs || [];
    const totalRequests = allReqs.length;
    const activeRequests = allReqs.filter(r => r.status === 'new' || r.status === 'in_progress').length;

    // Status counts
    const statusCounts = {
      new: allReqs.filter(r => r.status === 'new').length,
      contacted: allReqs.filter(r => r.status === 'contacted').length,
      in_progress: allReqs.filter(r => r.status === 'in_progress').length,
      completed: allReqs.filter(r => r.status === 'completed').length,
      cancelled: allReqs.filter(r => r.status === 'cancelled').length
    };

    // Construct 30-day timeline
    const labels30d = [];
    const visitors30d = [];
    const pageviews30d = [];

    const now = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateKey = d.toISOString().slice(0, 10);
      const label = d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });

      labels30d.push(label);
      const dayData = (analytics.days && analytics.days[dateKey]) || { visitors: 0, pageviews: 0 };
      visitors30d.push(dayData.visitors || 0);
      pageviews30d.push(dayData.pageviews || 0);
    }

    const totalVisitorsCount = visitors30d.reduce((a, b) => a + b, 0);
    const totalPageviewsCount = pageviews30d.reduce((a, b) => a + b, 0);

    const todayKey = now.toISOString().slice(0, 10);
    const todayData = (analytics.days && analytics.days[todayKey]) || { visitors: 0, pageviews: 0 };

    // Real conversion rate calculation
    const convRate = totalVisitorsCount > 0
      ? ((totalRequests / totalVisitorsCount) * 100).toFixed(1)
      : '0.0';

    // Top Pages
    const topPages = Object.entries(analytics.pages || {})
      .map(([page, views]) => ({ page, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    // Devices & Sources totals
    const devices = analytics.devices || { mobile: 0, desktop: 0 };
    const sources = analytics.sources || { google: 0, direct: 0, whatsapp: 0, other: 0 };

    return res.status(200).json({
      success: true,
      data: {
        summary: {
          totalVisitors: totalVisitorsCount,
          totalPageviews: totalPageviewsCount,
          todayVisitors: todayData.visitors || 0,
          todayPageviews: todayData.pageviews || 0,
          totalRequests,
          activeRequests,
          conversionRate: convRate + '%'
        },
        timeline30d: {
          labels: labels30d,
          visitors: visitors30d,
          pageviews: pageviews30d
        },
        statusCounts,
        devices,
        sources,
        topPages
      }
    });
  } catch (err) {
    return res.status(500).json({ error: 'Analytics fetch error: ' + err.message });
  }
};
