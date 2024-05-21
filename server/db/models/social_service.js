const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Social_service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsToMany(models.User, {
        foreignKey: 'serviceId',
        through: 'Ratings',
      });
      this.belongsToMany(models.User, {
        foreignKey: 'serviceId',
        through: 'Comments',
      });
      this.belongsToMany(models.User, {
        foreignKey: 'serviceId',
        through: 'Likeds',
      });
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
      rating: DataTypes.FLOAT(2, 1),
      contacts: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Social_service',
      tableName: 'Social_services',
    }
  );
  return Social_service;
};
