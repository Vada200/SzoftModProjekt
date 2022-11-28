const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express(); //Initialized express
const port = process.env.PORT || 5000;
const cookieSession = require("cookie-session");

app.use(express.json());
app.use(cors());
app.keys = ["secret_key", "another_secret_key"];

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
  cookieSession({
    name: "user_session",
    keys: ["secret", "another_secret"],
    secret: process.env.COKKIE_SECRET,
    httpOnly: false,
    sameSite: "strict",
  })
);

require("./routes/ui.routes")(app);
require("./routes/key.routes")(app);
require("./routes/auth.routes")(app);

const client = require("./configs/database");
client.connect((err) => {
  //Connected Database

  if (err) {
    console.log(err);
  }
});

app.use(express.static("public"));

app.use("*", (req, res) => {
  res.status(404).json({
    success: "false",
    message: "Page not found",
    error: {
      statusCode: 404,
      message: "You reached a route that is not defined on this server",
    },
  });
});

app.listen(port, () => {});
