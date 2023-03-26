const { Sequelize } = require('sequelize');
const UserModel = require('./models/user.model');
const ProfileModel = require('./models/profile.model');


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  logging: false,
});

const User = UserModel(sequelize, Sequelize);
const Profile = ProfileModel(sequelize, Sequelize);

Profile.belongsTo(User);
User.hasOne(Profile);

module.exports = {
  User,
  sequelize
};
