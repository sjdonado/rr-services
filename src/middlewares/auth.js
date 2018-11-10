import config from '../config';

export default (req, res, next) => {
  if (req.headers.authorization === config.bot.token) {
    next();
  } else {
    next(new Error('Invalid token'));
  }
};
