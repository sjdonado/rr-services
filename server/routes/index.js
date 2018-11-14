const router = require('express').Router();

const reportsRouter = require('./reportsRouter');
const usersRouter = require('./usersRouter');


router.use('/reports', reportsRouter);
router.use('/users', usersRouter);


module.exports = router;
