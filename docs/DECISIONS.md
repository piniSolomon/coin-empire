# Decision Log

## Decisions

### DEC-001: Game Genre — Idle/Incremental Game (2026-06-12)
**Context**: Need to choose a game genre optimized for ad revenue on web while being genuinely fun and fair.
**Decision**: Build an **idle/incremental game** with light puzzle/strategy elements.
**Alternatives considered**:
1. **Endless runner** (e.g., Subway Surfers style) — High engagement but short sessions, lower ad opportunities per session
2. **Puzzle/Match-3** — Good retention but saturated market, hard to stand out
3. **Merge game** — Trendy but complex to build well, heavy asset requirements
4. **Arcade/casual** (e.g., Flappy Bird) — Viral potential but very short sessions, poor retention
5. **Idle/Incremental** — Long sessions, natural ad break points, high retention, works great on web

**Rationale**:
- **Session length**: Idle games have the longest average sessions (10-30+ min) — more time = more ad opportunities
- **Retention**: Players return daily to check progress — strong D1/D7 retention
- **Natural ad breaks**: Rewarded ads fit perfectly ("Watch ad for 2x production boost") — players WANT to watch
- **Low art barrier**: Can start with simple/minimalist design and iterate
- **Web-friendly**: Idle games work great in browser tabs, even in background
- **Fair monetization**: Rewarded ads feel like a bonus, not a gate. No pay-to-win.
- **Build complexity**: MVP is achievable quickly — click to earn, buy upgrades, prestige loop
- **eCPM**: Idle games on web typically see $2-8 eCPM for rewarded video, $0.50-2 for interstitials

**Reversibility**: Genre is a foundational choice. Changing it means starting over, but the tech stack and infrastructure would carry over.

### DEC-002: Tech Stack — Vanilla JS + HTML5 Canvas (2026-06-12)
**Context**: Need a game engine/framework for an idle/incremental web game.
**Decision**: **Vanilla JavaScript + HTML5 Canvas** — no framework.
**Alternatives considered**:
1. **Phaser 3** — Full game engine, great for complex games, but overkill for an idle game (200KB+ bundle)
2. **PixiJS** — Excellent renderer, but idle games are mostly UI, not rendering-heavy
3. **React/Vue** — Good for UI-heavy apps but adds unnecessary overhead for a game
4. **Vanilla JS + HTML/CSS** — Lightest weight, fastest load, full control, perfect for UI-driven idle games

**Rationale**:
- Idle games are 90% UI (buttons, numbers, progress bars) — HTML/CSS handles this better than Canvas
- Zero dependencies = instant load time, no CDN dependency
- Full control over every aspect — easier to optimize
- Simpler codebase for autonomous agent to modify and improve
- Can always add Canvas layer later for visual effects if needed
- Save game state to localStorage — no backend needed for MVP

**Reversibility**: Easy to migrate to Phaser/Pixi later if we need more complex visuals. The game logic layer stays the same.

### DEC-003: Ad Provider — Google AdSense + future Ad Manager (2026-06-12)
**Context**: Need an ad network for HTML5 web game monetization.
**Decision**: Start with **Google AdSense** (display + auto ads), plan migration to **Google Ad Manager** for rewarded/interstitial video ads once traffic justifies it.
**Alternatives considered**:
1. **Google AdSense** — Easy setup, auto ads, widely used, but limited game-specific ad formats
2. **GameDistribution SDK** — Built for HTML5 games, rewarded video, but requires their portal distribution
3. **CrazyGames SDK** — Good revenue share (50-70%), but games must be on their platform
4. **Adinplay** — Game-focused ad network, good eCPM, but requires traffic minimums

**Rationale**:
- AdSense has no traffic minimum — works from day 1
- Easy to integrate — just a script tag
- Auto ads handle placement intelligently
- We own the game URL and traffic — not locked into a portal
- Can layer in Google Ad Manager rewarded video later for higher eCPM
- Portal distribution (CrazyGames, GameDistribution) can be ADDED later as additional revenue channels

**Reversibility**: Easy to swap ad providers. Just change the ad script tags.

### DEC-004: Hosting — GitHub Pages (2026-06-12)
**Context**: Need free, reliable hosting for a static HTML5 game.
**Decision**: **GitHub Pages** — free, auto-deploys from git push.
**Alternatives**: Vercel (adds complexity), Netlify (similar), self-hosted (costs money).
**Rationale**: Simplest option. Free. Deploys on push. Custom domain supported. Perfect for static game.
**Reversibility**: Can migrate anywhere — it's just static files.

### DEC-005: Game Concept — "Coin Empire" Idle Tycoon (2026-06-12)
**Context**: Need a specific game concept for our idle/incremental game.
**Decision**: Build **"Coin Empire"** — a business tycoon idle game where players build and automate businesses to generate coins.

**Core Mechanics**:
1. **Click to Earn**: Tap/click a coin to earn currency (starting mechanic)
2. **Buy Businesses**: Lemonade Stand → Coffee Shop → Restaurant → Tech Startup → Space Corp (each tier produces more coins/sec)
3. **Hire Managers**: Automate businesses so they produce while idle (the "idle" hook)
4. **Upgrades**: Speed, multiplier, and efficiency upgrades per business
5. **Prestige System**: "Go Public" resets progress but gives permanent multipliers — the long-term retention loop
6. **Milestones**: Achievements that grant bonuses (keeps completionists engaged)
7. **Offline Progress**: Calculate earnings while away — gives reason to return

**Ad Integration Points** (fair, non-intrusive):
- Rewarded ad: "Watch ad for 2x earnings for 5 minutes" (player-initiated)
- Rewarded ad: "Watch ad for free manager" (valuable reward)
- Interstitial: On prestige (natural break, ~every 30-60 min)
- Banner: Small bottom banner (unobtrusive)

**Art Style**: Clean, flat, colorful — emoji-based for MVP (no asset creation needed), upgrade to custom art later.

**Why this specific concept**:
- Theme (money/business) matches the mechanic (earning) — satisfying and intuitive
- Businesses as generators is proven (Adventure Capitalist, Idle Miner)
- Prestige loop creates infinite replayability
- Easy to extend with new business types, events, challenges
- Emoji art means we can ship MVP FAST

**Reversibility**: Theme is cosmetic. Core mechanics (generators + upgrades + prestige) can be re-skinned to any theme.
