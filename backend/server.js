const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const app = express(); //Initialized express
const port = process.env.PORT || 5000;
const Pool = require("pg").Pool;
const userController = require("./controllers/userController");
const keyController = require("./controllers/keyController");

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
  client.query("SELECT NOW()", (err) => {
    release();
    if (err) {
      return console.error("Error executing query", err.stack);
    }
  });
});

// Index Page
app.get("/", (_, res) => {
  res.sendFile(path.resolve("../frontend/html/index.html"));
});

app.get("/bgpic", (_, res) => {
  res.sendFile(path.resolve("../frontend/pictures/ik_epulet.png"));
});

app.get("/logicon", (_, res) => {
  res.sendFile(path.resolve("../frontend/pictures/logi.png"));
});

app.get("/regicon", (_, res) => {
  res.sendFile(path.resolve("../frontend/pictures/regi.png"));
});

app.get("/keysicon", (_, res) => {
  res.sendFile(path.resolve("../frontend/pictures/keyspic.png"));
});


// Main Page
app.get("/keys", (_, res) => {
  res.sendFile(path.resolve("../frontend/html/home.html"));
});

app.get("/styles", (_, res) => {
  res.sendFile(path.resolve("../frontend/styles.css"));
});

app.get("/registerstyle", (_, res) => {
  res.sendFile(path.resolve("../frontend/register.css"));
});

app.get("/main", (_, res) => {
  res.sendFile(path.resolve("../frontend/js/main.js"));
});

app.get("/regi", (_, res) => {
  res.sendFile(path.resolve("../frontend/js/register.js"));
});

// Registration Page
app.get("/register", (_, res) => {
  res.sendFile(path.resolve("../frontend/html/register.html"));
});

app.post("/register", async (req, res) => {
  await userController.register(req, res);
});

// Login Page
app.get("/login", (_, res) => {
  res.sendFile(path.resolve("../frontend/html/login.html"));
});

app.post("/login", async (req, res) => {
  await userController.login(req, res);
});

// Modify Key
app.post("/api/modifyKey", async (req, res) => {
  await keyController.modifyKey(req, res);
});

// Insert Action
app.post("/api/insertAction", async (req, res) => {
  await keyController.insertAction(req, res);
});

// Insert Action
app.post("/api/modifyAction", async (req, res) => {
  await keyController.modifyAction(req, res);
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

app.get("/generateTables", (_, res) => {
  res.sendFile(path.resolve("../frontend/js/generateTables.js"));
});

app.get("/statsPageQuery", (_, res) => {
  res.sendFile(path.resolve("../frontend/js/statsPageQuery.js"));
});

app.get("/api/keys", async (req, res) => {
  let keyData;

  pool.query("SELECT * FROM keys ORDER BY key_id").then((keys) => {
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

app.get("/api/actions", async (req, res) => {
  pool.query("SELECT * FROM action ORDER BY id").then((actions) => {
    res.json(actions.rows);
  });
});

const client = require("./configs/database");

client.connect((err) => {
  //Connected Database

  if (err) {
    console.log(err);
  }
});

app.use(express.static("public"));
app.get("/register", function (req, res) {
  res.sendFile(path.resolve("../html/register.html"));
});

app.post("/register", async (req, res) => {
  await userController.register(req, res);
});

app.listen(port, () => {});
