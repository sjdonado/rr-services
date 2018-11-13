const { bot } = require('../config');

module.exports = (req, res, next) => {
  if (req.headers.authorization === bot.token) {
    next();
  } else {
    next(new Error('Invalid token'));
  }
};
