/**
 * External dependencies.
 */
const puppeteer = require("puppeteer-extra");
const stealthPlugin = require("puppeteer-extra-plugin-stealth");

/**
 * Internal dependencies.
 */
const { login, apply, logout } = require("./utilities");
const { usersData } = require("./data/usersData");
const { applicableCompanies } = require("./data/applicableCompanies");

const start = async () => {
  puppeteer.use(stealthPlugin());
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  // Go to the login page.
  await page.goto("https://meroshare.cdsc.com.np/#/login", {
    waitUntil: "networkidle2",
  });

  for (const userData of usersData) {
    /**
     * Login Process.
     */
    await login(page, userData);

    // Wait for navigation to complete
    await page.waitForNavigation();

    // Wait for the search results page to load.
    await page.waitForSelector("i.msi-asba");

    /**
     * Apply for IPO process.
     */
    await apply(page, userData, applicableCompanies);

    /**
     * Logout Process.
     */
    await logout(page);
  }

  // Close browser.
  await browser.close();
};

start();
