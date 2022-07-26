"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      username: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true,
      },
      bio: Sequelize.STRING(2000),
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
      },
      isVerified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      first_name: {
        type: Sequelize.STRING(20),
      },
      last_name: {
        type: Sequelize.STRING(20),
      },
      image: {
        type: Sequelize.STRING(100),
      },
      age: Sequelize.INTEGER,
      gender: Sequelize.ENUM("Male", "Female"),
      password: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      verifiedToken: Sequelize.STRING(100),
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
    await queryInterface.dropTable("users");
  },
};
