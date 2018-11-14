const mongoose = require('mongoose');

const {
  Schema,
} = mongoose;

const userFields = {
  email: {
    type: String,
    required: true,
  },
  familyName: {
    type: String,
  },
  givenName: {
    type: String,
  },
  googleId: {
    type: String,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
};

const user = new Schema(userFields, {
  timestamps: true,
});

user.methods.toJSON = function toJSON() {
  const doc = this.toObject();
  delete doc._id;
  delete doc.__v;
  return doc;
};

module.exports = {
  UserModel: mongoose.model('user', user),
  userFields,
};
