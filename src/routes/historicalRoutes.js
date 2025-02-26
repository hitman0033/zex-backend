const express = require("express");
const { getHistoricalData } = require("../controllers/historicalController");

const router = express.Router();

router.get("/", getHistoricalData);

module.exports = router;
