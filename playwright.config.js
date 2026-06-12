// @ts-check
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
    testDir: './tests',
    timeout: 30000,
    retries: 0,
    use: {
        baseURL: 'http://localhost:8765',
        headless: true,
    },
    webServer: {
        command: 'python3 -m http.server 8765 --directory game',
        port: 8765,
        reuseExistingServer: true,
    },
});
