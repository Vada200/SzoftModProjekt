const db = require("../model/index.js");
const client = require("../configs/database");
const Action = require("../model/action");
const Key = db.keys;
const Op = db.Sequelize.Op;
const fetchAction = async () => {
  const actionResult = await fetch("/action");
  return actionResult.json();
};

exports.modifyKey = (req, res) => {
  const { keyAvailability, remoteAvailability, keyId } = req.body;
  console.log(req.body);
  try {
    client.query(
      `UPDATE keys SET key_availability=$1, remote_availability=$2 WHERE key_id=$3;`,
      [keyAvailability, remoteAvailability, keyId],
      (err) => {
        if (err) {
          return res.status(500).json({
            error: "Database error " + err,
          });
        } else {
          res.status(200).send({ message: "Key modified successfully" });
        }
      }
    );
  } catch (err) {
    res.status(500).json({
      error: "Database error occurred while modifying data",
    });
  }
};

exports.insertAction = (req, res) => {
  const { userEmail, keyId, actionType, comment } = req.body;
  try {
    //const action = new Action(userId, keyId, actionType, comment);
    client.query(
      `INSERT INTO action (user_email, key_id, action_type, comment) VALUES ($1, $2, $3, $4);`,
      [userEmail, keyId, actionType, comment],
      (err) => {
        if (err) {
          return res.status(500).json({
            error: "Database error " + err,
          });
        } else {
          res.status(200).send({ message: "Action inserted successfully" });
        }
      }
    );
  } catch (err) {
    res.status(500).json({
      error: "Database error occurred while posting data " + err,
    });
  }
};
