const {DataTypes, Model} = require("sequelize");
const sequelize = require("../database/index.js");
const Address = require("./Address");

class User extends Model {}

User.init(
  {
    user_id: {
      type: DataTypes.INTEGER, // int
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(20), // varchar(100)
      allowNull: false, // not null
      unique: true,
    },
    bio: DataTypes.STRING(2000),
    email: {
      type: DataTypes.STRING(50), // varchar(100)
      allowNull: false, // not null
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
    gender: DataTypes.ENUM("M", "F"),
    password: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    verifiedToken: DataTypes.STRING(100),
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
  }
);

User.hasMany(Address, {foreignKey: "user_id", as: "addresses"});

module.exports = User;
