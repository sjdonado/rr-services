const apiai = require('apiai');
const request = require('request');
const config = require('../config');

const apiAiClient = apiai(config.bot.ai);

const sendTextMessage = (senderId, text) => {
  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: config.facebook.accessToken },
    method: 'POST',
    json: {
      recipient: { id: senderId },
      message: { text },
    },
  });
};

module.exports = (event) => {
  const senderId = event.sender.id;
  const message = event.message.text;
  const apiaiSession = apiAiClient.textRequest(message, { sessionId: config.bot.token });
  apiaiSession.on('response', (response) => {
    const result = response.result.fulfillment.speech;
    sendTextMessage(senderId, result);
  });
  apiaiSession.on('error', error => console.log(error));
  apiaiSession.end();
};
