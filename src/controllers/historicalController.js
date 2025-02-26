const axios = require("axios");

exports.getHistoricalData = async (req, res) => {
  const { tokenName } = req.query;
  if (!tokenName) {
    return res.status(400).json({ error: "Token name is required" });
  }

  try {
    const coins = await axios.get(`https://api.coingecko.com/api/v3/search?query=${tokenName}`);
    if (!coins.data.coins.length) {
      return res.status(404).json({ error: "Token not found" });
    }
    console.log("coins.data:", coins.data);
    const tokenId = coins.data.coins[0].id;
    const logo_uri = coins.data.coins[0].thumb;

    const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${tokenId}/market_chart`, {
      params: { vs_currency: "usd", days: "7" },
    });

    const formattedData = response.data.prices.map(([timestamp, price]) => ({
      time: new Date(timestamp).toLocaleDateString(),
      price,
    }));

    res.json({ formattedData, logo_uri });
  } catch (error) {
    console.error("Error fetching historical data:", error.message);
    res.status(500).json({ error: "Failed to fetch historical data" });
  }
};
