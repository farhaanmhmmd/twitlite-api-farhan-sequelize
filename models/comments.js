"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      comments.belongsTo(models.posts, {
        foreignKey: "post_id",
        as: "postComments",
      });
      comments.belongsTo(models.users, {
        foreignKey: "user_id",
        as: "userComments",
      });
    }
  }
  comments.init(
    {
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
      commentPost: {
        type: DataTypes.STRING(200),
        allowNull: false,
        defaultValue: "",
      },
    },
    {
      sequelize,
      modelName: "comments",
    }
  );
  return comments;
};
