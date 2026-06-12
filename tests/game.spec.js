// @ts-check
const { test, expect } = require('@playwright/test');

// Clear localStorage before each test for clean state
test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForSelector('#coin-button');
});

// ========== PAGE LOAD ==========

test('page loads with correct title', async ({ page }) => {
    await expect(page).toHaveTitle('Coin Empire - Idle Tycoon');
});

test('page shows 0 coins on fresh start', async ({ page }) => {
    const coins = await page.locator('#coins-display').textContent();
    expect(coins).toBe('0');
});

test('page shows 0 coins/sec on fresh start', async ({ page }) => {
    const cps = await page.locator('#cps-display').textContent();
    expect(cps).toBe('0');
});

test('coin button is visible and clickable', async ({ page }) => {
    const btn = page.locator('#coin-button');
    await expect(btn).toBeVisible();
    await expect(btn).toBeEnabled();
});

test('all 5 businesses are displayed', async ({ page }) => {
    const businesses = ['Lemonade Stand', 'Coffee Shop', 'Restaurant', 'Tech Startup', 'Space Corp'];
    for (const name of businesses) {
        await expect(page.locator(`.business-name:has-text("${name}")`)).toBeVisible();
    }
});

// ========== CLICKING ==========

test('clicking coin earns 1 coin', async ({ page }) => {
    await page.locator('#coin-button').click();
    const coins = await page.evaluate(() => state.coins);
    expect(coins).toBe(1);
});

test('clicking coin 10 times earns 10 coins', async ({ page }) => {
    for (let i = 0; i < 10; i++) {
        await page.locator('#coin-button').click();
    }
    const coins = await page.evaluate(() => state.coins);
    expect(coins).toBe(10);
});

test('click counter increments', async ({ page }) => {
    for (let i = 0; i < 5; i++) {
        await page.locator('#coin-button').click();
    }
    const clicks = await page.evaluate(() => state.totalClicks);
    expect(clicks).toBe(5);
});

test('floating +1 text appears on click', async ({ page }) => {
    await page.locator('#coin-button').click();
    const floats = await page.locator('.click-text').count();
    expect(floats).toBeGreaterThanOrEqual(1);
});

// ========== BUYING BUSINESSES ==========

test('can buy Lemonade Stand with 10 coins', async ({ page }) => {
    // Earn 15 coins via evaluate (avoid DOM re-render race)
    await page.evaluate(() => { state.coins = 15; state.totalCoins = 15; });

    // Buy lemonade stand via JS
    await page.evaluate(() => buyBusiness('lemonade'));

    const result = await page.evaluate(() => ({
        coins: state.coins,
        owned: state.businesses.lemonade.owned,
    }));
    expect(result.owned).toBe(1);
    expect(result.coins).toBe(5); // 15 - 10 = 5
});

test('cannot buy business without enough coins', async ({ page }) => {
    await page.evaluate(() => { state.coins = 5; updateUI(); });
    const buyBtn = page.locator('.business-card').first().locator('.buy-btn:has-text("Buy")');
    await expect(buyBtn).toBeDisabled();
});

test('business cost increases after purchase', async ({ page }) => {
    await page.evaluate(() => { state.coins = 100; state.totalCoins = 100; updateUI(); });

    const firstCost = await page.evaluate(() => getBusinessCost(BUSINESSES[0], 0));
    expect(firstCost).toBe(10);

    await page.evaluate(() => { buyBusiness('lemonade'); });
    const secondCost = await page.evaluate(() => getBusinessCost(BUSINESSES[0], state.businesses.lemonade.owned));
    expect(secondCost).toBeGreaterThan(firstCost);
});

test('buying lemonade unlocks coffee shop', async ({ page }) => {
    // Coffee Shop should be locked initially (disabled buy button)
    const coffeeBtn = page.locator('.business-card').nth(1).locator('.buy-btn');
    await expect(coffeeBtn).toBeDisabled();

    // Buy lemonade
    await page.evaluate(() => { state.coins = 200; state.totalCoins = 200; buyBusiness('lemonade'); updateUI(); });

    // Coffee Shop should now be unlockable (disabled only due to cost, not locked)
    const coffeeCard = page.locator('.business-card').nth(1);
    await expect(coffeeCard).not.toHaveClass(/locked/);
});

// ========== COLLECT (Manual Business) ==========

test('can collect from unmanaged business', async ({ page }) => {
    await page.evaluate(() => {
        state.coins = 20;
        state.totalCoins = 20;
        buyBusiness('lemonade');
    });

    const coinsBefore = await page.evaluate(() => state.coins);

    // Use evaluate to avoid DOM re-render race
    await page.evaluate(() => collectBusiness('lemonade'));

    const coinsAfter = await page.evaluate(() => state.coins);
    expect(coinsAfter).toBeGreaterThan(coinsBefore);
});

// ========== MANAGERS ==========

test('can hire manager for automation', async ({ page }) => {
    await page.evaluate(() => {
        state.coins = 200;
        state.totalCoins = 200;
        buyBusiness('lemonade');
        updateUI();
    });

    // Click hire manager link
    const hireLink = page.locator('a:has-text("Hire")');
    await expect(hireLink).toBeVisible();
    await hireLink.click();

    const hasManager = await page.evaluate(() => state.managers.lemonade);
    expect(hasManager).toBe(true);
});

test('manager produces income automatically', async ({ page }) => {
    await page.evaluate(() => {
        state.coins = 200;
        state.totalCoins = 200;
        buyBusiness('lemonade');
        buyManager('lemonade');
        updateUI();
    });

    const coinsBefore = await page.evaluate(() => state.coins);

    // Wait for at least one production cycle (lemonade = 1000ms)
    await page.waitForTimeout(1500);

    const coinsAfter = await page.evaluate(() => state.coins);
    expect(coinsAfter).toBeGreaterThan(coinsBefore);
});

// ========== UPGRADES ==========

test('upgrades tab shows all upgrades', async ({ page }) => {
    await page.locator('.tab:has-text("Upgrades")').click();
    const upgradeCards = await page.locator('.upgrade-card').count();
    expect(upgradeCards).toBe(9);
});

test('can buy click upgrade', async ({ page }) => {
    await page.evaluate(() => { state.coins = 200; state.totalCoins = 200; updateUI(); });
    await page.locator('.tab:has-text("Upgrades")').click();

    // Use evaluate to avoid DOM re-render race on innerHTML panels
    await page.evaluate(() => buyUpgrade('click1'));

    const result = await page.evaluate(() => ({
        purchased: state.upgrades.click1,
        clickPower: getClickValue(),
    }));
    expect(result.purchased).toBe(true);
    expect(result.clickPower).toBe(2); // 1 * 2x = 2
});

// ========== PRESTIGE ==========

test('prestige tab shows current level', async ({ page }) => {
    await page.locator('.tab:has-text("Prestige")').click();
    await expect(page.locator('.prestige-multiplier')).toContainText('1x');
});

test('prestige button disabled when not enough coins', async ({ page }) => {
    await page.locator('.tab:has-text("Prestige")').click();
    const btn = page.locator('.prestige-btn');
    await expect(btn).toBeDisabled();
});

test('prestige resets progress and increases multiplier', async ({ page }) => {
    // Give enough coins for prestige (need totalCoins >= 1M for 1 prestige point)
    await page.evaluate(() => {
        state.coins = 5000000;
        state.totalCoins = 5000000;
        buyBusiness('lemonade');
        updateUI();
    });

    // Verify prestige coins available
    const prestigeCoins = await page.evaluate(() => getPrestigeCoins());
    expect(prestigeCoins).toBeGreaterThanOrEqual(1);

    await page.locator('.tab:has-text("Prestige")').click();
    const btn = page.locator('.prestige-btn');
    await btn.click();

    const result = await page.evaluate(() => ({
        level: state.prestigeLevel,
        multiplier: state.prestigeMultiplier,
        coins: state.coins,
        lemonadeOwned: state.businesses.lemonade.owned,
    }));
    expect(result.level).toBe(1);
    expect(result.multiplier).toBe(1.5);
    expect(result.coins).toBe(0);
    expect(result.lemonadeOwned).toBe(0);
});

// ========== STATS ==========

test('stats tab shows game statistics', async ({ page }) => {
    await page.locator('.tab:has-text("Stats")').click();
    await expect(page.locator('.stat-label:has-text("Total Clicks")')).toBeVisible();
    await expect(page.locator('.stat-label:has-text("Coins/Second")')).toBeVisible();
    await expect(page.locator('.stat-label:has-text("Prestige Level")')).toBeVisible();
});

// ========== SAVE/LOAD ==========

test('game saves to localStorage', async ({ page }) => {
    await page.evaluate(() => {
        state.coins = 999;
        state.totalCoins = 999;
        saveGame();
    });

    const saved = await page.evaluate(() => {
        const data = JSON.parse(localStorage.getItem('coinEmpireSave'));
        return data.coins;
    });
    expect(saved).toBe(999);
});

test('game loads from localStorage on page reload', async ({ page }) => {
    await page.evaluate(() => {
        state.coins = 500;
        state.totalCoins = 500;
        state.totalClicks = 42;
        state.lastOnline = Date.now(); // Prevent offline earnings
        saveGame();
    });

    await page.reload();
    await page.waitForSelector('#coin-button');

    const result = await page.evaluate(() => ({
        coins: state.coins,
        totalClicks: state.totalClicks,
    }));
    // Coins should be close to 500 (may have tiny offline earnings)
    expect(result.coins).toBeGreaterThanOrEqual(500);
    expect(result.totalClicks).toBe(42);
});

// ========== REWARD AD ==========

test('reward boost activates (simulated)', async ({ page }) => {
    // Use evaluate to avoid DOM re-render race
    await page.evaluate(() => watchRewardAd());

    const result = await page.evaluate(() => ({
        boostActive: state.boostActive,
        adsWatched: state.adsWatched,
    }));
    expect(result.boostActive).toBe(true);
    expect(result.adsWatched).toBe(1);
});

test('boost doubles click value', async ({ page }) => {
    const normalClick = await page.evaluate(() => getClickValue());
    await page.evaluate(() => { watchRewardAd(); });
    const boostedClick = await page.evaluate(() => getClickValue());
    expect(boostedClick).toBe(normalClick * 2);
});

// ========== TAB NAVIGATION ==========

test('tab switching works', async ({ page }) => {
    const tabs = ['Businesses', 'Upgrades', 'Prestige', 'Stats'];
    for (const tab of tabs) {
        await page.locator(`.tab:has-text("${tab}")`).click();
        const panel = page.locator(`#panel-${tab.toLowerCase()}`);
        await expect(panel).toBeVisible();
    }
});

// ========== NUMBER FORMATTING ==========

test('large numbers format correctly', async ({ page }) => {
    const results = await page.evaluate(() => [
        formatNumber(0),
        formatNumber(999),
        formatNumber(1000),
        formatNumber(1500),
        formatNumber(1000000),
        formatNumber(1500000000),
    ]);
    expect(results[0]).toBe('0');
    expect(results[1]).toBe('999');
    expect(results[2]).toBe('1.00K');
    expect(results[4]).toBe('1.00M');
    expect(results[5]).toBe('1.50B');
});

// ========== MOBILE TOUCH ==========

test('coin button responds to touch on mobile viewport', async ({ browser }) => {
    const context = await browser.newContext({
        viewport: { width: 375, height: 667 },
        hasTouch: true,
    });
    const page = await context.newPage();
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForSelector('#coin-button');

    // Simulate touch
    await page.locator('#coin-button').tap();
    const coins = await page.evaluate(() => state.coins);
    expect(coins).toBeGreaterThanOrEqual(1);
    await context.close();
});

// ========== FULL GAMEPLAY FLOW ==========

test('complete gameplay flow: click → buy → collect → upgrade → prestige', async ({ page }) => {
    // 1. Click to earn
    await page.evaluate(() => { for(let i=0;i<100;i++) handleClick({}); });
    let coins = await page.evaluate(() => state.coins);
    expect(coins).toBe(100);

    // 2. Buy lemonade stand
    await page.evaluate(() => buyBusiness('lemonade'));
    let owned = await page.evaluate(() => state.businesses.lemonade.owned);
    expect(owned).toBe(1);

    // 3. Collect from it
    coins = await page.evaluate(() => state.coins);
    await page.evaluate(() => collectBusiness('lemonade'));
    let coinsAfter = await page.evaluate(() => state.coins);
    expect(coinsAfter).toBeGreaterThan(coins);

    // 4. Buy upgrade
    await page.evaluate(() => { state.coins = 200; state.totalCoins = 200; });
    await page.evaluate(() => buyUpgrade('click1'));
    let clickPower = await page.evaluate(() => getClickValue());
    expect(clickPower).toBe(2);

    // 5. Prestige (need totalCoins >= 1M)
    await page.evaluate(() => { state.coins = 5000000; state.totalCoins = 5000000; });
    await page.evaluate(() => doPrestige());
    let level = await page.evaluate(() => state.prestigeLevel);
    expect(level).toBe(1);
    let mult = await page.evaluate(() => state.prestigeMultiplier);
    expect(mult).toBe(1.5);

    // After prestige, clicking should earn more
    await page.evaluate(() => handleClick({}));
    let postPrestigeClick = await page.evaluate(() => state.coins);
    expect(postPrestigeClick).toBeGreaterThan(1); // 1 * 1.5x = 1.5, floor = 1... let's check
    expect(postPrestigeClick).toBeGreaterThanOrEqual(1);
});
