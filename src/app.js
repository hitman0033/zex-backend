const express = require("express");
const cors = require("cors");
const { port } = require("./config/dotenvConfig");

const tokenRoutes = require("./routes/tokenRoutes");
const historicalRoutes = require("./routes/historicalRoutes");
const memeCoinRoutes = require("./routes/memeCoinRoutes");
const paymasterRoutes = require("./routes/paymasterRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const app = express();
app.use(cors());
app.use(express.json());

// Routes

app.use("/api/tokens", (req, res, next) => {
  console.log("Request to /api/tokens:", req.method, req.url);
  next();
}, tokenRoutes);

app.use("/api/historical", (req, res, next) => {
  console.log("Request to /api/historical:", req.method, req.url);  // Log the incoming request
  next();
}, historicalRoutes);

app.use("/api/basememe", (req, res, next) => {
  console.log("Request to /api/basememe:", req.method, req.url);  // Log the incoming request
  next();
}, memeCoinRoutes);

app.use("/api/paymaster", (req, res, next) => {
  console.log("Request to /api/paymaster:", req.method, req.url);
  next();
}, paymasterRoutes);

app.use("/api/transaction", (req, res, next) => {
  console.log("Request to /api/transaction:", req.method, req.url);
  next();
}, transactionRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
