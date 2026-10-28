// functions/api/[[catchall]].js
import configHandler from '../../api/config.js';
import settingsHandler from '../../api/settings.js';
import serviceRequestsHandler from '../../api/service-requests.js';
import trackHandler from '../../api/track.js';
import adminServiceRequestsHandler from '../../api/admin/service-requests.js';
import adminAnalyticsHandler from '../../api/admin/analytics.js';
import adminSettingsHandler from '../../api/admin/settings.js';
import adminNotifyTestHandler from '../../api/admin/notify-test.js';
import adminStaffHandler from '../../api/admin/staff.js';
import adminErpProductsHandler from '../../api/admin/erp/products.js';
import adminErpSalesHandler from '../../api/admin/erp/sales.js';
import adminErpCustomersHandler from '../../api/admin/erp/customers.js';

export async function onRequest(context) {
  const { request, env } = context;

  // Handle CORS Preflight for any API request
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Access-Control-Max-Age': '86400'
      }
    });
  }

  // Inject Cloudflare environment variables into global process.env
  if (env) {
    if (typeof globalThis.process === 'undefined') {
      globalThis.process = { env: {} };
    } else if (!globalThis.process.env) {
      globalThis.process.env = {};
    }
    Object.assign(globalThis.process.env, env);
  }

  const url = new URL(request.url);
  let pathname = url.pathname.replace(/\/+$/, ''); // Strip trailing slash

  // Query parameter map
  const query = {};
  for (const [key, value] of url.searchParams.entries()) {
    query[key] = value;
  }

  // Select target handler and apply routing rewrites
  let handler = null;

  // 1. Core Endpoints
  if (pathname === '/api/config') {
    handler = configHandler;
  } else if (pathname === '/api/settings') {
    handler = settingsHandler;
  } else if (pathname === '/api/service-requests') {
    handler = serviceRequestsHandler;
  } else if (pathname === '/api/track') {
    handler = trackHandler;
  }
  // 2. Admin ERP Endpoints & Rewrites
  else if (pathname === '/api/admin/erp/suppliers') {
    query.type = 'suppliers';
    handler = adminErpCustomersHandler;
  } else if (pathname === '/api/admin/erp/purchases') {
    query.type = 'purchases';
    handler = adminErpSalesHandler;
  } else if (pathname === '/api/admin/erp/expenses') {
    query.type = 'expenses';
    handler = adminErpProductsHandler;
  } else if (pathname === '/api/admin/erp/products') {
    handler = adminErpProductsHandler;
  } else if (pathname === '/api/admin/erp/sales') {
    handler = adminErpSalesHandler;
  } else if (pathname === '/api/admin/erp/customers') {
    handler = adminErpCustomersHandler;
  } else if (pathname === '/api/admin/erp/erpsettings') {
    query.type = 'erp';
    handler = adminSettingsHandler;
  }
  // 3. Admin Site Settings Rewrites
  else if (pathname === '/api/admin/seo') {
    query.type = 'seo';
    handler = adminSettingsHandler;
  } else if (pathname === '/api/admin/inventory') {
    query.type = 'inventory';
    handler = adminSettingsHandler;
  } else if (pathname === '/api/admin/brands') {
    query.type = 'brands';
    handler = settingsHandler;
  } else if (pathname === '/api/admin/indexnow') {
    query.type = 'indexnow';
    handler = adminSettingsHandler;
  }
  // 4. Admin Management Endpoints
  else if (pathname === '/api/admin/analytics') {
    handler = adminAnalyticsHandler;
  } else if (pathname === '/api/admin/settings') {
    handler = adminSettingsHandler;
  } else if (pathname === '/api/admin/staff') {
    handler = adminStaffHandler;
  } else if (pathname === '/api/admin/notify-test') {
    handler = adminNotifyTestHandler;
  } else if (pathname === '/api/admin/service-requests') {
    handler = adminServiceRequestsHandler;
  } else if (pathname.startsWith('/api/admin/service-requests/')) {
    const parts = pathname.split('/');
    query.id = parts[parts.length - 1];
    handler = adminServiceRequestsHandler;
  }

  if (!handler) {
    return new Response(JSON.stringify({ error: 'Endpoint bulunamadı: ' + pathname }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  // Parse request body
  let body = {};
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method)) {
    try {
      const rawText = await request.text();
      if (rawText && rawText.trim()) {
        try {
          body = JSON.parse(rawText);
        } catch (e) {
          body = rawText;
        }
      }
    } catch (e) {
      body = {};
    }
  }

  // Build lowercased headers object
  const headers = {};
  for (const [k, v] of request.headers.entries()) {
    headers[k.toLowerCase()] = v;
  }

  const req = {
    method: request.method,
    url: request.url,
    headers,
    query,
    body,
    socket: {
      remoteAddress: request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || '127.0.0.1'
    }
  };

  let statusCode = 200;
  const resHeaders = new Headers();
  resHeaders.set('Access-Control-Allow-Origin', '*');

  return new Promise(async (resolve) => {
    let resolved = false;

    const finish = (content) => {
      if (resolved) return;
      resolved = true;
      resolve(new Response(content, {
        status: statusCode,
        headers: resHeaders
      }));
    };

    const res = {
      status(code) {
        statusCode = code;
        return res;
      },
      setHeader(name, value) {
        resHeaders.set(name, value);
        return res;
      },
      getHeader(name) {
        return resHeaders.get(name);
      },
      json(data) {
        if (!resHeaders.has('Content-Type')) {
          resHeaders.set('Content-Type', 'application/json; charset=utf-8');
        }
        finish(JSON.stringify(data));
      },
      send(data) {
        finish(data);
      },
      end(data) {
        finish(data || '');
      }
    };

    try {
      await handler(req, res);
      if (!resolved) {
        finish('');
      }
    } catch (err) {
      console.error(`API Error on [${req.method}] ${pathname}:`, err);
      if (!resolved) {
        statusCode = 500;
        resHeaders.set('Content-Type', 'application/json');
        finish(JSON.stringify({ error: 'Sunucu hatası: ' + err.message }));
      }
    }
  });
}
