const mysql2 = require("mysql2");

const pool = mysql2.createPool({
  host: "localhost",
  user: "root",
  database: "twitlitesequelized",
  password: "Mysql123",
});

module.exports = pool;
