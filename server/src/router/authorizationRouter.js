const router = require('express').Router();
const hashPass = require('../middlewares/hashPassMiddle');
const validators = require('../middlewares/validators');
const userController = require('../controllers/userController');

router.post(
  '/registration',
  validators.validateRegistrationData,
  hashPass,
  userController.registration,
);

router.post(
  '/login',
  validators.validateLogin,
  userController.login,
);

module.exports = router;
