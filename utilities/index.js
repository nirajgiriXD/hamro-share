// Import modules.
const login = require("./login");
const apply = require("./apply");
const logout = require("./logout");

// Export modules.
module.exports = {
  ...login,
  ...apply,
  ...logout,
};
