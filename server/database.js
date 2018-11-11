const mongoose = require('mongoose');

const { database } = require('./config');

module.exports = () => {
  mongoose.connect(database.url, { useNewUrlParser: true });

  mongoose.connection.on('open', () => {});
};
