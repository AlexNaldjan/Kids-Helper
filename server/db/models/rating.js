'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Rating.init(
    {
      userId: DataTypes.INTEGER,
      serviceId: DataTypes.INTEGER,
      ratingUser: DataTypes.FLOAT(2, 1),
    },
    {
      sequelize,
      modelName: 'Rating',
      tableName: 'Ratings',
    }
  );
  return Rating;
};
