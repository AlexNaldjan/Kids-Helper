'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Liked extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Social_service, User }) {
      this.belongsTo(Social_service, {
        foreignKey: 'serviceId',
        as: 'socialService',
      });
      this.belongsTo(User, { foreignKey: 'userId', as: 'user' });
    }
  }
  Liked.init(
    {
      userId: DataTypes.INTEGER,
      serviceId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Liked',
    }
  );
  return Liked;
};
