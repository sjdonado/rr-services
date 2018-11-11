require('dotenv').config();

const config = {
  facebook: {
    accessToken: process.env.FACEBOOK_PAGE_ACCESS_TOKEN,
  },
  database: {
    url: process.env.DATABASE_URL,
  },
  bot: {
    token: process.env.BOT_TOKEN,
    ai: process.env.AI_TOKEN,
  },
};

module.exports = config;
