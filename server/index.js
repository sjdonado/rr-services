const express = require('express');
const bodyParser = require('body-parser');

const { port } = require('./config');

const routes = require('./routes');
require('./database')();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', routes);

app.use((req, res) => {
  res.status(404);
  res.json({
    error: true,
    message: 'Not found',
  });
});

app.use((err, req, res) => {
  let {
    statusCode = 500, message,
  } = err;

  switch (err.type) {
    case 'entity.parse.failed':
      message = `Bad Request: ${err.message}`;
      break;
    default:
      if (err.message.startsWith('ValidationError')) {
        statusCode = 422;
      }
      break;
  }

  res.status(statusCode);
  res.json({
    error: true,
    message,
  });
});

app.listen(port);
