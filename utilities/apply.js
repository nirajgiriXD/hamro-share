const apply = async (page) => {
  // Go to the ASBA page.
  await page.click("i.msi-asba");
};

module.exports = { apply };
