const mongoose = require("mongoose");

const MemeCoinSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, 
  name: { type: String, required: true },
  symbol: { type: String, required: true },
  price: { type: Number },
  contract: { type: String },
  logoURI: { type: String }
});

const MemeCoin = mongoose.model("MemeCoin", MemeCoinSchema);
module.exports = MemeCoin;
