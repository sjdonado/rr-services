import express from 'express';
import bodyParser from 'body-parser';

import database from './database';

import authMiddleware from './middlewares/auth';
import messageController from './controllers/message';

database();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', authMiddleware, messageController);

app.listen(3000, () => console.log('Webhook server is listening, port 3000'));
