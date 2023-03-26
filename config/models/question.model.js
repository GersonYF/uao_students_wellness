module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define('Question', {
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return Question;
};
