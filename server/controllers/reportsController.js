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

  if (queryResult.action === 'support.problem'
    || queryResult.action === 'support.feedback'
    || queryResult.action === 'support.beta') {
    const report = new ReportModel(Object.assign({ consumerId: consumer.id },
      { action: queryResult.action, text: queryResult.queryText }));
    report.save()
      .then((updated) => {
        res.status(201).json({
          success: true,
          item: updated,
        });
      })
      .catch((err) => {
        next(new Error(err));
      });
  } else {
    res.status(202).json({});
  }
};

exports.getReports = (req, res, next) => {
  ReportModel
    .find()
    .populate(referencesNames.join(' '))
    .exec()
    .then((doc) => {
      const statisticsPerHour = [];
      for (let i = 0; i <= 24; i += 1) {
        this.bugs = 0;
        this.feddBacks = 0;
        this.betaTesterRequests = 0;
        doc.forEach((report) => {
          if (report.createdAt.getHours() === i) {
            switch (report.action) {
              case 'support.problem':
                this.bugs += 1;
                break;
              case 'support.feedback':
                this.feddBacks += 1;
                break;
              case 'support.beta':
                this.betaTesterRequests += 1;
                break;
              default:
                break;
            }
          }
        });
        statisticsPerHour.push({
          bugs: this.bugs,
          feddBacks: this.feddBacks,
          betaTesterRequests: this.betaTesterRequests,
        });
      }
      res.status(200).json({
        success: true,
        statisticsPerHour,
        data: doc,
      });
    })
    .catch((err) => {
      next(new Error(err));
    });
};
