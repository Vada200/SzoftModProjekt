const express = require("express");
require("dotenv").config();
const cors = require("cors");
const user = require("./routes/userRoutes");
const path = require("path");
const { getKeys } = require("./controllers/keyController");
const app = express(); //Initialized express
const port = process.env.PORT || 5000;
const Pool = require("pg").Pool;
const userController = require("./controllers/userController");

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

// Main Page
app.get("/keys", (_, res) => {
  res.sendFile(path.resolve("../frontend/html/home.html"));
});

app.get("/styles", (_, res) => {
  res.sendFile(path.resolve("../frontend/styles.css"));
});

app.get("/main", (_, res) => {
  res.sendFile(path.resolve("../frontend/main.js"));
});

// Registration Page
app.get("/register", (_, res) => {
  res.sendFile(path.resolve("../frontend/html/register.html"));
});

app.post("/register", async (req, res) => {
  userController.register(req, res);
});

// Login Page
app.get("/login", (_, res) => {
  res.sendFile(path.resolve("../frontend/html/login.html"));
});

app.post("/login", async (req, res) => {
  userController.login(req, res);
});

// Stats Page
app.get("/stats", (_, res) => {
  res.sendFile(path.resolve("../frontend/html/stats.html"));
});

app.get("/backToHome", (_, res) => {
  res.sendFile(path.resolve("../frontend/backToHome.js"));
});

app.get("/favicon", (_, res) => {
  res.sendFile(path.resolve("../frontend/pictures/favicon.ico"));
});

app.get("/api/keys", async (req, res) => {
  const testData = [
    {
      key_id: "IK-F01",
      floor: "Ground floor",
      key_availability: true,
      remote_availability: true,
    },
    {
      key_id: "IK-F02",
      floor: "Ground floor",
      key_availability: true,
      remote_availability: true,
    },
    {
      key_id: "IK-F02",
      floor: "First floor",
      key_availability: true,
      remote_availability: true,
    },
  ];

  let keyData;

  pool.query("Select * from keys").then((keys) => {
    keyData = keys.rows;
    const mappedData = keyData.reduce((floors, currentFloor) => {
      const floorName = currentFloor.floor;

      const rooms = floors.find(
        (definedFloor) => definedFloor.name === floorName
      )?.rooms;
      if (rooms) {
        rooms.push(currentFloor);
      } else {
        floors.push({
          name: floorName,
          rooms: [currentFloor],
        });
      }

      return floors;
    }, []);

    res.json(mappedData);
  });
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

app.post("/register", async (req, res) => {
  userController.register(req, res);
});

const db = require("./model/index");
db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.listen(port, () => {
  console.log(`Here we go, Engines started at ${port}.`);
});