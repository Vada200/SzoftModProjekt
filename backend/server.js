const express = require("express");
require("./configs/dotenv");
const cors = require("cors");
const user = require("./routes/user");
const path = require("path");
const { getKeys } = require("./controllers/keyController");
const app = express(); //Initialized express
const port = process.env.PORT || 5000;
const Pool = require("pg").Pool;
const register = require("./controllers/register");

app.use(express.json());
app.use(cors());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "key_sorter",
  password: "admin",
  dialect: "postgres",
  port: 5432,
});

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  client.query("SELECT NOW()", (err, result) => {
    release();
    if (err) {
      return console.error("Error executing query", err.stack);
    }
    console.log("Connected to Database !");
  });
});

app.get("/keys", (req, res, next) => {
  console.log("TEST DATA :");
  res.sendFile(path.resolve("../html/index.html"));
  //pool.query("Select * from keys").then((testData) => {
  //  console.log(testData);
  // res.send(testData.rows);
  //});
});

const client = require("./configs/database");

client.connect((err) => {
  //Connected Database

  if (err) {
    console.log(err);
  } else {
    console.log("Data logging initiated!");
  }
});

app.use("/users", user); //Route for /users endpoint of API

const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.static("public"));
app.get("/register", function (req, res) {
  res.sendFile(path.resolve("../html/register.html"));
});

app.post("/process_registration", urlencodedParser, function (req, res) {
  register.register(req, res);
});

app.listen(port, () => {
  console.log(`Here we go, Engines started at ${port}.`);
});
