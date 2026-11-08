// Latest screenshot of a live Kick stream, fetched on the server and streamed back.
// Kick's channel JSON gives several possible screenshot addresses and some refuse requests,
// so this collects every candidate, tries each one, and returns the first image that loads.
// Usage: /api/stream-thumb?kick=<slug>   Add &debug=1 to see every attempt.
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

function collect(t, out) {
  if (!t) return;
  if (typeof t === 'string') { if (/^https?:/.test(t)) out.push(t); return; }
  if (Array.isArray(t)) { t.forEach(x => collect(x, out)); return; }
  if (typeof t === 'object') {
    if (t.srcset) String(t.srcset).split(',').map(s => s.trim().split(' ')[0]).reverse().forEach(u => collect(u, out));
    ['src', 'url', 'responsive'].forEach(k => collect(t[k], out));
  }
}

async function getJson(u, log, key) {
  try {
    const r = await fetch(u, { headers: { 'User-Agent': UA, 'Accept': 'application/json' } });
    const text = await r.text();
    log[key] = r.status + ' ' + text.length;
    return r.ok ? JSON.parse(text) : null;
  } catch (e) { log[key] = 'error ' + String(e).slice(0, 80); return null; }
}

module.exports = async function handler(req, res) {
  const slug = String(req.query.kick || '');
  const debug = req.query.debug === '1';
  const log = { tries: [] };
  if (!/^[\w-]{1,40}$/.test(slug)) { res.status(400).json({ error: 'bad slug' }); return; }
  try {
    const cands = [];
    const v2 = await getJson('https://kick.com/api/v2/channels/' + slug, log, 'v2');
    const ls2 = v2 && v2.livestream;
    if (ls2) { log.v2thumb = JSON.stringify(ls2.thumbnail || null).slice(0, 300); collect(ls2.thumbnail, cands); }
    const lv = await getJson('https://kick.com/api/v2/channels/' + slug + '/livestream', log, 'v2livestream');
    const d = lv && (lv.data || lv);
    if (d) { log.v2livestreamThumb = JSON.stringify(d.thumbnail || null).slice(0, 300); collect(d.thumbnail, cands); }
    const v1 = await getJson('https://kick.com/api/v1/channels/' + slug, log, 'v1');
    const ls1 = v1 && v1.livestream;
    if (ls1) { log.v1thumb = JSON.stringify(ls1.thumbnail || null).slice(0, 300); collect(ls1.thumbnail, cands); }
    // Kick's own pages use images.kick.com; if we only got a stream.kick.com address, also try the same path there.
    cands.slice().forEach(u => { const m = u.match(/^https:\/\/stream\.kick\.com\/(.+)$/); if (m) cands.push('https://images.kick.com/' + m[1]); });
    const uniq = [...new Set(cands)].filter(u => /^https:\/\/[\w.-]*kick\.com\//.test(u));
    for (const u of uniq) {
      for (const ref of ['https://kick.com/', null]) {
        const H = { 'User-Agent': UA, 'Accept': 'image/avif,image/webp,image/*,*/*' };
        if (ref) { H.Referer = ref; H.Origin = 'https://kick.com'; }
        try {
          const img = await fetch(u, { headers: H });
          const type = img.headers.get('content-type') || '';
          log.tries.push(img.status + ' ' + type + ' ' + (ref ? 'ref ' : 'noref ') + u.slice(0, 140));
          if (img.ok && type.startsWith('image/')) {
            if (debug) { log.ok = u; res.status(200).json(log); return; }
            const buf = Buffer.from(await img.arrayBuffer());
            res.setHeader('Content-Type', type);
            res.setHeader('Cache-Control', 'public, s-maxage=120, max-age=60');
            res.status(200).send(buf);
            return;
          }
        } catch (e) { log.tries.push('error ' + String(e).slice(0, 60) + ' ' + u.slice(0, 100)); }
      }
    }
    res.status(404).json(debug ? log : { error: 'no thumbnail' });
  } catch (e) {
    log.error = String(e);
    res.status(502).json(debug ? log : { error: 'failed' });
  }
};
