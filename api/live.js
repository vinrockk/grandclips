// Who is live right now on Twitch and Kick, with each stream's latest screenshot.
// With API keys (env vars), it lists the top live GTA streams by category:
//   TWITCH_CLIENT_ID + TWITCH_CLIENT_SECRET  -> Twitch Helix API
//   KICK_CLIENT_ID + KICK_CLIENT_SECRET      -> Kick public API
// Without keys, it checks a fixed list of GTA channels:
//   Twitch: the live preview image exists only while a channel is live (offline redirects to a 404 image).
//   Kick:   the channel's public JSON says whether it is live and gives title, viewers, category and screenshot.
// Add ?debug=1 to see what happened for each channel.
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';

const TWITCH = ['rockstargames', 'gta6news', 'tgg_gta', 'papatera_gta6', 'summit1g', 'buddha', 'ramee', 'kyle', 'koil', 'penta', 'xqc', 'sykkuno', 'jakenbakelive', 'lord_kebun', 'zerkaa', 'fanfan'];
const KICK = ['xqc', 'hazelgaming', 'thejackzero', 'trainwreckstv', 'adinross', 'buddha', 'iceposeidon', 'suspendas', 'n3on', 'amouranth'];
const GTA = /grand theft auto|gta/i;

function withTimeout(ms) { const c = new AbortController(); setTimeout(() => c.abort(), ms); return c.signal; }

async function twitchNoKey(ch, log) {
  const url = 'https://static-cdn.jtvnw.net/previews-ttv/live_user_' + ch + '-640x360.jpg';
  try {
    const r = await fetch(url, { redirect: 'manual', headers: { 'User-Agent': UA }, signal: withTimeout(6000) });
    const loc = r.headers.get('location') || '';
    const live = r.status === 200 && !/404_preview/.test(loc);
    log['twitch:' + ch] = r.status + (loc ? ' -> ' + loc.slice(0, 80) : '');
    if (!live) return null;
    return { p: 'Twitch', ch: ch, name: ch, title: '', viewers: null, game: '', thumb: url };
  } catch (e) { log['twitch:' + ch] = 'error ' + String(e).slice(0, 80); return null; }
}

async function kickNoKey(slug, log) {
  for (const u of ['https://kick.com/api/v2/channels/' + slug, 'https://kick.com/api/v1/channels/' + slug]) {
    try {
      const r = await fetch(u, { headers: { 'User-Agent': UA, 'Accept': 'application/json' }, signal: withTimeout(6000) });
      const text = await r.text();
      log['kick:' + slug + (u.includes('/v1/') ? ':v1' : '')] = r.status + ' ' + text.length;
      if (!r.ok) continue;
      const o = JSON.parse(text);
      const ls = o.livestream;
      if (!ls || ls.is_live === false) return null;
      const cats = (ls.categories || []).map(c => c.name).join(', ') || (o.recent_categories || []).map(c => c.name).join(', ');
      // Kick's screenshots don't load on other sites, so covers come through /api/stream-thumb.
      const thumb = '/api/stream-thumb?kick=' + encodeURIComponent(slug);
      log['kickThumb:' + slug] = JSON.stringify(ls.thumbnail || null).slice(0, 200);
      return { p: 'Kick', ch: slug, name: (o.user && o.user.username) || slug, title: ls.session_title || '', viewers: ls.viewer_count != null ? ls.viewer_count : ls.viewers, game: cats, lang: ls.language || (o.livestream && o.livestream.lang) || '', kw: (ls.tags || []).join(' '), thumb: thumb };
    } catch (e) { log['kick:' + slug] = 'error ' + String(e).slice(0, 80); }
  }
  return null;
}

async function twitchWithKey(log) {
  const id = process.env.TWITCH_CLIENT_ID, secret = process.env.TWITCH_CLIENT_SECRET;
  const t = await (await fetch('https://id.twitch.tv/oauth2/token?client_id=' + id + '&client_secret=' + secret + '&grant_type=client_credentials', { method: 'POST' })).json();
  const H = { 'Client-ID': id, 'Authorization': 'Bearer ' + t.access_token };
  const g = await (await fetch('https://api.twitch.tv/helix/games?name=' + encodeURIComponent('Grand Theft Auto VI') + '&name=' + encodeURIComponent('Grand Theft Auto V'), { headers: H })).json();
  const ids = (g.data || []).map(x => x.id);
  log.twitchGames = (g.data || []).map(x => x.name + ':' + x.id).join(', ');
  if (!ids.length) return [];
  // Up to 1,000 live streams, biggest first (Twitch returns them sorted by viewers, 100 per page).
  const all = [];
  let after = '';
  for (let page = 0; page < 10; page++) {
    const s = await (await fetch('https://api.twitch.tv/helix/streams?first=100&' + ids.map(x => 'game_id=' + x).join('&') + (after ? '&after=' + after : ''), { headers: H })).json();
    (s.data || []).forEach(x => all.push(x));
    after = s.pagination && s.pagination.cursor;
    if (!after || !(s.data || []).length) break;
  }
  log.twitchCount = all.length;
  return all.map(x => ({ p: 'Twitch', lang: x.language, kw: (x.tags || []).join(' '), ch: x.user_login, name: x.user_name, title: x.title, viewers: x.viewer_count, game: x.game_name, thumb: x.thumbnail_url.replace('{width}', '640').replace('{height}', '360') }));
}

async function kickWithKey(log) {
  const body = new URLSearchParams({ grant_type: 'client_credentials', client_id: process.env.KICK_CLIENT_ID, client_secret: process.env.KICK_CLIENT_SECRET });
  const t = await (await fetch('https://id.kick.com/oauth/token', { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body })).json();
  const H = { 'Authorization': 'Bearer ' + t.access_token, 'Accept': 'application/json' };
  const c = await (await fetch('https://api.kick.com/public/v1/categories?q=' + encodeURIComponent('Grand Theft Auto'), { headers: H })).json();
  const cats = (c.data || []).filter(x => GTA.test(x.name));
  log.kickCategories = cats.map(x => x.name + ':' + x.id).join(', ');
  const out = [];
  for (const cat of cats.slice(0, 3)) {
    const s = await (await fetch('https://api.kick.com/public/v1/livestreams?limit=100&sort=viewer_count&category_id=' + cat.id, { headers: H })).json();
    (s.data || []).forEach(x => out.push({ p: 'Kick', lang: x.language || '', kw: (x.custom_tags || x.tags || []).join(' '), ch: x.slug || (x.channel && x.channel.slug) || '', name: x.slug || '', title: x.stream_title || '', viewers: x.viewer_count, game: (x.category && x.category.name) || cat.name, thumb: x.slug ? '/api/stream-thumb?kick=' + encodeURIComponent(x.slug) : (x.thumbnail || '') }));
  }
  return out;
}

module.exports = async function handler(req, res) {
  const debug = req.query.debug === '1';
  const log = { mode: {} };
  let streams = [];
  try {
    const jobs = [];
    if (process.env.TWITCH_CLIENT_ID && process.env.TWITCH_CLIENT_SECRET) {
      log.mode.twitch = 'api';
      jobs.push(twitchWithKey(log).catch(e => { log.twitchError = String(e); return []; }));
    } else {
      log.mode.twitch = 'channel list';
      jobs.push(Promise.all(TWITCH.map(c => twitchNoKey(c, log))).then(a => a.filter(Boolean)));
    }
    if (process.env.KICK_CLIENT_ID && process.env.KICK_CLIENT_SECRET) {
      log.mode.kick = 'api';
      jobs.push(kickWithKey(log).catch(e => { log.kickError = String(e); return []; }));
    } else {
      log.mode.kick = 'channel list';
      jobs.push(Promise.all(KICK.map(c => kickNoKey(c, log))).then(a => a.filter(Boolean)));
    }
    streams = (await Promise.all(jobs)).flat();
    // Kick tells us the game: keep only GTA streams. Twitch without a key can't tell, so those stay.
    streams = streams.filter(s => !s.game || GTA.test(s.game) || s.p === 'Twitch' && log.mode.twitch !== 'api');
    streams.sort((a, b) => (b.viewers || 0) - (a.viewers || 0));
  } catch (e) { log.error = String(e); }
  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=120');
  res.status(200).json(debug ? { streams, log } : { streams, mode: log.mode, checkedAt: new Date().toISOString() });
};
