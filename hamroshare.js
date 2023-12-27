/**
 * External dependencies.
 */
const puppeteer = require("puppeteer-extra");
const stealthPlugin = require("puppeteer-extra-plugin-stealth");

/**
 * Internal dependencies.
 */
const { login, apply } = require("./utilities");

const start = async () => {
  puppeteer.use(stealthPlugin());
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();

  /**
   * Login Process.
   */
  await login(page);

  // Wait for navigation to complete
  await page.waitForNavigation();

  // Wait for the search results page to load.
  await page.waitForSelector("i.msi-asba");

  /**
   * Apply for IPO process.
   */
  await apply(page);

  // Close browser.
  // await browser.close();
};

start();
