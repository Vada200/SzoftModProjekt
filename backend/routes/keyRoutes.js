const express = require("express");
const router = express.Router();

const { getKeys, getKeyById } = require("../controllers/keyController");

router.get("/", getKeys);
router.get("/:id", getKeyById);

module.exports = router;
