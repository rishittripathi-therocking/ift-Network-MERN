const router = require('express').Router()
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');

router.get('/search', auth,userController.searchUser);

module.exports = router;