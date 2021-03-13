const Router = require('express').Router()
const authController = require('../controllers/authController');

Router.post('/register',authController.register);
Router.post('/login',authController.login);
Router.post('/logout',authController.logout);
Router.post('/refresh_token',authController.generateAccessToken);

module.exports = Router;