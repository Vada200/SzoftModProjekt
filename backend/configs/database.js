const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  user: "postgres",
  password: "admin",
  database: "key_sorter",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
}); //Configuring PostgresSQL Database

module.exports = client;
