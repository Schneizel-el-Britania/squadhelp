const router = require('express').Router();
const checkToken = require('../middlewares/checkToken');
const chatController = require('../controllers/chatController');

router.post(
  '/createCatalog',
  checkToken.checkToken,
  chatController.createCatalog,
);

router.post(
  '/updateNameCatalog',
  checkToken.checkToken,
  chatController.updateNameCatalog,
);

router.post(
  '/addNewChatToCatalog',
  checkToken.checkToken,
  chatController.addNewChatToCatalog,
);

router.post(
  '/removeChatFromCatalog',
  checkToken.checkToken,
  chatController.removeChatFromCatalog,
);

router.post(
  '/deleteCatalog',
  checkToken.checkToken,
  chatController.deleteCatalog,
);

router.post(
  '/getCatalogs',
  checkToken.checkToken,
  chatController.getCatalogs,
);

module.exports = router;
