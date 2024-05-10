/* eslint-disable quotes */

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "userId" });
      this.belongsTo(models.Kid, { foreignKey: "kidId" });
    }
  }
  Event.init(
    {
      userId: DataTypes.INTEGER,
      title: DataTypes.TEXT,
      description: DataTypes.TEXT,
      date: DataTypes.DATE,
      cost: DataTypes.INTEGER,
      kidId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Event",
    }
  );
  return Event;
};
