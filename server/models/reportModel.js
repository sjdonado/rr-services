const mongoose = require('mongoose');

const {
  Schema,
} = mongoose;

const reportFields = {
  action: {
    type: String,
    required: true,
    trim: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
};

const reportReferences = {
  consumerId: {
    type: Schema.Types.ObjectId,
    ref: 'consumer',
    required: true,
  },
};

const report = new Schema(Object.assign(reportFields, reportReferences), {
  timestamps: true,
});

report.methods.toJSON = function toJSON() {
  const doc = this.toObject();
  delete doc._id;
  delete doc.__v;
  return doc;
};

module.exports = {
  ReportModel: mongoose.model('report', report),
  reportFields,
  reportReferences,
};
