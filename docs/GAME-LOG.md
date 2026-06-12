# Development Log

## Log Entries

### 2026-06-12 06:45 UTC
**Task**: #1 - Research optimal game genre for ad revenue on web
**What I did**: Researched game genres across multiple sources — compared idle/incremental, endless runner, puzzle/match-3, merge, and arcade genres on: session length, retention, ad fit, build complexity, eCPM, and web-friendliness.
**Files changed**: docs/DECISIONS.md, docs/TASKS.md
**Result**: Chose idle/incremental game genre. Best fit for ad revenue (long sessions, natural rewarded ad breaks, high retention, web-friendly, fair monetization).
**Next**: Choose tech stack (#2) and ad provider (#3)

### 2026-06-12 07:00 UTC
**Task**: #2 + #3 - Choose tech stack and ad provider
**What I did**: Researched game engines (Phaser, PixiJS, vanilla JS), ad providers (AdSense, GameDistribution, CrazyGames, Adinplay), and hosting options.
**Files changed**: docs/DECISIONS.md, docs/TECH-STACK.md, docs/TASKS.md
**Result**: Vanilla JS + HTML5/CSS (lightest, best for UI-driven idle game), Google AdSense (no traffic minimum, easy setup), GitHub Pages (free, auto-deploy). 
**Next**: Design game concept (#4) — mechanics, progression, art style

### 2026-06-12 07:15 UTC
**Task**: #4 - Design game concept
**What I did**: Designed "Coin Empire" — an idle tycoon game. Defined core mechanics: click-to-earn, businesses as generators, managers for automation, upgrade paths, prestige system ("Go Public"), milestones. Defined ad integration points (rewarded for 2x boost + free manager, interstitial on prestige, small banner).
**Files changed**: docs/DECISIONS.md, docs/TASKS.md
**Result**: Full game concept documented. Emoji-based art for MVP, clean flat design. 5 business tiers from Lemonade Stand to Space Corp.
**Next**: Build MVP (#5) — the big one. Core gameplay loop playable.

### 2026-06-12 07:45 UTC
**Task**: #5 - Build MVP — core gameplay loop playable
**What I did**: Built complete single-file game (game/index.html) with:
- Click-to-earn coin mechanic with floating +1 text
- 5 businesses: Lemonade Stand, Coffee Shop, Restaurant, Tech Startup, Space Corp
- Business buying with exponential cost scaling (1.15x per purchase)
- Manual collection for unmanaged businesses
- Manager hiring for automation
- 9 upgrades (click power, business income, speed)
- Prestige system ("Go Public") with permanent multipliers
- Rewarded ad placeholder (2x boost for 5 min)
- Save/load via localStorage with offline earnings
- Stats panel tracking all metrics
- Responsive design, dark theme, smooth animations
- Tab navigation (Businesses, Upgrades, Prestige, Stats)
**Files changed**: game/index.html (new)
**Result**: Fully playable MVP tested in browser. Click → earn → buy → collect → upgrade → prestige loop confirmed working.
**Next**: Integrate real ad SDK (#6) and deploy to GitHub Pages (#7)

### 2026-06-12 08:00 UTC
**Task**: #6 - Integrate ad SDK + E2E testing + mobile fix
**What I did**:
- Integrated Google Ad Placement API (script tag + adBreak calls for rewarded and interstitial)
- Added `_adsReady` flag to detect real SDK vs simulated fallback
- Fixed mobile touch: added touchstart handler with preventDefault to coin button
- Built comprehensive Playwright E2E test suite (30 tests covering all mechanics)
- Fixed DOM instability issue in tests caused by 50ms innerHTML re-renders
**Files changed**: game/index.html, tests/game.spec.js (new), playwright.config.js (new), package.json (new)
**Result**: 30/30 E2E tests passing. Mobile touch fixed. Ad SDK integrated with graceful fallback.
**Next**: Deploy to GitHub Pages (#7)
