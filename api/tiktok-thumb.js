// Gets a TikTok video's cover on the server (browsers block these requests by CORS).
// 1) oEmbed thumbnail_url  2) fallback: cover URL from TikTok's embed page.
// Streams the image back; if TikTok's image server refuses us, redirects the browser to it.
// Add &debug=1 to see what happened at each step.
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const H = { 'User-Agent': UA, 'Accept-Language': 'en-US,en;q=0.9' };

function unescape(s) {
  return s.replace(/\\u002F/gi, '/').replace(/\\\//g, '/').replace(/&amp;/g, '&');
}

async function fromEmbedPage(id, log) {
  const pages = ['https://www.tiktok.com/embed/v2/' + id, 'https://www.tiktok.com/player/v1/' + id];
  for (const p of pages) {
    try {
      const r = await fetch(p, { headers: Object.assign({ 'Accept': 'text/html' }, H) });
      const html = await r.text();
      log['page:' + p.split('/')[3]] = r.status + ' ' + html.length;
      if (log.debug) {
        const snips = [];
        const re = /cover|tiktokcdn|og:image|poster/gi;
        let x;
        while ((x = re.exec(html)) && snips.length < 6) { snips.push(html.slice(Math.max(0, x.index - 60), x.index + 140)); re.lastIndex = x.index + 200; }
        log['snips:' + p.split('/')[3]] = snips;
      }
      const m = html.match(/"(?:originCover|cover|dynamicCover|coverUrl|poster)"\s*:\s*"(https?:[^"]+)"/i) ||
                html.match(/property="og:image"\s+content="([^"]+)"/) ||
                html.match(/poster="(https?:[^"]+)"/) ||
                html.match(/(https?:(?:\\u002F|\\\/|\/){2}[^"'\s<>]*?tiktokcdn[^"'\s<>]*?(?:\.jpe?g|\.webp|\.image|~tplv[^"'\s<>]*))/i);
      if (m) return unescape(m[1]);
    } catch (e) {
      log['pageError'] = String(e);
    }
  }
  return null;
}

module.exports = async function handler(req, res) {
  const url = req.query.url || '';
  const debug = req.query.debug === '1';
  const log = { debug: debug };
  const m = url.match(/^https:\/\/www\.tiktok\.com\/@[\w.-]+\/video\/(\d+)$/);
  if (!m) { res.status(400).json({ error: 'bad url' }); return; }
  try {
    let thumb = null;
    try {
      const r = await fetch('https://www.tiktok.com/oembed?url=' + encodeURIComponent(url), { headers: Object.assign({ 'Accept': 'application/json' }, H) });
      log.oembedStatus = r.status;
      const text = await r.text();
      try {
        const o = JSON.parse(text);
        log.oembedKeys = Object.keys(o).join(',');
        thumb = o.thumbnail_url || null;
      } catch (e) { log.oembedBody = text.slice(0, 200); }
    } catch (e) { log.oembedError = String(e); }
    if (!thumb) thumb = await fromEmbedPage(m[1], log);
    log.thumb = thumb ? thumb.slice(0, 120) : null;
    if (!thumb) {
      console.log('tiktok-thumb none', JSON.stringify(log));
      res.status(404).json(debug ? log : { error: 'no thumbnail' });
      return;
    }
    const img = await fetch(thumb, { headers: Object.assign({ 'Referer': 'https://www.tiktok.com/' }, H) });
    log.imageStatus = img.status;
    if (debug) { res.status(200).json(log); return; }
    if (!img.ok) {
      res.setHeader('Cache-Control', 'public, s-maxage=3600');
      res.redirect(302, thumb);
      return;
    }
    const buf = Buffer.from(await img.arrayBuffer());
    res.setHeader('Content-Type', img.headers.get('content-type') || 'image/jpeg');
    res.setHeader('Cache-Control', 'public, s-maxage=86400, max-age=3600');
    res.status(200).send(buf);
  } catch (e) {
    log.error = String(e);
    console.log('tiktok-thumb error', JSON.stringify(log));
    res.status(502).json(debug ? log : { error: 'failed' });
  }
};
