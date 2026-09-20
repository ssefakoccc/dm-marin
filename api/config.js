// api/config.js
module.exports = (req, res) => {
  res.setHeader("Cache-Control", "no-store, max-age=0");
  res.status(200).json({
    supabaseUrl: process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    supabaseAnonKey: process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    siteUrl: process.env.SITE_URL || "https://dmmarin.com",
    gaMeasurementId: process.env.GA_MEASUREMENT_ID || process.env.NEXT_PUBLIC_GA_ID || "G-2Q19CJBPQB",
    googleSiteVerification: process.env.GOOGLE_SITE_VERIFICATION || "F9gf3XUSAo57zQ4R6rejqJY1pyqXG1cme8AGHtHLHQs",
    configured: Boolean(
      process.env.SUPABASE_URL &&
      (process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
    )
  });
};
