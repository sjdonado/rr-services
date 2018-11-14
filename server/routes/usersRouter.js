const router = require('express').Router();

const { createOrUpdateUser } = require('../controllers/userController');


router.route('/')
  .post(createOrUpdateUser);

module.exports = router;
