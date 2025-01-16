// var puts variable directly to the Global scope by default
// both date should be in dd-mm-yyyy format.
// have to find out which date will result in the lest amount of refund money
// so if i save a day that means except that day all other day has to be refunded ,
// to minimize business loss i have to save one day which  will results to least amount of
// refund money given to customers ==> means select the day wich has the most sale so giving
// less refund money .  your task is to minimize this overall refund cost.
// Key Takeaway
// The task requires you to compare the refund money for
//  all other dates when a specific day is saved.
//  This is why you calculate refund money for orders associated with all dates
//  except the one you choose to save.

var url, startDate, endDate;

const { GoogleSpreadsheet } = require("google-spreadsheet");
const fs = require("fs");
const path = require("path");

const CREDENTIALS_PATH = path.join(__dirname, "API-KEY.json");
const SHEET_ID = "YOUR_SHEET_ID"; // Replace with your sheet ID

async function testAuth() {
  try {
    const creds = JSON.parse(fs.readFileSync(CREDENTIALS_PATH, "utf8"));
    const doc = new GoogleSpreadsheet(SHEET_ID);
    await doc.useServiceAccountAuth(creds);
    console.log("Authentication successful!");
  } catch (err) {
    console.error("Authentication failed:", err);
  }
}

testAuth();
