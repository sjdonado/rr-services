const config = require('../config');

module.exports = (req, res, next) => {
  if (req.headers.authorization === config.bot.token) {
    next();
  } else {
    next(new Error('Invalid token'));
  }
};
