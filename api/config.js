// Public sign-in settings for the browser (account.js). The Supabase URL and anon key are meant to be public;
// what users can read and write is limited by the row-level security rules in supabase/schema.sql.
// Set SUPABASE_URL and SUPABASE_ANON_KEY in Vercel > Settings > Environment Variables.
module.exports = (req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=300');
  res.status(200).json({
    supabaseUrl: process.env.SUPABASE_URL || null,
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY || null
  });
};
