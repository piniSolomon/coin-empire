# Improvement Ideas

## Format
Each idea is scored on:
- **Impact**: How much revenue/engagement improvement expected (1-5)
- **Effort**: How much work required (S/M/L)
- **Confidence**: How sure are we this will work (low/medium/high)

## Queue

### IMP-001: Add sound effects and haptic feedback
- **Impact**: 4 — Satisfying clicks dramatically increase engagement
- **Effort**: S
- **Confidence**: high
- **Details**: Click sound on coin tap, cash register on buy, level-up on prestige. CSS animation pulse on coin.

### IMP-002: Add daily reward / login bonus
- **Impact**: 5 — #1 retention mechanic for idle games
- **Effort**: M
- **Confidence**: high
- **Details**: Day 1: 50 coins, Day 2: 100, Day 3: 200, Day 7: free manager. Tracked in localStorage.

### IMP-003: Add tutorial/onboarding overlay
- **Impact**: 3 — Reduces bounce rate from confused new players
- **Effort**: S
- **Confidence**: medium
- **Details**: Simple arrow pointing to coin "Tap to earn!" then "Buy your first business!" after 10 coins.

### IMP-004: Visual polish — particle effects on click
- **Impact**: 3 — Makes clicking more satisfying, increases session time
- **Effort**: S
- **Confidence**: medium
- **Details**: Small gold particles burst from coin on click using CSS animations.

### IMP-005: Add offline earnings popup with rewarded ad option
- **Impact**: 5 — Natural rewarded ad placement + retention driver
- **Effort**: M
- **Confidence**: high
- **Details**: "You earned X coins while away! Watch ad for 2x?" — most idle games use this.

### IMP-006: Fix innerHTML re-render (DOM stability)
- **Impact**: 2 — Prevents rare UI glitches, improves perf
- **Effort**: M
- **Confidence**: high
- **Details**: Use targeted DOM updates instead of full innerHTML re-render every 50ms. Critical for button reliability.

### IMP-007: Add leaderboard or share-your-score
- **Impact**: 3 — Viral growth mechanic
- **Effort**: M
- **Confidence**: medium
- **Details**: "Share your empire: Level X, $Y total earned" with a share button.

### IMP-008: Add more ad placements — rewarded "double collect"
- **Impact**: 4 — More ad revenue without being intrusive
- **Effort**: S
- **Confidence**: high
- **Details**: After collecting from a business: "Watch ad to double this collection?" — player-initiated, fair.

## Implemented
*None yet.*

## Rejected
*None yet.*
