const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../../../config/middlewares');
const answerController = require('../controllers/answer.controller');

router.post('/', authMiddleware, answerController.createAnswer);
router.get('/user/:id', authMiddleware, answerController.getAnswersByUser);
router.put('/:id', authMiddleware, answerController.updateAnswerById);

module.exports = router;
