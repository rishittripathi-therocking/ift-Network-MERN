const router = require('express').Router()
const auth = require('../middleware/auth');
const userController = require('../controllers/userController');

router.get('/search', userController.searchUser);