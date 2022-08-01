"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      users.hasMany(models.posts, {foreignKey: "user_id", as: "posts"});
      users.hasMany(models.comments, {
        foreignKey: "user_id",
        as: "userComments",
      });
      users.hasMany(models.likes, {foreignKey: "user_id", as: "userLikes"});
    }
  }
  users.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(20),
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      bio: DataTypes.STRING(2000),
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      isVerified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      first_name: {
        type: DataTypes.STRING(20),
      },
      last_name: {
        type: DataTypes.STRING(20),
      },
      image: {
        type: DataTypes.STRING(100),
      },
      age: DataTypes.INTEGER,
      gender: DataTypes.ENUM("Male", "Female"),
      password: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      verifiedToken: DataTypes.STRING(100),
    },
    {
      sequelize,
      modelName: "users",
    }
  );
  return users;
};
