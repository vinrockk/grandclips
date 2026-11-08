// What the site needs to show a Kick channel's public chat read-only: the channel's chatroom number and
// Kick's current realtime (Pusher) key. Kick has no official chat embed. Kick rotated its Pusher key in
// October 2026, so the key is asked from Kick each time (cached 10 minutes) with the last known key as a fallback.
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
const FALLBACK = { key: '34bf7a0ff419a2a775b9', cluster: 'us2' };
function sig(ms) { const c = new AbortController(); setTimeout(() => c.abort(), ms); return c.signal; }
async function pusherKey(log) {
  try {
    const id = 'gc-' + Math.random().toString(36).slice(2) + Date.now().toString(36);
    const r = await fetch('https://web.kick.com/api/v1/realtime/connection', {
      method: 'POST', signal: sig(6000),
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'User-Agent': UA, 'Origin': 'https://kick.com', 'Referer': 'https://kick.com/' },
      body: JSON.stringify({ client: { id, type: 'web' }, capabilities: { accepted_providers: [{ provider: 'pusher' }] } })
    });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const j = await r.json();
    const c = ((j.data && j.data.connections) || []).find(x => x.provider === 'pusher' && x.credentials && x.credentials.app_key);
    if (!c) throw new Error('no pusher connection in reply');
    return { key: c.credentials.app_key, cluster: c.credentials.cluster || 'us2', from: 'kick' };
  } catch (e) { log.keyError = String(e.message || e).slice(0, 80); return Object.assign({ from: 'fallback' }, FALLBACK); }
}
module.exports = async function handler(req, res) {
  const ch = String(req.query.ch || '').toLowerCase();
  if (!/^[a-z0-9_-]{1,40}$/.test(ch)) { res.status(400).json({ error: 'bad channel' }); return; }
  const log = {};
  let id = null;
  const keyP = pusherKey(log);
  for (const u of ['https://kick.com/api/v2/channels/' + ch, 'https://kick.com/api/v1/channels/' + ch]) {
    try {
      const r = await fetch(u, { headers: { 'User-Agent': UA, 'Accept': 'application/json' }, signal: sig(6000) });
      if (!r.ok) { log.error = 'HTTP ' + r.status; continue; }
      const j = await r.json();
      id = (j.chatroom && j.chatroom.id) || null;
      if (id) break;
    } catch (e) { log.error = String(e.message || e).slice(0, 80); }
  }
  const k = await keyP;
  res.setHeader('Cache-Control', id ? 'public, s-maxage=600, stale-while-revalidate=3600' : 'public, s-maxage=120');
  res.status(200).json({ id, key: k.key, cluster: k.cluster, keyFrom: k.from, log });
};
