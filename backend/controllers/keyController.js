const db = require("../model/index.js");
const Key = db.keys;
const Op = db.Sequelize.Op;

// Retrieve all Keys from the database.
exports.findAll = (_, res) => {

  Key.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

// Find a single Key with an id
exports.findOne = (req, res) => {
  const keyId = req.params.keyId;

  Key.findById(keyId)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find key with id=${keyId}`,
        });
      }
    })
    .catch((_) => {
      res.status(500).send({
        message: `Error retrieving Key with id=${keyId}`,
      });
    });
};
