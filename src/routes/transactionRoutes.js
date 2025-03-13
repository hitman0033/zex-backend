const express = require("express");
const { getRoute, createTransaction, confirmRoute, checkStatus, checkApprovalTx } = require("../controllers/transactionController");

const router = express.Router();

router.post("/get", getRoute);
router.post("/confirm", confirmRoute);

router.post("/create", createTransaction);

router.post("/check", checkStatus);

router.post("/checkapprove", checkApprovalTx);



module.exports = router;