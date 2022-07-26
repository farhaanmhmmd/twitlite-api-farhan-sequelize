"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      posts.belongsTo(models.users, {foreignKey: "user_id", as: "posts"});
      posts.hasMany(models.likes, {foreignKey: "post_id", as: "postLikes"});
      posts.hasMany(models.comments, {
        foreignKey: "post_id",
        as: "postComments",
      });
    }
  }
  posts.init(
    {
      post_id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      caption: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: "",
      },
      postImage: DataTypes.STRING(100),
    },
    {
      sequelize,
      modelName: "posts",
    }
  );
  return posts;
};
