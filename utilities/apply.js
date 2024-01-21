const apply = async (page, userData, applicableCompanies) => {
  // Go to the ASBA page.
  await page.click("i.msi-asba");

  // Wait for the search results page to load.
  await page.waitForSelector(".company-list button.btn-issue", {
    timeout: 5000,
  });

  const companies = await page.$$(".company-list");

  let count = 0;
  for (const company of companies) {
    count++;

    const companyName = await page.evaluate((el) => {
      return (
        el
          .querySelector(".company-name > span:nth-child(1)")
          ?.textContent?.trim() ?? "Null"
      );
    }, company);

    const applyBtnTxt = await page.evaluate(
      (el, count) => {
        return (
          el
            .querySelector(`button.btn-issue:nth-child(${count})`)
            ?.textContent?.trim() ?? "Null"
        );
      },
      company,
      count
    );

    if (applicableCompanies.includes(companyName) && applyBtnTxt === "Apply") {
      // Click apply button.
      await page.click(`button.btn-issue:nth-child(${count})`);

      // Wait for navigation to complete
      await page.waitForNavigation();

      // Wait for the search results page to load.
      await page.waitForSelector("#disclaimer", {
        timeout: 5000,
      });

      // Select First Bank in the Options.
      await page.click("#selectBank");
      const banks = await page.evaluate(() => {
        return Array.from(
          document.querySelectorAll("#selectBank > option")
        ).map((option) => ({
          text: option.textContent.trim(),
          value: option.value,
        }));
      });
      await page.select("#selectBank", banks[1].value);

      // Wait for the search results page to load.
      await page.waitForSelector("#accountNumber", {
        timeout: 5000,
      });

      // Select First Account Number in the Options.
      await page.click("#accountNumber");
      const accountNumbers = await page.evaluate(() => {
        return Array.from(
          document.querySelectorAll("#accountNumber > option")
        ).map((option) => ({
          text: option.textContent.trim(),
          value: option.value,
        }));
      });
      await page.select("#accountNumber", accountNumbers[1].value);

      // Enter the applied kitta number.
      await page.type("#appliedKitta", "10");

      // Enter CRN number.
      await page.type("#crnNumber", userData.crn);

      // Check the disclaimer.
      await page.click("#disclaimer");

      // // Click submit.
      await page.click('.card-footer button[type="submit"]');

      // Wait for the search results page to load.
      await page.waitForSelector("#transactionPIN", {
        timeout: 5000,
      });

      // Enter the pin number.
      await page.focus("#transactionPIN");
      await page.type("#transactionPIN", userData.pin);

      // Click submit.
      // await page.click('.confirm-page-btn button[type="submit"]');

      // Wait for navigation to complete
      // await page.waitForNavigation();
    }
  }
};

module.exports = { apply };
