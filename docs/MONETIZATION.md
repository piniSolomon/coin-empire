# How to Start Earning Money from Coin Empire

## Option 1: Google AdSense (Recommended for own site)

### Steps:
1. Go to https://adsense.google.com/start/
2. Sign in with your Google account
3. Add your site URL: `pinisolomon.github.io`
4. Wait for approval (usually 1-3 days for new sites)
5. Once approved, copy your Publisher ID (format: `ca-pub-1234567890123456`)
6. Edit `game/index.html` — replace `ca-pub-XXXXXXX` with your real ID
7. Push to deploy: `git add . && git commit -m "Add AdSense ID" && git push`

### Requirements for approval:
- Site must have real content (our game qualifies)
- Must have a privacy policy page (TODO: create one)
- Must comply with AdSense policies (no fake clicks, no porn, etc.)

### Revenue: 
- Display ads: ~$1-3 eCPM
- The Ad Placement API rewarded/interstitial are already integrated in the code

---

## Option 2: GameDistribution (Instant, for game portals)

### Steps:
1. Go to https://developer.gamedistribution.com/
2. Sign up as a developer
3. Submit "Coin Empire" as a new game
4. Get your Game ID
5. The game will be distributed on 10,000+ game portal sites with ads
6. Revenue share: 50-70% to you

### How to submit:
- Upload the game/index.html file
- Set game name: "Coin Empire"
- Category: Idle, Clicker
- They handle ads automatically on their portals

---

## Option 3: CrazyGames (Higher revenue per player)

### Steps:
1. Go to https://developer.crazygames.com/
2. Submit game for review
3. If accepted, they host and monetize it
4. Revenue share: up to 50%
5. Higher traffic than self-hosted

---

## Current Ad Integration Status
- Google Ad Placement API script tag: READY (needs real publisher ID)
- Rewarded ads: READY (2x boost, offline earnings double, collect double)
- Interstitial ads: READY (on prestige)
- Banner slot: READY (bottom of page)
- Ad SDK fallback: Simulated ads work when real SDK not loaded

## What the Agent Can Do vs What You Need to Do
| Task | Who |
|------|-----|
| Code integration | Agent (DONE) |
| AdSense signup | You (needs your Google account) |
| GameDistribution submission | You (needs account creation) |
| Privacy policy page | Agent (can create) |
| Replace publisher ID | Agent (once you provide it) |
