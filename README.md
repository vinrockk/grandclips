# GRANDCLIPS

GTA 6 clips, videos, live streams and posts from every platform in one place.

- Static site: `index.html`, `app.css`, `swipe.js` / `swipe.css` (phone swipe mode) and `js/*.js`.
- `js/*.js` are built from `src/app.js`. Edit `src/app.js`, then run `python3 tools/split.py` to rebuild them and refresh the cache-busting versions in `index.html`.
- `api/*.js` are Vercel serverless functions that fetch the feeds (YouTube, Twitch, Kick, TikTok, Reddit, Bluesky, news).
- `vercel.json` passes `/kclips/*` through to Kick's clip server so Kick clips can play on the site.

## Environment variables (set in Vercel, never in this repo)

`YT_API_KEY`, `TWITCH_CLIENT_ID`, `TWITCH_CLIENT_SECRET`, `REDDIT_CLIENT_ID`, `REDDIT_CLIENT_SECRET`, `BSKY_HANDLE`, `BSKY_APP_PASSWORD`, and optionally `MEDAL_API_KEY`, `KICK_CLIENT_ID`, `KICK_CLIENT_SECRET`.

## Accounts

Sign-in is Google and Apple only, through Supabase Auth (account.js, avatar.js, api/config.js).

1. Run `supabase/schema.sql` once in the Supabase SQL Editor (profiles, favorites, row-level security, `delete_me()`).
2. Set `SUPABASE_URL` and `SUPABASE_ANON_KEY` in Vercel environment variables, then redeploy.
3. In Supabase Authentication: set the Site URL and redirect URLs to the site's address, and turn on the Google and Apple providers.

Until step 2 is done the sign-in sheet says sign-in isn't switched on yet; the rest of the site works.
Usernames are random two-word names with no numbers (NAME_A × NAME_B in account.js), unique ignoring capitals.
Avatars are drawn from `profiles.avatar_seed`; there are no uploads.
