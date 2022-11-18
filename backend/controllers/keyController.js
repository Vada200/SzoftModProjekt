const db = require("../model/index.js");
const client = require("../configs/database");
const Action = require("../model/action");
const Key = db.keys;
const Op = db.Sequelize.Op;

exports.modifyKey = (req, res) => {
  const { keyAvailability, remoteAvailability, keyId } = req.body;
  try {
    client.query(
      `UPDATE keys SET key_availability=$1, remote_availability=$2 WHERE key_id=$3;`,
      [keyAvailability, remoteAvailability, keyId],
      (err) => {
        if (err) {
          console.log(err);
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

exports.insertAction = async (req, res) => {
  const { name, keyId, comment } = req.body;
  try {
    //const action = new Action(userId, keyId, actionType, comment);
    client.query(
      `INSERT INTO action (name, key_id, taken_timestamp, taken_comment) VALUES ($1, $2, $3, $4);`,
      [name, keyId, Date(), comment],
      (err) => {
        if (err) {
          console.log(err);
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

exports.modifyAction = async (req, res) => {
  const { _, keyId, comment } = req.body;
  console.log(keyId, comment);
  try {
    client.query(
      `UPDATE action SET given_timestamp=$1, given_comment=$2 WHERE key_id=$3 AND given_timestamp IS null;`,
      [Date(), comment, keyId],
      (err) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            error: "Database error " + err,
          });
        } else {
          res.status(200).send({ message: "Action modified successfully" });
        }
      }
    );
  } catch (err) {
    res.status(500).json({
      error: "Database error occurred while modifying data " + err,
    });
  }
};
