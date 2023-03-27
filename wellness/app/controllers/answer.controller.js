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
      include: [{ model: Question, include: Option }]
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
