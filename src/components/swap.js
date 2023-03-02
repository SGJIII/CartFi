// Sells USDC for USD on Binance.us using their API
/*
To use this function, you would need to replace <your_api_key> 
and <your_secret_key> with your actual Binance.us API key and 
secret key, respectively. You would also need to provide the amount 
parameter, which is the amount of USDC you want to sell for USD.

Note that this function uses Binance.us's REST API to place a market 
sell order for the USDCUSD trading pair. The function constructs the 
request parameters, signs the request with your API key and secret key, 
and sends the request to Binance.us using the axios library. The 
function returns the response from Binance.us, which will contain 
information about the executed sell order.

*** Need to figure out how to integrate this into the React app.
*/

const crypto = require("crypto");
const axios = require("axios");

const API_KEY = "<your_api_key>";
const SECRET_KEY = "<your_secret_key>";

// Function to sell USDC for USD
async function sellUSDC(amount) {
  // Construct the sell order request parameters
  const endpoint = "/api/v3/order";
  const timestamp = new Date().getTime();
  const payload = {
    symbol: "USDCUSD",
    side: "SELL",
    type: "MARKET",
    quoteOrderQty: amount,
    timestamp: timestamp,
  };
  const query_string = Object.keys(payload)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(payload[key])}`
    )
    .join("&");
  const signature = crypto
    .createHmac("sha256", SECRET_KEY)
    .update(query_string)
    .digest("hex");
  payload.signature = signature;

  // Send the sell order request
  const url =
    "https://api.binance.us" +
    endpoint +
    "?" +
    query_string +
    `&signature=${signature}`;
  const headers = { "X-MBX-APIKEY": API_KEY };
  const response = await axios.post(url, {}, { headers });
  return response.data;
}
