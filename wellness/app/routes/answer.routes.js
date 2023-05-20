const express = require('express');
const router = express.Router();
//const { authMiddleware } = require('../../../config/middlewares');
const { authMiddleware } = require('/var/www/html/config/middlewares');
const answerController = require('../controllers/answer.controller');

router.get('/questionary/:questionaryId', authMiddleware, answerController.getAllAnswers);
router.get('/:id', authMiddleware, answerController.getAnswerById);
router.post('/questionary/:questionaryId', authMiddleware, answerController.createAnswerForQuestionary);
router.put('/:id', authMiddleware, answerController.updateAnswerById);
router.delete('/:id', authMiddleware, answerController.deleteAnswerById);
router.get('/user/questionary/categories', authMiddleware, answerController.getUserAnswersCountByCategory);

module.exports = router;
