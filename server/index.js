const express = require('express');
const bodyParser = require('body-parser');

const { port } = require('./config');

const database = require('./database');

const authMiddleware = require('./middlewares/auth');
const { getReport, saveReport } = require('./controllers/reportsController');

database();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', authMiddleware, getReport, saveReport);

app.listen(port);
