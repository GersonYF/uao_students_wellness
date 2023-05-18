const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../../../config/middlewares');

const questionaryController = require('../controllers/questionary.controller');
const answersController = require('../controllers/answer.controller');

// obtener todas las preguntas o filtrar por categoría
router.get('/', authMiddleware, questionaryController.getQuestionaries);
router.post('/', authMiddleware, questionaryController.createQuestionary);
router.get('/:id', authMiddleware, questionaryController.getQuestionaryById);
router.post('/:id/answers', authMiddleware, answersController.createAnswersForQuestionary);

module.exports = router;
