const login = async (page, userData) => {
  // Go to the login page.
  await page.goto("https://meroshare.cdsc.com.np/#/login", {
    waitUntil: "networkidle2",
  });

  // Wait for the page to load.
  await page.waitForSelector('button[type="submit"]');

  // Select DP.
  await page.click("select");

  // Get the DP id from data-attribute.
  const dpId = await page.evaluate((DP) => {
    const listsArray = Array.from(document.querySelectorAll("li"));

    for (const list of listsArray) {
      if (list.innerText.includes(DP)) {
        return list.getAttribute("data-select2-id");
      }
    }

    return null;
  }, userData.DP);

  // Select the DP from drop down list.
  await page.click(`li[data-select2-id="${dpId}"]`);

  // Fill username input.
  await page.type("#username", userData.username);

  // Fill password input.
  await page.type("#password", userData.password);

  // Submit.
  await page.click('button[type="submit"]');
};

module.exports = { login };
