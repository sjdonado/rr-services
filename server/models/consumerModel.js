const mongoose = require('mongoose');

const {
  Schema,
} = mongoose;

const consumerFields = {
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
};

const consumer = new Schema(consumerFields, {
  timestamps: true,
});

consumer.methods.toJSON = function toJSON() {
  const doc = this.toObject();
  delete doc._id;
  delete doc.__v;
  return doc;
};


module.exports = {
  ConsumerModel: mongoose.model('consumer', consumer),
  consumerFields,
};
