"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      likes.belongsTo(models.posts, {foreignKey: "post_id", as: "postLikes"});
      likes.belongsTo(models.users, {foreignKey: "user_id", as: "userLikes"});
    }
  }
  likes.init(
    {
      like_id: {
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
      post_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "posts",
          key: "post_id",
        },
      },
      likePost: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "likes",
    }
  );
  return likes;
};
