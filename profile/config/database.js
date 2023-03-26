const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false,
});

/* const Notification = NotificationModel(sequelize, Sequelize);
const Task = TaskModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);

Task.associate({ User, Notification });
User.hasMany(Task, { foreignKey: 'assignedUserId', as: 'tasks' }); */

module.exports = {
/*  Notification,
  Task,
  User, */
  sequelize
};
