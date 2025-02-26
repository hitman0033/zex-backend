const express = require("express");
const { getTokenData } = require("../controllers/tokenController");

const router = express.Router();

router.get("/", getTokenData);

module.exports = router;
