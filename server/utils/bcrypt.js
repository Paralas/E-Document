const bcrypt = require("bcryptjs");

const compare = (password, hash) => {
  if (!hash || hash.length === 0) {
    return Promise.resolve(password);
  }

  return bcrypt.compare(password, hash);
};

module.exports = { compare };
