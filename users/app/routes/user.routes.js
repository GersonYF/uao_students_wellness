const express = require('express');
const userController = require('../controllers/user.controller');
//const { authMiddleware } = require('../../../config/middlewares');i
const { authMiddleware } = require('/var/www/html/config/middlewares');

const router = express.Router();

router.get('/', authMiddleware, userController.getUserList);
router.post('/', userController.createUser);
router.get('/:userId', authMiddleware, userController.getUserById);
router.put('/:userId', authMiddleware, userController.updateUser);

module.exports = router;
