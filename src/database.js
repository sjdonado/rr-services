import mongoose from 'mongoose';

import config from './config';

const {
  database,
} = config;

const connect = () => {
  mongoose.connect(database.url, { useNewUrlParser: true });

  mongoose.connection.on('open', () => {
    console.log('Database connected');
  });
};

export default connect;
