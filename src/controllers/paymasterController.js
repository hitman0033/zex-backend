const axios = require("axios");
const { paymasterURL, paymasterApiKey } = require("../config/dotenvConfig");

exports.paymaster = async (req, res) => {
  try {
    console.log("Request received for Paymaster:", req.body);
    const request = {
      jsonrpc: "2.0",
      id: 1,
      method: "pm_getPaymasterData",
      params: [
        {
          sender: "0xe62B4aD6A7c079F47D77a9b939D5DC67A0dcdC2B",
          nonce: "0x4e",
          initCode: "0x",
          callData: "0xb61d27f60000000000000000000000007746371e8df1d7099a84c20ed72e3335fb016b23000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000000",
          callGasLimit: "0x113e10",
          verificationGasLimit: "0x113e10",
          preVerificationGas: "0x113e10",
          maxFeePerGas: "0x113e10",
          maxPriorityFeePerGas: "0x113e10",
          paymasterAndData: "0x",
          signature: "0x5ee079a5dec73fe39c1ce323955fb1158fc1b9a6b2ddbec104cd5cfec740fa5531584f098b0ca95331b6e316bd76091e3ab75a7bc17c12488664d27caf19197e1c"
        },
        "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
        "0x2105",
        {
          erc20: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913"
        }
      ]
    };
    const response = await axios.post(paymasterURL, req.body, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${paymasterApiKey}`,
      },
    });

    console.log("Paymaster response:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error calling Paymaster API:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
};
