module.exports = (sequelize, DataTypes) => {
  const Answer = sequelize.define('Answer', {
    answer: {
      type: DataTypes.STRING(200),
      allowNull: true
    }
  });

  return Answer;
};
