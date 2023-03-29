const { Answer, Questionary, Question, Option } = require('../../../config/database');
const { validationResult } = require('express-validator');

// Obtener todas las respuestas de un cuestionario
exports.getAllAnswers = async (req, res) => {
  try {
    const questionary = await Questionary.findByPk(req.params.questionaryId);
    if (!questionary) {
      return res.status(404).json({ message: 'Cuestionario no encontrado' });
    }
    const answers = await Answer.findAll({
      where: { QuestionaryId: questionary.id },
      include: [{ model: Question, include: [{model: Option, as:'options'}] }]
    });
    res.status(200).json(answers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las respuestas" });
  }
};

// Obtener una respuesta por ID
exports.getAnswerById = async (req, res) => {
  try {
    const answer = await Answer.findByPk(req.params.id);
    if (answer) {
      res.status(200).json(answer);
    } else {
      res.status(404).json({ message: 'Respuesta no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la respuesta" });
  }
};

// Crear una respuesta para un cuestionario y una pregunta existentes
exports.createAnswerForQuestionary = async (req, res) => {
  try {
    const question = await Question.findByPk(req.body.questionId);
    if (!question) {
      return res.status(404).json({ message: 'Pregunta no encontrada' });
    }
    const questionary = await Questionary.findByPk(req.params.questionaryId);
    if (!questionary) {
      return res.status(404).json({ message: 'Cuestionario no encontrado' });
    }
    const answer = await Answer.create({
      answer: req.body.answer,
      QuestionId: question.id,
      QuestionaryId: questionary.id
    });
    if (req.body.options) {
      const options = await Option.findAll({
        where: { id: req.body.options }
      });
      await answer.addOptions(options);
    }
    res.status(201).json(answer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la respuesta" });
  }
};

// Crear varias respuestas para un cuestionario y una pregunta existentes
exports.createAnswersForQuestionary = async (req, res) => {
  try {
    const questionary = await Questionary.findByPk(req.params.id);
    if (!questionary) {
      return res.status(404).json({ message: 'Cuestionario no encontrado' });
    }

    // Group answers by questionId
    const groupedAnswers = req.body.reduce((acc, item) => {
      if (acc[item.QuestionId]) {
        acc[item.QuestionId].push(item);
      } else {
        acc[item.QuestionId] = [item];
      }
      return acc;
    }, {});

    // Create answers for each question separately
    const answers = await Promise.all(
      Object.entries(groupedAnswers).map(async ([QuestionId, items]) => {
        const question = await Question.findByPk(QuestionId);
        if (!question) {
          return res.status(404).json({ message: `Pregunta ${QuestionId} no encontrada` });
        }
        const createdAnswers = await Promise.all(
          items.map(async (item) => {
            const answer = await Answer.create({
              answer: item.answer,
              QuestionId: question.id,
              QuestionaryId: questionary.id,
            });
            if (item.options) {
              const options = await Option.findAll({
                where: { id: item.options },
              });
              await answer.addOptions(options);
            }
            return answer;
          })
        );
        return createdAnswers;
      })
    );

    res.status(201).json(answers.flat());
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear las respuestas' });
  }
};

// Actualizar una respuesta por ID
exports.updateAnswerById = async (req, res) => {
  try {
    const answer = await Answer.findByPk(req.params.id);
    if (!answer) {
      return res.status(404).json({ message: 'Respuesta no encontrada' });
    }
    const question = await Question.findByPk(req.body.questionId);
    if (!question) {
      return res.status(404).json({ message: 'Pregunta no encontrada' });
    }
    const questionary = await Questionary.findByPk(req.params.questionaryId);
    if (!questionary) {
      return res.status(404).json({ message: 'Cuestionario no encontrado' });
    }
    answer.answer = req.body.answer;
    answer.QuestionId = question.id;
    answer.QuestionaryId = questionary.id;
    await answer.save();
    if (req.body.options) {
      const options = await Option.findAll({
        where: { id: req.body.options }
      });
      await answer.setOptions(options);
    } else {
      await answer.setOptions([]);
    }
    res.status(200).json(answer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar la respuesta" });
  }
};

// Eliminar una respuesta por ID
exports.deleteAnswerById = async (req, res) => {
  try {
    const answer = await Answer.findByPk(req.params.id);
    if (!answer) {
      return res.status(404).json({ message: 'Respuesta no encontrada' });
    }
    await answer.destroy();
    res.status(204).json();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar la respuesta" });
  }
};

exports.getUserAnswersCountByCategory = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    
    // Get all distinct categories
    const categories = await Question.findAll({
      attributes: [[Question.sequelize.fn('DISTINCT', Question.sequelize.col('root_category')), 'root_category']]
    });
    const categoriesMap = {};
    categories.forEach((category) => {
      categoriesMap[category.root_category] = 0;
    });

    // Find the last questionnaire for the user
    const lastQuestionary = await Questionary.findOne(
      { where: { UserId: userId }, order: [['created_at', 'DESC']] }
    );
    

    if (!lastQuestionary) {
      // If the user has no questionnaires, return 0 for all categories
      return res.status(200).json(categoriesMap);
    }

    // Get all answers for the last questionnaire
    const answers = await Answer.findAll({ where: { QuestionaryId: lastQuestionary.id } });

    // Count the number of answers per category
    for (const answer of answers) {
      const question = await Question.findByPk(answer.QuestionId);
      const category = question.root_category;
      categoriesMap[category]++;
    }

    // Normalize the counts between 0 and 1
    for (const category in categoriesMap) {
      const count = categoriesMap[category];
      const questionsCount = await Question.count({ where: { root_category: category } });
      const normalizedCount = questionsCount ? count / questionsCount : 0;
      categoriesMap[category] = normalizedCount;
    }

    return res.status(200).json(categoriesMap);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Ha ocurrido un error' });
  }
};
