const router = require('express').Router();

const authMiddleware = require('../middlewares/auth');
const { saveReport, getReports } = require('../controllers/reportsController');
const { getConsumer } = require('../controllers/consumerController');


router.route('/')
  .get(getReports)
  .post(authMiddleware, getConsumer, saveReport);

module.exports = router;
