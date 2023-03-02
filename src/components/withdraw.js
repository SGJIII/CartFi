/*This code uses the crypto module to sign the withdrawal request with the secret key, 
and the axios library to send the request to the Binance.US API. You'll need to replace 
<your_api_key>, <your_secret_key>, <account_name>, <account_number>, <routing_number>, 
<bank_address>, <bank_city>, <bank_state>, <bank_zip>, and <withdrawal_amount> with your own values.

Once you've updated the values, you can run this code in a Node.js environment or integrate it into 
a web application that uses JavaScript. Note that the withdrawal request will be subject to
Binance.US's withdrawal limits, fees, and verification requirements, and it may take some time for 
the funds to arrive in the bank account.

*** Need to figure out how to trigger this code after transfer.sol is called.
*/
const crypto = require("crypto");
const axios = require("axios");

// Binance.US API credentials
const API_KEY = "<your_api_key>";
const SECRET_KEY = "<your_secret_key>";

// Bank account details
const ACCOUNT_NAME = "<account_name>";
const ACCOUNT_NUMBER = "<account_number>";
const ROUTING_NUMBER = "<routing_number>";
const BANK_ADDRESS = "<bank_address>";
const BANK_CITY = "<bank_city>";
const BANK_STATE = "<bank_state>";
const BANK_ZIP = "<bank_zip>";

// Withdrawal details
const CURRENCY = "USD";
const AMOUNT = "<withdrawal_amount>";

// Construct the withdrawal request parameters
const timestamp = new Date().getTime();
const payload = {
  currency: CURRENCY,
  amount: AMOUNT,
  addressName: ACCOUNT_NAME,
  bankAddress: BANK_ADDRESS,
  bankCity: BANK_CITY,
  bankProvince: BANK_STATE,
  bankPostal: BANK_ZIP,
  bankAccountNumber: ACCOUNT_NUMBER,
  bankRoutingNumber: ROUTING_NUMBER,
  withdrawalFee: 0,
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

// Send the withdrawal request
const url =
  "https://api.binance.us/wapi/v3/withdraw.html?" +
  query_string +
  `&signature=${signature}`;
const headers = { "X-MBX-APIKEY": API_KEY };
axios
  .post(url, {}, { headers })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
