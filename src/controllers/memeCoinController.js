const axios = require("axios");
const { cmcApiKey, coinRankingApiKey } = require("../config/dotenvConfig");
const MemeCoin = require("../models/memeCoinModel"); // Import MemeCoin model
require("../config/mongoConfig"); // Ensure DB connection

// Controller to fetch meme coins from Base Chain
const getMemeCoins = async (req, res) => {
  let start = 1;  // Start fetching from the first coin
  const limit = 250; // Max allowed per request
  let allMemeCoins = [];
  let moreDataAvailable = true;

  try {
    const url = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
    
    const response = await axios.get(url, {
      headers: {
        "X-CMC_PRO_API_KEY": cmcApiKey,
        Accept: "application/json",
      },
      params: {
        start: start,
        limit: limit,
        convert: 'USD'

      },
    });
    if (response.data && response.data.data) {
      const fetchedCoins = response.data.data;
      
      // Filter for meme coins on Base chain
      const memeCoinsOnBase = fetchedCoins.filter(coin =>
          // coin.category === 'meme' && 
          coin.platform && coin.platform.name === 'Base'
      );

      allMemeCoins.push(...memeCoinsOnBase);

      // If the number of coins returned is less than `limit`, stop fetching
      if (fetchedCoins.length < limit) {
          moreDataAvailable = false;
      } else {
          start += limit; // Move to the next batch
      }
    } else {
        moreDataAvailable = false;
    }
    // console.log("allMemeCoins:", allMemeCoins, start);
    res.status(200).json(allMemeCoins);
  } catch (error) {
    console.error("Error fetching meme coins:", error.message);
    res.status(500).json({ message: "Error fetching meme coins", error: error.message });
  }
};

// const axios = require("axios");
// const { COINRANKING_API_KEY } = process.env; // Ensure API Key is loaded

// const getMemeCoins = async (req, res) => {
//   let offset = 0;
//   const limit = 100;
//   let allMemeCoins = [];
//   let moreDataAvailable = true;

//   try {
//     while (moreDataAvailable) {
//       console.log(`Fetching meme coins from offset: ${offset}`);

//       const options = {
//         headers: { "x-access-token": coinRankingApiKey },
//         params: { offset, tags: "meme", limit },
//       };

//       const response = await axios.get("https://api.coinranking.com/v2/coins", options);

//       if (response.data && response.data.data) {
//         const memeCoins = response.data.data.coins;
        
//         // ✅ Extract only Base chain meme coins
//         const baseMemeCoins = memeCoins.filter((coin) =>
//           coin.contractAddresses?.some((contract) => contract.toLowerCase().includes("base"))
//         );
//         console.log("baseMemeCoins:", baseMemeCoins)
//         for (const coin of baseMemeCoins) {
//           await MemeCoin.findOneAndUpdate(
//             { id: coin.uuid }, // Search by unique ID
//             {
//               name: coin.name,
//               symbol: coin.symbol,
//               price: coin.price || 0,
//               contract: "N/A",
//               logoURI:  coin.iconUrl || '',
//             },
//             { upsert: true, new: true }
//           );
//         }
//         allMemeCoins.push(...baseMemeCoins); // ✅ Corrected: Flatten the array

//         // ✅ Stop fetching if we get less than `limit` (last batch)
//         if (memeCoins.length < limit) {
//           moreDataAvailable = false;
//         } else {
//           offset += limit; // ✅ Move to next batch
//         }
//       } else {
//         moreDataAvailable = false;
//       }
//     }
//     console.log(`Total Meme Coins Found: ${allMemeCoins.length}`);
//     res.status(200).json(allMemeCoins);
//   } catch (error) {
//     console.error("Error fetching meme coins:", error.message);
//     res.status(500).json({ message: "Error fetching meme coins", error: error.message });
//   }
// };

// ✅ Fetch All Meme Coins from MongoDB
const getStoredMemeCoins = async (req, res) => {
  try {
    const memeCoins = await MemeCoin.find(); // Fetch all documents from MongoDB
    console.log("memeCoins:", memeCoins);
    res.status(200).json(memeCoins);
  } catch (error) {
    console.error("❌ Error fetching meme coins from DB:", error.message);
    res.status(500).json({ message: "Error retrieving meme coins", error: error.message });
  }
};

module.exports = { getMemeCoins, getStoredMemeCoins };

