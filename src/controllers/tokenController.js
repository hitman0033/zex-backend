const axios = require("axios");
const { cmcApiKey } = require("../config/dotenvConfig");

exports.getTokenData = async (req, res) => {
  let { symbols } = req.query;
  symbols = `${symbols},DEGEN,TYBG,$mfer`
  console.log("symbols:", symbols);
  if (!symbols) {
    return res.status(400).json({ error: "Token symbols are required" });
  }

  try {
    const response = await axios.get(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest`,
      {
        headers: {
          "X-CMC_PRO_API_KEY": cmcApiKey,
          Accept: "application/json",
        },
        params: { symbol: symbols, convert: "USD" },
      }
    );

    if (!response.data?.data) {
      return res.status(404).json({ error: "No data found" });
    }

    const results = Object.values(response.data.data).map((token) => ({
      id: token.id || 0,
      name: token.name || "Unknown",
      symbol: token.symbol || "",
      contract: token.platform?.token_address || "N/A",
      price: token.quote?.USD?.price || 0,
      change_24h: token.quote?.USD?.percent_change_24h || 0,
      change_7d: token.quote?.USD?.percent_change_7d || 0,
      volume_24h: token.quote?.USD?.volume_24h || 0,
      market_cap: token.quote?.USD?.market_cap || 0,
      social_score: token.cmc_rank || 0,
    }));
    results.sort((a, b) => b["market_cap"] - a["market_cap"]);
    res.json(results);
  } catch (error) {
    console.error("Error fetching token data:", error.message);
    res.status(500).json({ error: "Failed to fetch token data" });
  }
};
