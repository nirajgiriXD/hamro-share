const { applicableCompanies } = require("../data/applicableCompanies");

const apply = async (page, userData) => {
  // Go to the ASBA page.
  await page.click("i.msi-asba");

  // Wait for the search results page to load.
  await page.waitForSelector(".company-list button.btn-issue", {
    timeout: 5000,
  });

  const companies = await page.$$(".company-list");

  let count = 0;
  let applyBtn;
  let companyName;

  for (const company of companies) {
    count++;
    companyName = await page.evaluate((el) => {
      return el.querySelector(".company-name > span:nth-child(1)")?.textContent;
    }, company);
    companyName = companyName.trim() ?? "Null";

    if (applicableCompanies.includes(companyName)) {
      // Click apply button.
      await page.click(`button.btn-issue:nth-child(${count})`);

      // Wait for navigation to complete
      await page.waitForNavigation();

      // Select Bank.
      await page.click("#selectBank");
      await page.click("#selectBank > option:nth(2)");

      // Select Account Number.
      await page.click("#accountNumber");
      await page.click("#accountNumber > option:nth(2)");

      // Enter the applied kitta number.
      await page.$eval("#appliedKitta", (el) => (el.value = 10));

      // Enter CRN number.
      await page.$eval("#crnNumber", (el) => (el.value = userData.crn));

      // Check the disclaimer.
      await page.click("#disclaimer");

      // Click submit.
      await page.click('.card-footer button[type="submit"]');

      // Wait for navigation to complete.
      await page.waitForNavigation();

      // Enter the pin number.
      await page.$eval("#transactionPIN", (el) => (el.value = userData.pin));

      // Click submit.
      await page.click('.confirm-page-btn button[type="submit"]');
    }
  }
};

module.exports = { apply };
