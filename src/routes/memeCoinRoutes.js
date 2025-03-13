const express = require("express");
const { getMemeCoins, getStoredMemeCoins } = require("../controllers/memeCoinController");

const router = express.Router();

// Define the route to fetch meme coins from Base Chain using CMC API
router.get("/", getMemeCoins);

module.exports = router;
