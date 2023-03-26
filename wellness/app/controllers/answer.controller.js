const { Answer, User, Question, Option } = require('../../../config/database');
const { validationResult } = require('express-validator');


// obtener todas las respuestas
exports.getAllAnswers = async (req, res) => {
  try {
    const answers = await Answer.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'username']
        },
        {
          model: Question,
          attributes: ['id', 'text']
        },
        {
          model: Option,
          as: 'selected_options',
          attributes: ['id', 'text']
        }
      ]
    });
    res.status(200).json(answers);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las respuestas', error });
  }
};

// obtener una respuesta por id
exports.getAnswerById = async (req, res) => {
  const { id } = req.params;
  try {
    const answer = await Answer.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ['id', 'username']
        },
        {
          model: Question,
          attributes: ['id', 'text']
        },
        {
          model: Option,
          as: 'selected_options',
          attributes: ['id', 'text']
        }
      ]
    });
    if (!answer) {
      return res.status(404).json({ message: `La respuesta con id ${id} no existe` });
    }
    res.status(200).json(answer);
  } catch (error) {
    res.status(500).json({ message: `Error al obtener la respuesta con id ${id}`, error });
  }
};

exports.getAnswersByUser = async (req, res) => {
  const { userId } = req;
  try {
    const answers = await Answer.findAll({
      where: { userId },
      include: [
        { model: Question, attributes: ['text', 'category'] },
        { model: Option, attributes: ['id', 'text'], through: { attributes: [] } }
      ]
    });
    res.status(200).json(answers);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las respuestas del usuario', error });
  }
};

// crear una respuesta
// crear una respuesta
exports.createAnswer = async (req, res) => {
  const { questionId, selectedOptions, answer } = req.body;
  const userId = req.userId;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(400).json({ message: `El usuario con id ${userId} no existe` });
    }

    const question = await Question.findByPk(questionId);
    if (!question) {
      return res.status(400).json({ message: `La pregunta con id ${questionId} no existe` });
    }

    if (selectedOptions && answer) {
      return res.status(400).json({ message: 'No se puede proporcionar una respuesta y opciones al mismo tiempo' });
    }

    let createdAnswer;

    if (selectedOptions) {
      const options = await Option.findAll({
        where: { id: selectedOptions },
        include: { model: Question }
      });

      if (options.length !== selectedOptions.length) {
        return res.status(400).json({ message: 'No se han proporcionado opciones válidas' });
      }

      createdAnswer = await Answer.create({ UserId: userId, QuestionId: questionId });
      await createdAnswer.addOption(options);
    } else if (answer) {
      if (!answer.trim()) {
        return res.status(400).json({ message: 'La respuesta no puede estar vacía' });
      }
      createdAnswer = await Answer.create({ UserId: userId, QuestionId: questionId, selected_options: [answer] });
    } else {
      return res.status(400).json({ message: 'Se debe proporcionar una respuesta o opciones' });
    }

    res.status(201).json(createdAnswer);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la respuesta', error });
  }
};

// actualizar una respuesta por id
exports.updateAnswerById = async (req, res) => {
  const { id } = req.params;
  const { selectedOptions, answer } = req.body;
  try {
    const answerInstance = await Answer.findByPk(id);
    if (!answerInstance) {
      return res.status(404).json({ message: `La respuesta con id ${id} no existe` });
    }

    if (selectedOptions && answer) {
      return res.status(400).json({ message: 'No se puede proporcionar una respuesta y opciones al mismo tiempo' });
    }

    if (selectedOptions) {
      const options = await Option.findAll({
        where: { id: selectedOptions },
        include: { model: Question }
      });

      if (options.length !== selectedOptions.length) {
        return res.status(400).json({ message: 'No se han proporcionado opciones válidas' });
      }

      await answerInstance.setOptions(options);
    } else if (answer) {
      if (!answer.trim()) {
        return res.status(400).json({ message: 'La respuesta no puede estar vacía' });
      }
      await answerInstance.update({ selected_options: [answer] });
    } else {
      return res.status(400).json({ message: 'Se debe proporcionar una respuesta o opciones' });
    }

    res.status(200).json(answerInstance);
  } catch (error) {
    res.status(500).json({ "message": `Error al actualizar la respuesta con id ${id}`, error });
  }
};
