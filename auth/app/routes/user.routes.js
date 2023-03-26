const express = require('express');
const userController = require('../controllers/user.controller');
const { authMiddleware } = require('../middlewares/');

const router = express.Router();

router.get('/', authMiddleware, userController.getUserList);
router.post('/', userController.createUser);
router.get('/:userId', authMiddleware, userController.getUserById);
router.post('/login', userController.login);
router.get('/me', authMiddleware, userController.me);

module.exports = router;
