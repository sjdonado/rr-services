const { bot } = require('../config');

module.exports = (req, res, next) => {
  if (req.headers.authorization === bot.token) {
    next();
  } else {
    next(new Error('Invalid token'));
  }
};
// "fa65cb79-ac14-4a60-a641-c2b27a854daa"
// "2271420376266477"
