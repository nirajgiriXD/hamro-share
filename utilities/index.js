// Import modules.
const login = require("./login");
const apply = require("./apply");

// Export modules.
module.exports = {
  ...login,
  ...apply,
};
