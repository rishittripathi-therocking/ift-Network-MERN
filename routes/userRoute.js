const router = require('express').Router()
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');

router.get('/search', auth,userController.searchUser);
router.get('/user/:id',auth,userController.getUser);
router.patch('/user',auth,userController.updateUser);
router.patch('/user/:id/follow',auth,userController.follow);
router.patch('/user/:id/unfollow',auth,userController.unfollow);
router.get('/suggestionsUser',auth,userController.suggestionsUser);

module.exports = router;