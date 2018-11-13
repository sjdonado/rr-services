const {
  ConsumerModel,
} = require('../models/consumerModel');

exports.getConsumer = (req, res, next) => {
  const {
    body,
  } = req;

  const { username } = body.originalDetectIntentRequest.payload.data.message.chat;

  ConsumerModel.findOne({ username })
    .then((doc) => {
      if (doc) {
        req.consumer = doc;
        next();
      } else {
        const consumer = new ConsumerModel({ username });
        consumer.save()
          .then((document) => {
            req.consumer = document;
            next();
          })
          .catch((err) => {
            next(new Error(err));
          });
      }
    })
    .catch((err) => {
      next(new Error(err));
    });
};
