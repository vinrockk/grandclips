// GTA clips from every source that has an open API, merged into one list.
//   Twitch Clips     needs TWITCH_CLIENT_ID + TWITCH_CLIENT_SECRET (free Twitch developer app)
//   Kick Clips       no key: Kick's public channel JSON for a list of GTA channels
//   Reddit videos    no key first; if Reddit blocks the server, set REDDIT_CLIENT_ID + REDDIT_CLIENT_SECRET
//   Medal.tv         needs MEDAL_API_KEY (free public key from developers.medal.tv)
//   Rockstar YouTube uses the existing YT_API_KEY (official Rockstar Games channel uploads, about 3 quota units)
// Cached for 30 minutes. Add ?debug=1 to see what each source returned.
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const RUA = 'web:grandclips:0.1 (by /u/grandclips)';
const GTA = /grand theft auto|gta/i;
const KICK = ['xqc', 'hazelgaming', 'thejackzero', 'trainwreckstv', 'adinross', 'buddha', 'iceposeidon', 'suspendas', 'n3on', 'amouranth', 'gta6news', 'summit1g'];
const SUBS = 'GTA6+GTAonline+GTA+GTAV';

function sig(ms) { const c = new AbortController(); setTimeout(() => c.abort(), ms); return c.signal; }
async function json(url, opt) {
  const r = await fetch(url, Object.assign({ signal: sig(8000) }, opt || {}));
  const text = await r.text();
  if (!r.ok) throw new Error('HTTP ' + r.status + ' ' + text.slice(0, 120));
  return JSON.parse(text);
}
// The creator's own tags plus any #hashtags in the description, so search finds videos by them too.
function kwOf(tags, desc) { const h = (String(desc || '').match(/#[\p{L}\p{N}_]+/gu) || []).slice(0, 15).map(x => x.slice(1)); return [...new Set((tags || []).slice(0, 25).concat(h))].join(' ').slice(0, 400); }
function unesc(s) { return String(s || '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'"); }

async function twitch(log) {
  const id = process.env.TWITCH_CLIENT_ID, secret = process.env.TWITCH_CLIENT_SECRET;
  if (!id || !secret) { log.twitch = 'skipped: TWITCH_CLIENT_ID / TWITCH_CLIENT_SECRET not set'; return []; }
  const t = await json('https://id.twitch.tv/oauth2/token?client_id=' + id + '&client_secret=' + secret + '&grant_type=client_credentials', { method: 'POST' });
  const H = { headers: { 'Client-ID': id, 'Authorization': 'Bearer ' + t.access_token } };
  const g = await json('https://api.twitch.tv/helix/games?name=' + encodeURIComponent('Grand Theft Auto VI') + '&name=' + encodeURIComponent('Grand Theft Auto V'), H);
  const out = [];
  for (const game of g.data || []) {
    for (const days of [1, 7, 30]) {
      const since = new Date(Date.now() - days * 864e5).toISOString();
      const s = await json('https://api.twitch.tv/helix/clips?first=100&game_id=' + game.id + '&started_at=' + since, H);
      (s.data || []).forEach(x => out.push({ src: 'Twitch', id: x.id, lang: x.language, t: x.title, u: x.broadcaster_name, ch: x.broadcaster_name, pub: x.created_at, views: x.view_count, thumb: x.thumbnail_url, url: x.url, dur: x.duration }));
    }
  }
  log.twitch = out.length + ' clips';
  return out;
}

async function kick(log) {
  const out = [], errs = [];
  await Promise.all(KICK.map(async slug => {
    try {
      const j = await json('https://kick.com/api/v2/channels/' + slug + '/clips?sort=view&time=month', { headers: { 'User-Agent': UA, 'Accept': 'application/json' } });
      (j.clips || []).forEach(x => {
        const cat = (x.category && x.category.name) || '';
        const kw = [cat].concat(x.tags || []).filter(Boolean).join(' ');
        if (!GTA.test(cat + ' ' + x.title)) return;
        const vid = x.video_url || x.clip_url || '';
        out.push({ src: 'Kick', id: x.id, t: x.title, u: (x.channel && x.channel.username) || slug, ch: (x.channel && x.channel.slug) || slug, pub: x.created_at, views: x.views || x.view_count || 0, thumb: x.thumbnail_url, url: 'https://kick.com/' + slug + '/clips/' + x.id, video: vid, dur: x.duration, vert: false, kw });
      });
    } catch (e) { errs.push(slug + ': ' + String(e.message || e).slice(0, 80)); }
  }));
  log.kick = out.length + ' clips' + (errs.length ? '; errors: ' + errs.slice(0, 4).join(' | ') : '');
  return out;
}

async function redditToken() {
  const id = process.env.REDDIT_CLIENT_ID, secret = process.env.REDDIT_CLIENT_SECRET;
  if (!id || !secret) return null;
  const t = await json('https://www.reddit.com/api/v1/access_token', { method: 'POST', headers: { 'Authorization': 'Basic ' + Buffer.from(id + ':' + secret).toString('base64'), 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': RUA }, body: 'grant_type=client_credentials' });
  return t.access_token;
}
async function redditListing(path, log) {
  try {
    const tok = await redditToken();
    if (tok) return await json('https://oauth.reddit.com' + path, { headers: { 'Authorization': 'Bearer ' + tok, 'User-Agent': RUA } });
    return await json('https://www.reddit.com' + path.replace('?', '.json?'), { headers: { 'User-Agent': RUA } });
  } catch (e) { log.redditError = String(e.message || e).slice(0, 160) + (process.env.REDDIT_CLIENT_ID ? '' : ' (set REDDIT_CLIENT_ID + REDDIT_CLIENT_SECRET if Reddit blocks the server)'); return null; }
}
async function reddit(log) {
  const out = [];
  for (const t of ['day', 'week', 'month']) {
    const j = await redditListing('/r/' + SUBS + '/top?t=' + t + '&limit=100&raw_json=1', log);
    if (!j) break;
    (j.data.children || []).forEach(({ data: p }) => {
      const v = p.is_video || p.post_hint === 'hosted:video' || p.post_hint === 'rich:video';
      if (!v || p.over_18) return;
      const img = p.preview && p.preview.images && p.preview.images[0];
      const rv = p.secure_media && p.secure_media.reddit_video;
      out.push({ src: 'Reddit', id: p.id, t: unesc(p.title), u: 'u/' + p.author, ch: 'r/' + p.subreddit, sub: p.subreddit, pub: new Date(p.created_utc * 1000).toISOString(), score: p.score, comments: p.num_comments, thumb: img ? unesc(img.source.url) : (/^http/.test(p.thumbnail) ? p.thumbnail : ''), url: 'https://www.reddit.com' + p.permalink, permalink: p.permalink, vert: !!(rv && rv.height > rv.width) });
    });
  }
  log.reddit = out.length + ' videos';
  return out;
}

async function medal(log) {
  const key = process.env.MEDAL_API_KEY;
  if (!key) { log.medal = 'skipped: MEDAL_API_KEY not set'; return []; }
  const H = { headers: { 'Authorization': key } };
  const cats = await json('https://developers.medal.tv/v1/categories', H);
  const list = Array.isArray(cats) ? cats : (cats.categories || []);
  const gta = list.filter(c => GTA.test(c.categoryName || c.name || ''));
  log.medalCategories = gta.map(c => (c.categoryName || c.name) + ':' + (c.categoryId || c.id)).join(', ');
  const out = [];
  for (const c of gta.slice(0, 3)) {
    for (const ep of ['trending', 'latest']) {
      const j = await json('https://developers.medal.tv/v1/' + ep + '?limit=100&categoryId=' + (c.categoryId || c.id), H);
      (j.contentObjects || []).forEach(x => {
        const m = /src=['"]([^'"]+)['"]/.exec(x.embedIframeCode || '');
        out.push({ src: 'Medal', id: String(x.contentId).replace(/^cid/, ''), t: x.contentTitle, u: (x.credits || '').replace(/^Credits to\s*/i, '').split(' (')[0] || 'Medal', pub: x.createdTimestamp ? new Date(x.createdTimestamp).toISOString() : null, views: x.contentViews || 0, likes: x.contentLikes || 0, thumb: x.contentThumbnail, url: x.directClipUrl, kw: c.categoryName || c.name || '', embed: m ? m[1] : '' });
      });
    }
  }
  log.medal = out.length + ' clips';
  return out;
}

async function rockstar(log) {
  const key = process.env.YT_API_KEY;
  if (!key) { log.rockstar = 'skipped: YT_API_KEY not set'; return []; }
  const ch = await json('https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=RockstarGames&key=' + key);
  const up = ch.items && ch.items[0] && ch.items[0].contentDetails.relatedPlaylists.uploads;
  if (!up) { log.rockstar = 'channel not found'; return []; }
  const pl = await json('https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=50&playlistId=' + up + '&key=' + key);
  const ids = (pl.items || []).map(i => i.contentDetails.videoId);
  if (!ids.length) return [];
  const v = await json('https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=' + ids.join(',') + '&key=' + key);
  const out = (v.items || []).map(x => {
    const m = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/.exec(x.contentDetails.duration || '') || [];
    const dur = (+m[1] || 0) * 3600 + (+m[2] || 0) * 60 + (+m[3] || 0);
    return { src: 'Rockstar', id: x.id, t: x.snippet.title, u: 'Rockstar Games', pub: x.snippet.publishedAt, lang: x.snippet.defaultAudioLanguage || '', kw: kwOf(x.snippet.tags, x.snippet.description), views: +(x.statistics.viewCount || 0), dur, short: dur > 0 && dur <= 60 };
  });
  log.rockstar = out.length + ' official videos';
  return out;
}

module.exports = async function handler(req, res) {
  const debug = req.query.debug === '1';
  const log = {};
  const jobs = { twitch, kick, reddit, medal, rockstar };
  const results = await Promise.all(Object.keys(jobs).map(k => jobs[k](log).catch(e => { log[k] = 'error: ' + String(e.message || e).slice(0, 160); return []; })));
  const seen = new Set();
  const clips = results.flat().filter(c => { const k = c.src + ':' + c.id; if (seen.has(k)) return false; seen.add(k); return true; });
  console.log('clips', JSON.stringify(log));
  res.setHeader('Cache-Control', 'public, s-maxage=1800, stale-while-revalidate=3600');
  res.status(200).json(debug ? { log, count: clips.length, sample: clips.slice(0, 3) } : { clips, log, fetchedAt: new Date().toISOString() });
};
