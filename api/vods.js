// Past GTA broadcasts (VODs) from Twitch, most watched first. Needs TWITCH_CLIENT_ID + TWITCH_CLIENT_SECRET.
// Only public, finished broadcasts with a thumbnail are kept, so nothing unavailable shows up. Cached for an hour.
module.exports = async function handler(req, res) {
  const id = process.env.TWITCH_CLIENT_ID, secret = process.env.TWITCH_CLIENT_SECRET;
  const log = {};
  let vods = [];
  if (!id || !secret) log.twitch = 'skipped: TWITCH_CLIENT_ID / TWITCH_CLIENT_SECRET not set';
  else {
    try {
      const t = await (await fetch('https://id.twitch.tv/oauth2/token?client_id=' + id + '&client_secret=' + secret + '&grant_type=client_credentials', { method: 'POST' })).json();
      const H = { headers: { 'Client-ID': id, 'Authorization': 'Bearer ' + t.access_token } };
      const g = await (await fetch('https://api.twitch.tv/helix/games?name=' + encodeURIComponent('Grand Theft Auto VI') + '&name=' + encodeURIComponent('Grand Theft Auto V'), H)).json();
      const seen = new Set();
      for (const game of g.data || []) {
        for (const period of ['week', 'month']) {
          let after = '';
          for (let p = 0; p < 3; p++) {
            const j = await (await fetch('https://api.twitch.tv/helix/videos?first=100&type=archive&sort=views&period=' + period + '&game_id=' + game.id + (after ? '&after=' + after : ''), H)).json();
            (j.data || []).forEach(v => {
              if (seen.has(v.id) || v.viewable !== 'public' || !v.thumbnail_url || /_404\//.test(v.thumbnail_url)) return;
              seen.add(v.id);
              const m = /(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/.exec(v.duration || '') || [];
              vods.push({ id: v.id, lang: v.language, ch: v.user_login, name: v.user_name, t: v.title, views: v.view_count, pub: v.created_at, url: v.url, dur: (+m[1] || 0) * 3600 + (+m[2] || 0) * 60 + (+m[3] || 0), thumb: v.thumbnail_url.replace('%{width}', '640').replace('%{height}', '360') });
            });
            after = j.pagination && j.pagination.cursor;
            if (!after) break;
          }
        }
      }
      vods.sort((a, b) => b.views - a.views);
      vods = vods.slice(0, 1000);
      log.twitch = vods.length + ' past broadcasts';
    } catch (e) { log.twitch = 'error: ' + String(e.message || e).slice(0, 160); }
  }
  console.log('vods', JSON.stringify(log));
  res.setHeader('Cache-Control', vods.length ? 'public, s-maxage=3600, stale-while-revalidate=3600' : 'public, s-maxage=300');
  res.status(200).json({ vods, log });
};
