const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Event.init(
    {
      userId: DataTypes.INTEGER,
      title: DataTypes.TEXT,
      description: DataTypes.TEXT,
      date: DataTypes.INTEGER,
      cost: DataTypes.INTEGER,
      status: DataTypes.TEXT,
      isAdmin: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Event",
    }
  );
  return Event;
};
