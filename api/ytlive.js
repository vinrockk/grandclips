// GTA streams live on YouTube right now, from the YouTube Data API (uses YT_API_KEY).
// YouTube caps searches per day, so results are cached for 3 hours (10 minutes if the search failed).
// The creator's own tags plus any #hashtags in the description, so search finds videos by them too.
function kwOf(tags, desc) { const h = (String(desc || '').match(/#[\p{L}\p{N}_]+/gu) || []).slice(0, 15).map(x => x.slice(1)); return [...new Set((tags || []).slice(0, 25).concat(h))].join(' ').slice(0, 400); }
module.exports = async function handler(req, res) {
  const key = process.env.YT_API_KEY;
  if (!key) { res.status(200).json({ streams: [], error: 'YT_API_KEY is not set' }); return; }
  const log = {};
  let streams = [];
  try {
    const s = await (await fetch('https://www.googleapis.com/youtube/v3/search?part=id&type=video&eventType=live&order=viewCount&maxResults=50&videoCategoryId=20&q=' + encodeURIComponent('GTA|Grand Theft Auto') + '&key=' + key)).json();
    if (s.error) throw new Error(s.error.message);
    const ids = (s.items || []).map(i => i.id.videoId).filter(Boolean);
    log.found = ids.length;
    if (ids.length) {
      const v = await (await fetch('https://www.googleapis.com/youtube/v3/videos?part=snippet,liveStreamingDetails&id=' + ids.join(',') + '&key=' + key)).json();
      streams = (v.items || []).filter(x => /gta|grand theft auto/i.test(x.snippet.title + ' ' + (x.snippet.tags || []).join(' '))).map(x => ({
        p: 'YouTube', id: x.id, ch: x.snippet.channelId, name: x.snippet.channelTitle, title: x.snippet.title,
        viewers: x.liveStreamingDetails && x.liveStreamingDetails.concurrentViewers != null ? +x.liveStreamingDetails.concurrentViewers : null,
        game: 'Grand Theft Auto', lang: x.snippet.defaultAudioLanguage || x.snippet.defaultLanguage || '', kw: kwOf(x.snippet.tags, x.snippet.description), thumb: 'https://i.ytimg.com/vi/' + x.id + '/hqdefault_live.jpg'
      }));
      streams.sort((a, b) => (b.viewers || 0) - (a.viewers || 0));
    }
  } catch (e) { log.error = String(e.message || e).slice(0, 160); }
  console.log('ytlive', JSON.stringify(log), streams.length);
  res.setHeader('Cache-Control', log.error ? 'public, s-maxage=600' : 'public, s-maxage=10800, stale-while-revalidate=3600');
  res.status(200).json({ streams, log });
};
