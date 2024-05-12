const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Social_service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Social_service.init(
    {
      title: DataTypes.TEXT,
      img: DataTypes.TEXT,
      description: DataTypes.TEXT,
      address: DataTypes.TEXT,
      category: DataTypes.TEXT,
      ownerId: DataTypes.INTEGER,
      contacts: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Social_service",
    }
  );
  return Social_service;
};
