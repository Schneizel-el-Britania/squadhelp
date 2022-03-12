const router = require('express').Router();
const checkToken = require('../middlewares/checkToken');
const chatController = require('../controllers/chatController');

router.post(
  '/newMessage',
  checkToken.checkToken,
  chatController.addMessage,
);

router.get(
  '/getPreview',
  checkToken.checkToken,
  chatController.getPreview,
);

router.post(
  '/getChat',
  checkToken.checkToken,
  chatController.getChat,
);

router.post(
  '/blackList',
  checkToken.checkToken,
  chatController.blackList,
);

router.post(
  '/favorite',
  checkToken.checkToken,
  chatController.favoriteChat,
);

module.exports = router;
