const express = require("express");
const cors = require("cors");

const app = express(); //Initialized express

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;
const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "key_sorter",
  password: "admin",
  dialect: "postgres",
  port: 5432,
});

/* To handle the HTTP Methods Body Parser 
   is used, Generally used to extract the 
   entire body portion of an incoming 
   request stream and exposes it on req.body 
*/

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
  pool.query("Select * from keys").then((testData) => {
    console.log(testData);
    res.send(testData.rows);
  });
});

app.listen(port, () => {
  console.log(`Here we go, Engines started at ${port}.`);
});

require("./configs/dotenv");
const client = require("./configs/database");

client.connect((err) => {
  //Connected Database

  if (err) {
    console.log(err);
  } else {
    console.log("Data logging initiated!");
  }
});

const user = require("./routes/user");

app.use("/users", user); //Route for /user endpoint of API
