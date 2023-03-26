module.exports = (sequelize, DataTypes) => {
  const Option = sequelize.define('Option', {
    text: {
      type: DataTypes.STRING(200),
      allowNull: false
    }
  });

  return Option;
};
