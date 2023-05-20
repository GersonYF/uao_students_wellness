const express = require('express');
const router = express.Router();
//const { authMiddleware } = require('../../../config/middlewares');
const { authMiddleware } = require('/var/www/html/config/middlewares');

const { getAllQuestions, getUniqueCategories } = require('../controllers/question.controller');

// obtener todas las preguntas o filtrar por categoría
router.get('/', authMiddleware, getAllQuestions);

// obtener las categorías únicas de todas las preguntas
router.get('/categories', authMiddleware, getUniqueCategories);

module.exports = router;
