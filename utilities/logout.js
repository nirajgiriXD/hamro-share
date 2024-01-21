const logout = async (page) => {
  // Click logout button.
  await page.click(".header-menu__item--logout-desktop-view > a");

  // Wait for navigation to complete and search results page to load.
  await page.waitForNavigation();
  await page.waitForSelector("button.forget-password__btn");
};

module.exports = { logout };
