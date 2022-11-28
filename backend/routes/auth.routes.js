const userController = require("../controllers/userController");

module.exports = (app) => {
  app.post("/register", async (req, res) => {
    await userController.register(req, res);
  });

  app.post("/login", async (req, res) => {
    await userController.login(req, res);
  });

  app.get("/logout", async (req, res) => {
    await userController.logout(req, res);
  });
};
