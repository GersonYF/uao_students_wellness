const express = require('express');
const authController = require('../controllers/auth.controller');
//const { authMiddleware } = require('../../../config/middlewares');
const { authMiddleware } = require('/var/www/html/config/middlewares');

const router = express.Router();

router.post('/login', authController.login);
router.get('/me', authMiddleware, authController.me);

module.exports = router;
