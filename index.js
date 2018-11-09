const express = require('express');
const bodyParser = require('body-parser');

const authController = require('./controllers/auth');
const messageController = require('./controllers/message');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', authController);
app.post('/', messageController);

app.listen(3000, () => console.log('Webhook server is listening, port 3000'));
