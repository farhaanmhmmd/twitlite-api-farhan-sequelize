"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("likes", {
      like_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      post_id: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: "posts",
          key: "post_id",
        },
      },
      likePost: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("likes");
  },
};
