const bcrypt = require("bcrypt");
const client = require("../configs/database");
const jwt = require("jsonwebtoken");

//Registration Function

exports.register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const data = await client.query(`SELECT * FROM users WHERE email= $1;`, [
      email,
    ]); //Checking if user already exists
    const arr = data.rows;
    if (arr.length != 0) {
      return res.status(400).json({
        error: "Email already there, No need to register again.",
      });
    } else {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err)
          res.status(err).json({
            error: "Server error",
          });
        const user = {
          firstName,
          lastName,
          email,
          password: hash,
        };
        var flag = 1; //Declaring a flag

        //Inserting data into the database

        client.query(
          `INSERT INTO users (first_name, last_name, email, password) VALUES ($1,$2,$3,$4);`,
          [user.firstName, user.lastName, user.email, user.password],
          (err) => {
            if (err) {
              flag = 0; //If user is not inserted to database assigning flag as 0/false.
              console.error(err);
              return res.status(500).json({
                error: "Database error",
              });
            } else {
              flag = 1;
              res
                .status(200)
                .send({ message: "User added to database, not verified" });
            }
          }
        );
        if (flag) {
          const token = jwt.sign(
            //Signing a jwt token
            {
              email: user.email,
            },
            process.env.SECRET_KEY
          );
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database error while registring user!", //Database connection error
    });
  }
};
