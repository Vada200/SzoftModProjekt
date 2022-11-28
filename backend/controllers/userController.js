const bcrypt = require("bcrypt");
const client = require("../configs/database");
const jwt = require("jsonwebtoken");

//Registration Function
exports.register = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  try {
    const data = await client.query(`SELECT * FROM users WHERE email= $1;`, [
      email,
    ]); //Checking if user already exists
    const arr = data.rows;
    if (arr.length !== 0) {
      return res.status(400).json({
        error: "User already registered!",
      });
    } else {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err)
          res.status(err).json({
            error: "Server error",
          });
        const user = {
          first_name,
          last_name,
          email,
          password: hash,
        };

        //Inserting data into the database
        client.query(
          `INSERT INTO users (first_name, last_name, email, password) VALUES ($1,$2,$3,$4);`,
          [user.first_name, user.last_name, user.email, user.password],
          (err) => {
            if (err) {
              console.error(err);
              return res.status(500).json({
                error: "Database error",
              });
            } else {
              return res.redirect("/login");
            }
          }
        );
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error while registering user!", //Database connection error
    });
  }
};

//Login Function
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await client.query(`SELECT * FROM users WHERE email= $1;`, [
      email,
    ]); //Verifying if the user exists in the database
    const user = data.rows;
    if (user.length === 0) {
      res.status(400).json({
        error: "Incorrect username or password!",
      });
    } else {
      bcrypt.compare(password, user[0].password, (err, result) => {
        //Comparing the hashed password
        if (err) {
          res.status(500).json({
            error: "Server error!",
          });
        } else if (result === true) {
          //Checking if credentials match
          req.session.token = jwt.sign(
            {
              email: email,
            },
            process.env.SECRET_KEY,
            {
              expiresIn: "2h",
            }
          );
          return res.redirect("/keys");
        } else {
          //Declaring the errors
          if (result !== true)
            res.status(400).json({
              error: "Incorrect username or password!",
            });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error occurred while signing in!", //Database connection error
    });
  }
};

// Logout
exports.logout = async (req, res) => {
  try {
    req.session = null;
    return res.redirect("/");
  } catch (err) {
    this.next(err);
  }
};
