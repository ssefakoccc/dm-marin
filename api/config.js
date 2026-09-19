// api/config.js
module.exports = (req, res) => {
  res.setHeader("Cache-Control", "no-store, max-age=0");
  res.status(200).json({
    supabaseUrl: process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    siteUrl: process.env.SITE_URL || "https://dmmarin.com",
    gaMeasurementId: process.env.GA_MEASUREMENT_ID || process.env.NEXT_PUBLIC_GA_ID || "",
    googleSiteVerification: process.env.GOOGLE_SITE_VERIFICATION || "",
    configured: Boolean(
      (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL) &&
      (process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    )
  });
};
