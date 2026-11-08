// Up to 1,000 GTA posts and news stories for the Threads tab.
//   Reddit   top and hot posts from GTA subreddits, several pages each (no key first; REDDIT_CLIENT_ID + REDDIT_CLIENT_SECRET if blocked)
//   Bluesky  post search across several GTA searches, several pages each (no key first; BSKY_HANDLE + BSKY_APP_PASSWORD if Bluesky requires sign-in)
//   News     Google News search for GTA 6 plus RSS feeds from GTA and gaming sites, filtered to GTA stories
// X needs its paid API, so X posts stay hand-picked for now.
// Cached for 15 minutes. Add ?debug=1 to see what each source returned.
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const RUA = 'web:grandclips:0.1 (by /u/grandclips)';
const GTA = /grand theft auto|\bgta\b|gta ?(vi|6|v|5|online)|vice city|leonida|rockstar/i;
const SUBS = 'GTA6+GTAonline+GTA+GTAV';
const MAX = 1000;
const LISTINGS = [['top', 'day', 1], ['top', 'week', 3], ['top', 'month', 3], ['hot', '', 2]];
const BSKY_QUERIES = ['GTA 6', 'GTA VI', '#GTA6', 'GTA6', 'Grand Theft Auto', 'Vice City'];
const FEEDS = [
  { site: 'Google News', urls: ['https://news.google.com/rss/search?q=%22GTA+6%22+OR+%22GTA+VI%22+when:7d&hl=en-US&gl=US&ceid=US:en'] },
  { site: 'IGN', urls: ['https://feeds.feedburner.com/ign/games-all', 'https://feeds.ign.com/ign/games-all'] },
  { site: 'Rockstar Intel', urls: ['https://www.rockstarintel.com/feed', 'https://rockstarintel.com/feed/'] },
  { site: 'GTAForums', urls: ['https://gtaforums.com/rss/1-gtaforums-news.xml/', 'https://gtaforums.com/forum/389-grand-theft-auto-vi.xml/'] },
  { site: 'GTA BOOM', urls: ['https://www.gtaboom.com/feed/'] },
  { site: 'Dexerto', urls: ['https://www.dexerto.com/feed/'] },
  { site: 'VGC', urls: ['https://www.videogameschronicle.com/feed/'] },
  { site: 'GameSpot', urls: ['https://www.gamespot.com/feeds/news/'] },
  { site: 'PC Gamer', urls: ['https://www.pcgamer.com/rss/'] },
  { site: 'Eurogamer', urls: ['https://www.eurogamer.net/feed/news'] },
  { site: 'Polygon', urls: ['https://www.polygon.com/rss/index.xml'] },
  { site: 'Kotaku', urls: ['https://kotaku.com/rss'] }
];

function sig(ms) { const c = new AbortController(); setTimeout(() => c.abort(), ms); return c.signal; }
async function get(url, opt) {
  const r = await fetch(url, Object.assign({ signal: sig(8000) }, opt || {}));
  const text = await r.text();
  if (!r.ok) throw new Error('HTTP ' + r.status + ' ' + text.slice(0, 100));
  return text;
}
async function json(url, opt) { return JSON.parse(await get(url, opt)); }
function unesc(s) { return String(s || '').replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#0?39;|&#8217;|&rsquo;/g, '’').replace(/&#8216;|&lsquo;/g, '‘').replace(/&#822[01];|&[lr]dquo;/g, '"').replace(/&#8211;|&ndash;/g, '–').replace(/&#8212;|&mdash;/g, '—').replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n)).replace(/&nbsp;/g, ' '); }
function strip(s) { return unesc(s).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim(); }

async function reddit(log) {
  let tok = null;
  try {
    if (process.env.REDDIT_CLIENT_ID && process.env.REDDIT_CLIENT_SECRET) {
      const t = await json('https://www.reddit.com/api/v1/access_token', { method: 'POST', headers: { 'Authorization': 'Basic ' + Buffer.from(process.env.REDDIT_CLIENT_ID + ':' + process.env.REDDIT_CLIENT_SECRET).toString('base64'), 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': RUA }, body: 'grant_type=client_credentials' });
      tok = t.access_token;
    }
  } catch (e) { log.redditAuth = String(e.message || e).slice(0, 120); }
  const out = [], errs = [];
  await Promise.all(LISTINGS.map(async ([sort, t, pages]) => {
    let after = '';
    for (let i = 0; i < pages; i++) {
      const path = '/r/' + SUBS + '/' + sort + '?limit=100&raw_json=1' + (t ? '&t=' + t : '') + (after ? '&after=' + after : '');
      try {
        const j = tok ? await json('https://oauth.reddit.com' + path, { headers: { 'Authorization': 'Bearer ' + tok, 'User-Agent': RUA } })
          : await json('https://www.reddit.com' + path.replace('?', '.json?'), { headers: { 'User-Agent': RUA } });
        (j.data.children || []).forEach(({ data: p }) => {
          if (p.over_18 || p.stickied || p.is_video || p.post_hint === 'hosted:video' || p.post_hint === 'rich:video') return;
          const img = p.preview && p.preview.images && p.preview.images[0];
          out.push({ src: 'Reddit', id: p.id, t: p.title + (p.selftext ? ' — ' + p.selftext.slice(0, 200) : ''), u: p.author, sub: p.subreddit, pub: new Date(p.created_utc * 1000).toISOString(), score: p.score, comments: p.num_comments, thumb: img ? img.source.url : '', url: 'https://www.reddit.com' + p.permalink, permalink: p.permalink });
        });
        after = j.data.after;
        if (!after) break;
      } catch (e) { errs.push(sort + (t ? '/' + t : '') + ': ' + String(e.message || e).slice(0, 80)); break; }
    }
  }));
  log.reddit = out.length + ' posts' + (tok ? ' (signed in)' : ' (no key)') + (errs.length ? '; errors: ' + errs.slice(0, 3).join(' | ') : '');
  return out;
}

async function bskySearch(base, headers) {
  const all = [];
  let firstErr = null, ok = 0;
  await Promise.all(BSKY_QUERIES.map(async q => {
    for (const sort of ['top', 'latest']) {
      let cursor = '';
      for (let i = 0; i < 2; i++) {
        try {
          const j = await json(base + '/xrpc/app.bsky.feed.searchPosts?sort=' + sort + '&limit=100&lang=en&q=' + encodeURIComponent(q) + (cursor ? '&cursor=' + encodeURIComponent(cursor) : ''), { headers });
          ok++;
          (j.posts || []).forEach(p => all.push(p));
          cursor = j.cursor;
          if (!cursor) break;
        } catch (e) { firstErr = firstErr || e; break; }
      }
    }
  }));
  if (!ok && firstErr) throw firstErr;
  return all;
}
async function bluesky(log) {
  let posts;
  try { posts = await bskySearch('https://public.api.bsky.app', { 'Accept': 'application/json' }); log.bluesky = 'public search'; }
  catch (e) {
    log.blueskyPublic = String(e.message || e).slice(0, 120);
    const id = process.env.BSKY_HANDLE, pw = process.env.BSKY_APP_PASSWORD;
    if (!id || !pw) { log.bluesky = 'needs BSKY_HANDLE + BSKY_APP_PASSWORD (Bluesky app password)'; return []; }
    const s = await json('https://bsky.social/xrpc/com.atproto.server.createSession', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ identifier: id, password: pw }) });
    posts = await bskySearch('https://bsky.social', { 'Authorization': 'Bearer ' + s.accessJwt });
    log.bluesky = 'signed-in search';
  }
  const seen = new Set();
  const out = posts.filter(p => { if (seen.has(p.uri)) return false; seen.add(p.uri); return GTA.test((p.record && p.record.text) || ''); }).map(p => {
    const rkey = p.uri.split('/').pop();
    const img = p.embed && ((p.embed.images && p.embed.images[0] && p.embed.images[0].thumb) || (p.embed.thumbnail) || (p.embed.external && p.embed.external.thumb));
    return { src: 'Bluesky', lang: (p.record && p.record.langs && p.record.langs[0]) || '', id: rkey, did: p.author.did, uri: p.uri, cid: p.cid, t: (p.record && p.record.text) || '', u: p.author.handle, name: p.author.displayName, pub: p.indexedAt, score: (p.likeCount || 0) + 2 * (p.repostCount || 0), thumb: img || '', url: 'https://bsky.app/profile/' + p.author.handle + '/post/' + rkey };
  });
  log.bluesky += ': ' + out.length + ' posts';
  return out;
}

function rss(xml, site) {
  const items = xml.split(/<item[\s>]/i).slice(1).concat(xml.split(/<entry[\s>]/i).slice(1));
  return items.map(it => {
    const tag = n => { const m = new RegExp('<' + n + '[^>]*>([\\s\\S]*?)</' + n + '>', 'i').exec(it); return m ? m[1] : ''; };
    const link = tag('link') || ((/<link[^>]+href="([^"]+)"/i.exec(it) || [])[1] || '');
    const img = (/<media:(?:content|thumbnail)[^>]+url="([^"]+)"/i.exec(it) || /<enclosure[^>]+url="([^"]+)"/i.exec(it) || /<img[^>]+src="([^"]+)"/i.exec(unesc(it)) || [])[1] || '';
    // Google News names the original site in <source>, and ends each title with " - Site".
    const from = site === 'Google News' ? strip(tag('source')) || site : site;
    let title = strip(tag('title'));
    if (site === 'Google News' && from && title.endsWith(' - ' + from)) title = title.slice(0, -(from.length + 3));
    const desc = site === 'Google News' ? '' : strip(tag('description') || tag('summary') || tag('content:encoded')).slice(0, 220);
    return { src: 'News', site: from, id: unesc(link).trim(), t: title, desc, u: from, pub: new Date(tag('pubDate') || tag('published') || tag('updated') || tag('dc:date') || Date.now()).toISOString(), thumb: unesc(img), url: unesc(link).trim() };
  }).filter(x => x.url && x.t && GTA.test(x.t + ' ' + x.desc));
}
async function news(log) {
  const out = [];
  await Promise.all(FEEDS.map(async f => {
    for (const u of f.urls) {
      try { const items = rss(await get(u, { headers: { 'User-Agent': UA, 'Accept': 'application/rss+xml, application/xml, text/xml, */*' } }), f.site); log['news:' + f.site] = items.length + ' GTA stories'; items.forEach(i => out.push(i)); return; }
      catch (e) { log['news:' + f.site] = 'error ' + u + ': ' + String(e.message || e).slice(0, 80); }
    }
  }));
  return out;
}

module.exports = async function handler(req, res) {
  const debug = req.query.debug === '1';
  const log = {};
  const jobs = { reddit, bluesky, news };
  const results = await Promise.all(Object.keys(jobs).map(k => jobs[k](log).catch(e => { log[k] = 'error: ' + String(e.message || e).slice(0, 160); return []; })));
  const seen = new Set();
  const all = results.flat().filter(p => { const k = p.src + ':' + (p.src === 'News' ? p.t.toLowerCase() : p.id); if (seen.has(k)) return false; seen.add(k); return true; });
  // Keep the 1,000 most talked-about: posts ranked by score within each source, so one source can't crowd out the rest.
  const by = {};
  all.forEach(p => { (by[p.src] = by[p.src] || []).push(p); });
  Object.values(by).forEach(l => l.sort((a, b) => (b.score || 0) - (a.score || 0) || new Date(b.pub) - new Date(a.pub)));
  const posts = [];
  const lists = Object.values(by);
  for (let i = 0; posts.length < MAX && lists.some(l => i < l.length); i++) lists.forEach(l => { if (i < l.length && posts.length < MAX) posts.push(l[i]); });
  log.total = posts.length + ' of ' + all.length;
  console.log('posts', JSON.stringify(log));
  res.setHeader('Cache-Control', 'public, s-maxage=900, stale-while-revalidate=1800');
  res.status(200).json(debug ? { log, count: posts.length, sample: posts.slice(0, 3) } : { posts, log, fetchedAt: new Date().toISOString() });
};
