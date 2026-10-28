// api/_lib/supabase.js
const { createClient } = require('@supabase/supabase-js');

function getSupabaseUrl() {
  return (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
}

function getSupabaseAnonKey() {
  return (process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim();
}

function getSupabaseServiceRoleKey() {
  return (process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();
}

function getServiceClient() {
  const url = getSupabaseUrl();
  if (!url) return null;
  const key = getSupabaseServiceRoleKey() || getSupabaseAnonKey();
  if (!key) return null;
  return createClient(url, key, {
    auth: { persistSession: false }
  });
}

function getAnonClient() {
  const url = getSupabaseUrl();
  const anonKey = getSupabaseAnonKey();
  if (!url || !anonKey) {
    return null;
  }
  return createClient(url, anonKey, {
    auth: { persistSession: false }
  });
}

module.exports = {
  get supabaseUrl() { return getSupabaseUrl(); },
  get supabaseAnonKey() { return getSupabaseAnonKey(); },
  getServiceClient,
  getAnonClient
};

