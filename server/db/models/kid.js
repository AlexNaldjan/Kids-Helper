/* eslint-disable quotes */
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Kid extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "userId" });
      this.hasMany(models.Event, { foreignKey: "kidId" });
    }
  }
  Kid.init(
    {
      userId: DataTypes.INTEGER,
      name: DataTypes.TEXT,
      age: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Kid",
    }
  );
  return Kid;
};
