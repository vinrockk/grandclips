# GRANDCLIPS

GTA 6 clips, videos, live streams and posts from every platform in one place.

- Static site: `index.html`, `app.css`, `swipe.js` / `swipe.css` (phone swipe mode) and `js/*.js`.
- `js/*.js` are built from `src/app.js`. Edit `src/app.js`, then run `python3 tools/split.py` to rebuild them and refresh the cache-busting versions in `index.html`.
- `api/*.js` are Vercel serverless functions that fetch the feeds (YouTube, Twitch, Kick, TikTok, Reddit, Bluesky, news).
- `vercel.json` passes `/kclips/*` through to Kick's clip server so Kick clips can play on the site.

## Environment variables (set in Vercel, never in this repo)

`YT_API_KEY`, `TWITCH_CLIENT_ID`, `TWITCH_CLIENT_SECRET`, `REDDIT_CLIENT_ID`, `REDDIT_CLIENT_SECRET`, `BSKY_HANDLE`, `BSKY_APP_PASSWORD`, and optionally `MEDAL_API_KEY`, `KICK_CLIENT_ID`, `KICK_CLIENT_SECRET`.
