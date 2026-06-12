# Tech Stack

## Current Stack

### Game Engine
- **Choice**: Vanilla JavaScript + HTML5 + CSS3
- **Why**: Idle games are UI-driven. HTML/CSS handles buttons, numbers, progress bars better than Canvas. Zero dependencies = instant load. Full control for autonomous optimization.

### Hosting
- **Choice**: GitHub Pages
- **Why**: Free, auto-deploys on git push, custom domain support, CDN-backed, perfect for static games.

### Ad Provider
- **Choice**: Google AdSense (Phase 1), Google Ad Manager (Phase 2)
- **Why**: No traffic minimum, easy setup, we own the traffic. Can add rewarded video via Ad Manager once traffic grows. Can also distribute to CrazyGames/GameDistribution portals later for additional revenue.

### Analytics
- **Choice**: TBD — will decide in task #8
- **Candidates**: Custom lightweight event logger with localStorage + simple endpoint, or Google Analytics 4

### Save System
- **Choice**: localStorage
- **Why**: No backend needed. Instant save/load. Works offline. Can add cloud sync later.

### Build System
- **Choice**: None (raw files) for MVP
- **Why**: Single HTML file with inline JS/CSS. No build step needed. Simplest possible setup for rapid iteration.
