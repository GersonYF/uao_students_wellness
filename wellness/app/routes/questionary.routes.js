const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../../../config/middlewares');

const questionaryController = require('../controllers/questionary.controller');

// obtener todas las preguntas o filtrar por categoría
router.get('/', authMiddleware, questionaryController.getQuestionaries);
router.get('/:id', authMiddleware, questionaryController.getQuestionaryById);
router.post('/', authMiddleware, questionaryController.createQuestionary);

module.exports = router;
