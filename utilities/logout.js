const logout = async (page) => {
  // Click logout button.
  await page.click(".header-menu__item--logout-desktop-view > a");

  // Force a reload without using cached resources.
  await page.reload({ ignoreCache: true });
};

module.exports = { logout };
