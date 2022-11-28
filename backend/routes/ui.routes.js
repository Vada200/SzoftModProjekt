const path = require("path");
require("../controllers/userController");
module.exports = (app) => {
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

  // Home Page
  app.get("/page", (_, res) => {
    res.sendFile(path.resolve("../frontend/js/page.js"));
  });

  // Registration Page
  app.get("/register", (_, res) => {
    res.sendFile(path.resolve("../frontend/html/register.html"));
  });

  // Login Page
  app.get("/login", (_, res) => {
    res.sendFile(path.resolve("../frontend/html/login.html"));
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
};
