const axios = require('axios');
const { TRANSACTION_API_KEY, TRANSACTION_URL } = require("../config/dotenvConfig");

// Helper function for API requests to Rango
const makeRequest = async (url, method, data) => {
  try {
    const response = await axios({
      method,
      url,
      headers: { 'Accept': '*/*', 'Content-Type': 'application/json' },
      data: data,
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error: ${error.response?.data?.message || error.message}`);
  }
};

const getRoute = async (req, res) => {
  console.log("request:", req.body); 
  const { fromChain, toChain, fromSymbol, toSymbol, fromToken, toToken, amount } = req.body;
  const url = `${TRANSACTION_URL}/routing/bests?apiKey=${TRANSACTION_API_KEY}`;
  
  const data = {
    from: { blockchain: fromChain, symbol: fromSymbol, address: fromToken },
    to: { blockchain: toChain, symbol: toSymbol, address: toToken },
    checkPrerequisites: false,
    amount,
  };
  
  try {
    const result = await makeRequest(url, 'POST', data);
    console.log(result);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createTransaction = async (req, res) => {
  const { requestId, step, slippage } = req.body;
  const url = `${TRANSACTION_URL}/tx/create?apiKey=${TRANSACTION_API_KEY}`;
  
  const data = {
    userSettings: { slippage, infiniteApprove: false },
    validations: { balance: true, fee: true, approve: true },
    step,
    requestId,
  };

  try {
    const result = await makeRequest(url, 'POST', data);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const confirmRoute = async (req, res) => {
  const { requestId, fromChain, toChain, fromAddress, toAddress } = req.body;
  const url = `${TRANSACTION_URL}/routing/confirm?apiKey=${TRANSACTION_API_KEY}`;
  
  const data = {
    selectedWallets: { [fromChain]: fromAddress, [toChain]: toAddress },
    requestId,
  };

  try {
    const result = await makeRequest(url, 'POST', data);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const checkStatus = async (req, res) => {
  const { requestId, txId, step } = req.body;
  const url = `${TRANSACTION_URL}/tx/check-status?apiKey=${TRANSACTION_API_KEY}`;
  
  const data = { requestId, txId, step };

  try {
    const result = await makeRequest(url, 'POST', data);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const checkApprovalTx = async (req, res) => {
  const { requestId, txHash } = req.body;
  const url = `${TRANSACTION_URL}/tx/${requestId}/check-approval?txId=${txHash}&apiKey=${TRANSACTION_API_KEY}`;
  
  try {
    const result = await makeRequest(url, 'GET');
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getRoute, createTransaction, confirmRoute, checkStatus, checkApprovalTx };

