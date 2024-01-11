const mysql = require("mysql2");
require("dotenv").config();

let pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_USER_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = { pool };
