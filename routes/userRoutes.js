const authController = require('../controllers/authControllers');
const express = require('express');
const routes = express.Router();

routes.post('/login', authController.login);
routes.post('/signup', authController.signup);

module.exports = routes;

