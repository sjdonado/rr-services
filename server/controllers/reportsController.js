const {
  ReportModel,
} = require('../models/reportModel');

module.exports.saveReport = (req, res, next) => {
  const {
    doc,
    body,
  } = req;

  const {
    result,
  } = body;

  Object.assign(doc, result);

  doc.save()
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

module.exports.getReport = (req, res, next) => {
  const {
    body,
  } = req;

  const {
    sessionId,
    result,
  } = body;

  // body.originalRequest.data.sender.id
  // body.sessionId -> "5afaf395-78bc-494a-860e-b774b73f17d7"
  // body.result.contexts
  // body.result.action
  // body.result.resolvedQuery

  ReportModel.find({ sessionId })
    .then((doc) => {
      if (doc) {
        req.doc = doc;
        next();
      } else {
        Object.assign(result, { sessionId });
        const document = new ReportModel(result);
        document.save()
          .then((newDoc) => {
            req.doc = newDoc;
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
