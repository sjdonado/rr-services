const {
  UserModel,
} = require('../models/userModel');

exports.createOrUpdateUser = (req, res, next) => {
  const {
    body,
  } = req;

  const {
    email,
  } = body;

  const options = { upsert: true, new: true, setDefaultsOnInsert: true };

  UserModel.findOneAndUpdate({ email }, body, options)
    .then((doc) => {
      res.status(201).json({
        success: true,
        item: doc,
      });
    })
    .catch((err) => {
      next(new Error(err));
    });
};
