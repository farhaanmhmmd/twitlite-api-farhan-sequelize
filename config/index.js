require("dotenv").config();
const Sequelize = require("sequelize");

const {DB_HOST, DB_USER, DB_PASSWORD, DB_NAME} = process.env;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then((res) => console.log("Connection has been established successfully"))
  .catch((err) => console.error("Unable to connect to database", err));

module.exports = sequelize;
