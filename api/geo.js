// The visitor's country from Vercel's IP lookup, used to rank that country's language second.
module.exports = function handler(req, res) {
  res.setHeader('Cache-Control', 'private, no-store');
  res.status(200).json({ country: req.headers['x-vercel-ip-country'] || null });
};
