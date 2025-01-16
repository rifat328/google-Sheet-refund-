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
// company : AutoBizz
const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library");

const SHEET_ID = "1z4i3PBBDz6E84mfDeUSxa1B2l7Tq7TiuGSI3pOjGxzM";
const credentials = "./API-KEY.json";
const serviceAccountAuth = new JWT({
  keyFile: credentials,
  email: credentials.client_email,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
var URL =
  "https://docs.google.com/spreadsheets/d/1z4i3PBBDz6E84mfDeUSxa1B2l7Tq7TiuGSI3pOjGxzM/edit?usp=sharing";
const startDate = "16-03-2023";
const endDate = "1-04-2023";
const formattedDates = formatDates(startDate, endDate);

async function checkSaveDay({ startDate, endDate }) {
  try {
    const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();

    const ordersSheet = doc.sheetsByTitle["Orders"];
    const lineItemsSheet = doc.sheetsByTitle["LineItems"];

    const ordersRows = await ordersSheet.getRows(); // Array of rows from Orders sheet
    const lineItemsRows = await lineItemsSheet.getRows(); // Array of rows from LineItems sheet
    let salesByDay = {};

    const headers = ordersRows[0]._worksheet._headerValues;
    const startDateObj = new Date(startDate.split("-").reverse().join("-"));
    const endDateObj = new Date(endDate.split("-").reverse().join("-"));

    ordersRows.forEach((order) => {
      const orderId = order._rawData[headers.indexOf("Order ID")];
      const orderDate = order._rawData[headers.indexOf("Order Date")];
      const orderDateObj = new Date(orderDate.split("-").reverse().join("-")); // Convert orderDate to Date object

      // Skip orders that are outside the startDate and endDate range
      if (orderDateObj < startDateObj || orderDateObj > endDateObj) {
        return;
      }

      const headers2 = lineItemsRows[0]._worksheet._headerValues;
      lineItemsRows.forEach((lineItem) => {
        const lineItemOrderId = lineItem._rawData[headers2.indexOf("Order ID")];
        const lineItemPrice = parseFloat(
          lineItem._rawData[headers2.indexOf("Price")]
        );

        // If Order ID matches, add the price of this line item to the total price
        if (lineItemOrderId === orderId) {
          salesByDay[orderDate] = (salesByDay[orderDate] || 0) + lineItemPrice;
        }
      });
    });

    let maxSales = 0;
    let savedDay = null;

    for (const [day, totalSales] of Object.entries(salesByDay)) {
      if (totalSales > maxSales) {
        maxSales = totalSales;
        savedDay = day;
      }
    }

    console.log(
      `The best day with the most sales within the given date range is ${savedDay} with a total of ${maxSales} in sales.`
    );
  } catch (error) {
    console.error("Error: ", error);
  }
}

checkSaveDay(formattedDates);

function formatDates(startDate, endDate) {
  function formatDate(inputData) {
    const parts = inputData.split("-");
    if (parts.length !== 3) {
      throw new Error("Invalid Data Format. Expected format: DD-MM-YYYY");
    }

    const [day, month, year] = parts;
    const formatedDay = String(day).padStart(2, "0");
    const formatedMonth = String(month).padStart(2, "0");
    return `${formatedDay}-${formatedMonth}-${year}`;
  }

  return {
    startDate: formatDate(startDate),
    endDate: formatDate(endDate),
  };
}

// Code Version : 03
// var url,
//   startDate = "16-03-2023",
//   endDate = "15-8-2023";

// const { GoogleSpreadsheet } = require("google-spreadsheet");
// const { JWT } = require("google-auth-library");

// const SHEET_ID = "1z4i3PBBDz6E84mfDeUSxa1B2l7Tq7TiuGSI3pOjGxzM";
// const credentials = "./API-KEY.json";
// const serviceAccountAuth = new JWT({
//   keyFile: "./API-KEY.json",
//   email: credentials.client_email,
//   scopes: ["https://www.googleapis.com/auth/spreadsheets"],
// });
// const formattedDates = formatDates(startDate, endDate);

// async function checkSaveDay({ startDate, endDate }) {
//   try {
//     const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);
//     await doc.loadInfo();

//     const ordersSheet = doc.sheetsByTitle["Orders"];
//     const lineItems = doc.sheetsByTitle["LineItems"];

//     // Get all rows from the sheets
//     // const ordersRows = await ordersSheet.getRows();
//     // const lineItemsRows = await lineItems.getRows();
//     // console.log(ordersRows["Order ID"]);

//     const ordersRows = await ordersSheet.getRows(); // Array of rows from the Orders sheet
//     const lineItemsRows = await lineItems.getRows(); // Array of rows from the LineItems sheet
//     let salesByDay = {};
//     const headers = ordersRows[0]._worksheet._headerValues; //header values

//     ordersRows.forEach((order) => {
//       const orderId = order._rawData[headers.indexOf("Order ID")];
//       const orderDate = order._rawData[headers.indexOf("Order Date")];

//       const headers2 = lineItemsRows[0]._worksheet._headerValues;
//       lineItemsRows.forEach((lineItem) => {
//         const lineItemOrderId = lineItem._rawData[headers2.indexOf("Order ID")];
//         const lineItemPrice = parseFloat(
//           lineItem._rawData[headers2.indexOf("Price")]
//         ); // Making sure Price is a number

//         // If Order ID matches, add the price of this line item to the total price
//         if (lineItemOrderId === orderId) {
//           salesByDay[orderDate] = (salesByDay[orderDate] || 0) + lineItemPrice;
//         }
//       });
//     });
//     // console.log(salesByDay);
//     let maxSales = 0;
//     let savedDay = null;
//     for (const [day, totalSales] of Object.entries(salesByDay)) {
//       if (totalSales > maxSales) {
//         maxSales = totalSales;
//         savedDay = day;
//       }
//     }
//     console.log(
//       `The best day with the most sales is ${savedDay} with a total of ${maxSales} in sales.`
//     );

//   } catch (error) {
//     console.error("Error: ", error);
//   }
// }

// checkSaveDay(formattedDates);
// function formatDates(startDate, endDate) {
//   function formatDate(inputData) {
//     const parts = inputData.split("-");
//     if (parts.length !== 3) {
//       throw new Error(
//         "Invalid Data Format please change, Expected format: DD-MM-YYYY"
//       );
//     }

//     const [day, month, year] = parts;
//     const formatedDay = String(day).padStart(2, "0");
//     const formatedMonth = String(month).padStart(2, "0");
//     return `${formatedDay}-${formatedMonth}-${year}`;
//   }
//   return {
//     startDate: formatDate(startDate),
//     endDate: formatDate(endDate),
//   };
// }

// await ordersSheet.getCellsInRange("B2:B101");

// read/write row values
// console.log(rows[0].get("Order ID"));
// console.log(rows[0].get("Order Date"));
