const {
  ReportModel,
  reportReferences,
} = require('../models/reportModel');

const referencesNames = [
  ...Object.getOwnPropertyNames(reportReferences),
];

exports.saveReport = (req, res, next) => {
  const {
    consumer,
    body,
  } = req;

  const {
    queryResult,
  } = body;

  const report = new ReportModel(Object.assign({ consumerId: consumer.id },
    { action: queryResult.action, text: queryResult.queryText }));

  report.save()
    .then((updated) => {
      res.status(200).json({
        success: true,
        item: updated,
      });
    })
    .catch((err) => {
      next(new Error(err));
    });
};

exports.getReports = (req, res, next) => {
  ReportModel
    .find()
    .populate(referencesNames.join(' '))
    .exec()
    .then((doc) => {
      res.status(200).json({
        success: true,
        item: doc,
      });
    })
    .catch((err) => {
      next(new Error(err));
    });
};
