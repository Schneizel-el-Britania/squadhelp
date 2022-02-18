const router = require('express').Router();
const checkToken = require('../middlewares/checkToken');
const upload = require('../utils/fileUpload');
const userController = require('../controllers/userController');

router.post(
  '/getUser',
  checkToken.checkAuth,
);

router.post(
  '/updateUser',
  checkToken.checkToken,
  upload.uploadAvatar,
  userController.updateUser,
);

module.exports = router;
