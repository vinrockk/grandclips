// About 1,000 GTA 6 YouTube videos with real view counts, from the official YouTube Data API (YT_API_KEY).
// YouTube caps searches per day, so this uses only 8 searches per refresh. It then reads the upload lists
// of the channels those searches found (1 unit per 50 videos, no search) to reach 1,000 videos.
// Good results are cached for 12 hours; an empty or failed result only for 10 minutes.
// Add ?debug=1 to see how many videos each step returned and any errors (each debug call uses 8 searches).

const JOBS = [
  { q: 'GTA 6', order: 'viewCount', pages: 2 },
  { q: 'GTA 6', order: 'viewCount', days: 7, pages: 1 },
  { q: 'GTA 6', order: 'date', pages: 1 },
  { q: 'GTA 6 trailer', order: 'viewCount', pages: 1 },
  { q: 'GTA 6 leak gameplay', order: 'viewCount', pages: 1 },
  { q: 'GTA 6 news', order: 'viewCount', days: 30, pages: 1 },
  { q: 'GTA 6 shorts', order: 'viewCount', days: 30, pages: 1 }
];
const GTA6 = /gta ?(6|vi)\b|grand theft auto (6|vi)\b|vice city|leonida/i;
const CHANNELS = 40, CHANNEL_PAGES = 2;

const TAGS = [
  ['Trailers', /trailer/i],
  ['Leaks', /leak/i],
  ['Gameplay', /gameplay/i],
  ['Theories', /theor|predict|everything we know|rumou?r|secret|hidden|easter egg/i],
  ['Funny', /funny|meme|\blol\b|troll|fail|\u{1F602}|\u{1F923}/iu],
  ['Vice City', /vice city|leonida|miami|\bkeys\b/i],
  ['Lucia & Jason', /lucia|jason/i],
  ['Map', /\bmap\b/i],
  ['News', /news|release date|delay|price|pre-?order|launch|confirmed|announce/i],
  ['Reactions', /react/i],
  ['Graphics', /graphic|physics|realis|comparison|\bvs\.?\b|details/i]
];

// The creator's own tags plus any #hashtags in the description, so search finds videos by them too.
function kwOf(tags, desc) { const h = (String(desc || '').match(/#[\p{L}\p{N}_]+/gu) || []).slice(0, 15).map(x => x.slice(1)); return [...new Set((tags || []).slice(0, 25).concat(h))].join(' ').slice(0, 400); }
function decode(s) {
  return String(s || '').replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n)).replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
}
function seconds(iso) {
  const m = String(iso || '').match(/P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!m) return 0;
  return (+m[1] || 0) * 86400 + (+m[2] || 0) * 3600 + (+m[3] || 0) * 60 + (+m[4] || 0);
}
async function getJson(url) {
  const r = await fetch(url);
  const j = await r.json();
  if (!r.ok) throw new Error((j.error && j.error.message) || ('HTTP ' + r.status));
  return j;
}

module.exports = async function handler(req, res) {
  const key = process.env.YT_API_KEY;
  const debug = req.query.debug === '1';
  if (!key) { res.status(503).json({ error: 'YT_API_KEY is not set', videos: [] }); return; }
  const log = { jobs: [] };
  const ids = new Set(), chans = {};
  await Promise.all(JOBS.map(async job => {
    let token = '', got = 0;
    try {
      for (let p = 0; p < job.pages; p++) {
        const u = new URL('https://www.googleapis.com/youtube/v3/search');
        u.search = new URLSearchParams(Object.assign({
          key, part: 'snippet', type: 'video', maxResults: '50', q: job.q, order: job.order,
          videoEmbeddable: 'true', safeSearch: 'moderate'
        }, job.days ? { publishedAfter: new Date(Date.now() - job.days * 864e5).toISOString() } : {}, token ? { pageToken: token } : {})).toString();
        const j = await getJson(u.toString());
        (j.items || []).forEach(it => { if (it.id && it.id.videoId) { ids.add(it.id.videoId); got++; const c = it.snippet && it.snippet.channelId; if (c) chans[c] = (chans[c] || 0) + 1; } });
        token = j.nextPageToken;
        if (!token) break;
      }
      log.jobs.push(job.q + ' / ' + job.order + (job.days ? ' / ' + job.days + 'd' : '') + ': ' + got);
    } catch (e) { log.jobs.push(job.q + ': ERROR ' + String(e.message || e).slice(0, 160)); }
  }));
  // The channels that came up most often: read their recent uploads (no search needed) and keep the GTA 6 ones.
  const top = Object.keys(chans).sort((a, b) => chans[b] - chans[a]).slice(0, CHANNELS);
  let fromChannels = 0;
  await Promise.all(top.map(async c => {
    let token = '';
    try {
      for (let p = 0; p < CHANNEL_PAGES; p++) {
        const j = await getJson('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=UU' + c.slice(2) + (token ? '&pageToken=' + token : '') + '&key=' + key);
        (j.items || []).forEach(it => { const v = it.snippet && it.snippet.resourceId && it.snippet.resourceId.videoId; if (v && GTA6.test(decode(it.snippet.title)) && !ids.has(v)) { ids.add(v); fromChannels++; } });
        token = j.nextPageToken;
        if (!token) break;
      }
    } catch (e) { log.channelError = String(e.message || e).slice(0, 120); }
  }));
  log.channels = top.length + ' channels, ' + fromChannels + ' more videos';
  const list = [...ids];
  const batches = [];
  for (let i = 0; i < list.length; i += 50) batches.push(list.slice(i, i + 50));
  const videos = [];
  await Promise.all(batches.map(async b => {
    try {
      const j = await getJson('https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails,status&maxResults=50&id=' + b.join(',') + '&key=' + key);
      (j.items || []).forEach(v => {
        const t = decode(v.snippet.title);
        if (!/gta|grand theft auto/i.test(t + ' ' + (v.snippet.tags || []).join(' '))) return;
        // Skip anything that can't play here: not embeddable, private, unlisted, deleted or still processing.
        if (v.status && (v.status.embeddable === false || (v.status.privacyStatus && v.status.privacyStatus !== 'public') || (v.status.uploadStatus && v.status.uploadStatus !== 'processed'))) return;
        const dur = seconds(v.contentDetails && v.contentDetails.duration);
        const tags = TAGS.filter(([, re]) => re.test(t)).map(([name]) => name);
        videos.push({
          id: v.id, t, ch: decode(v.snippet.channelTitle), pub: v.snippet.publishedAt, lang: v.snippet.defaultAudioLanguage || v.snippet.defaultLanguage || '', kw: kwOf(v.snippet.tags, v.snippet.description),
          views: +(v.statistics.viewCount || 0), likes: +(v.statistics.likeCount || 0),
          dur, short: dur > 0 && (dur <= 60 || /#shorts?\b/i.test(t + ' ' + (v.snippet.description || '').slice(0, 300))),
          tags
        });
      });
    } catch (e) { log.videosError = String(e.message || e).slice(0, 160); }
  }));
  videos.sort((a, b) => b.views - a.views);
  const out = videos.slice(0, 1000);
  log.uniqueIds = list.length; log.kept = out.length;
  console.log('videos', JSON.stringify(log));
  res.setHeader('Cache-Control', out.length ? 'public, s-maxage=43200, stale-while-revalidate=86400' : 'public, s-maxage=600');
  res.status(200).json(debug ? { log, sample: out.slice(0, 5), count: out.length } : { videos: out, fetchedAt: new Date().toISOString() });
};
