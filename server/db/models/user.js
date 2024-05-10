/* eslint-disable quotes */
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Kid, { foreignKey: "userId" });
      this.hasMany(models.Event, { foreignKey: "userId" });
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
      modelName: "User",
    }
  );
  return User;
};
