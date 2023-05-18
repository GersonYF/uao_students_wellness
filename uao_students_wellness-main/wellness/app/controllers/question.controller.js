const { Question } = require('../../../config/database');

// obtener todas las preguntas o filtrar por categoría
exports.getAllQuestions = async (req, res) => {
  const { root_category } = req.query;

  try {
    let questions;
    if (root_category) {
      questions = await Question.findAll({ where: { root_category } });
    } else {
      questions = await Question.findAll();
    }
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las preguntas', error });
  }
};

// obtener las categorías únicas de todas las preguntas
exports.getUniqueCategories = async (req, res) => {
  try {
    const categories = await Question.findAll({
      attributes: [[Question.sequelize.fn('DISTINCT', Question.sequelize.col('root_category')), 'root_category']]
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las categorías únicas', error });
  }
};
