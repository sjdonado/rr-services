const mongoose = require('mongoose');

const config = require('./config');

const {
  database,
} = config;

module.exports = () => {
  mongoose.connect(database.url, { useNewUrlParser: true });

  mongoose.connection.on('open', () => {});
};
