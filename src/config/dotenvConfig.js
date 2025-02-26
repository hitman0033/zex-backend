require("dotenv").config();

module.exports = {
  port: process.env.PORT || 5000,
  cmcApiKey: process.env.CMC_API_KEY,
};
