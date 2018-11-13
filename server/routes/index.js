const router = require('express').Router();

const reportsRouter = require('./reportsRouter');

router.use('/reports', reportsRouter);

module.exports = router;
