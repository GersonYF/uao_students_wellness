//const { Answer, Questionary, Option, Question } = require('../../../config/database');
const { Answer, Questionary, Option, Question } = require('/var/www/html/config/database');


// Controller para obtener todos los cuestionarios
exports.getQuestionaries = async (req, res) => {
  try {
    const questionaries = await Questionary.findAll({
      where: { UserId: req.user.id },
      attributes: ['id', 'title']
    });
    res.status(200).json(questionaries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los cuestionarios" });
  }
};

// Controller para crear un nuevo cuestionario
exports.createQuestionary = async (req, res) => {
  try {
    const { title } = req.body;
    const questionary = await Questionary.create({ title, UserId: req.user.id });
    res.status(201).json(questionary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el cuestionario" });
  }
};

// Controller para obtener un cuestionario por id
exports.getQuestionaryById = async (req, res) => {
  try {
    const questionary = await Questionary.findByPk(req.params.id, {
      where: { user_id: req.user.id },
      include: [
        { model: Answer, include: [{ model: Question, include: [{ model: Option, as: 'options' }] }] }
      ]
    });
    
    
    res.status(200).json(questionary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el cuestionario" });
  }
};
