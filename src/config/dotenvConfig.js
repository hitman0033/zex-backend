require("dotenv").config();

module.exports = {
  port: process.env.PORT || 5000,
  cmcApiKey: process.env.CMC_API_KEY,
  coinRankingApiKey: process.COINRANKING_API_KEY,
  paymasterURL: process.env.COINBASE_PAYMASTER_API,
  paymasterApiKey: process.env.COINBASE_PAYMASTER_API_KEY,
  TRANSACTION_API_KEY: process.env.TRANSACTION_API_KEY, 
  TRANSACTION_URL: process.env.TRANSACTION_URL,
  MONGO_URI: process.env.MONGO_URI,
};
