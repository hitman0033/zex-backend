const mongoose = require("mongoose");
require("dotenv").config(); // Load .env variables

const mongoURI = process.env.MONGO_URI || "your-default-mongodb-uri";

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

module.exports = mongoose;
