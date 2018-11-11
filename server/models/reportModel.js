const mongoose = require('mongoose');

const {
  Schema,
} = mongoose;

const reportFields = {
  firstname: {
    type: String,
    required: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
  },
  photo_url: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    min: 6,
  },
  description: {
    type: String,
    default: '',
    trim: true,
  },
};

const report = new Schema(reportFields, {
  timestamps: true,
});

report.methods.toJSON = function toJSON() {
  const doc = this.toObject();
  // delete doc.password;
  return doc;
};

module.exports = {
  ReportModel: mongoose.model('report', report),
  reportFields,
};
