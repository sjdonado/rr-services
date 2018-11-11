const express = require('express');
const bodyParser = require('body-parser');

const database = require('./database');

const authMiddleware = require('./middlewares/auth');
const messageController = require('./controllers/message');

database();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', authMiddleware, messageController);

app.listen(3000);
