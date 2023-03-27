const { Sequelize } = require('sequelize');
const UserModel = require('./models/user.model');
const ProfileModel = require('./models/profile.model');
const AnswerModel = require('./models/answer.model');
const OptionModel = require('./models/option.model');
const QuestionModel = require('./models/question.model');
const QuestionaryModel = require('./models/questionary.model');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false,
});

const User = UserModel(sequelize, Sequelize);
const Profile = ProfileModel(sequelize, Sequelize);
const Answer = AnswerModel(sequelize, Sequelize);
const Option = OptionModel(sequelize, Sequelize);
const Question = QuestionModel(sequelize, Sequelize);
const Questionary = QuestionaryModel(sequelize, Sequelize);

Profile.belongsTo(User);
User.hasOne(Profile);

User.hasMany(Questionary, { as: 'questionaries' });

Question.hasMany(Option, { as: 'options' });
Question.hasMany(Answer, { as: 'question_answers' });

Option.belongsTo(Question);
Option.belongsToMany(Answer, { through: 'answer_options' });

Questionary.belongsTo(User);
Questionary.hasMany(Answer);

Answer.belongsTo(Questionary);
Answer.belongsTo(Question);
Answer.belongsToMany(Option, { through: 'answer_options' });

module.exports = {
  User,
  Profile,
  Answer,
  Option,
  Question,
  Questionary,
  sequelize
};
