const express = require("express");
const { paymaster } = require("../controllers/paymasterController");

const router = express.Router();

// Use POST instead of GET
router.post("/", paymaster);

module.exports = router;
