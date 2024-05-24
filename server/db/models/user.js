/* eslint-disable quotes */
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Kid, { foreignKey: 'userId' });
      this.hasMany(models.Event, { foreignKey: 'userId' });
      this.belongsToMany(models.Social_service, {
        foreignKey: 'userId',
        through: 'Ratings',
      });
      this.belongsToMany(models.Social_service, {
        foreignKey: 'userId',
        through: 'Comments',
      });
      this.belongsToMany(models.Social_service, {
        foreignKey: 'userId',
        through: 'Likeds',
      });
      this.hasMany(models.Liked, { foreignKey: 'userId', as: 'favorites' });
    }
  }
  User.init(
    {
      username: DataTypes.TEXT,
      email: DataTypes.TEXT,
      password: DataTypes.TEXT,
      avatar: DataTypes.TEXT,
      role: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
