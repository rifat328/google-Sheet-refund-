//version 4: Working. . .

const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library");
const { path } = require("path");
const SHEET_ID = "1z4i3PBBDz6E84mfDeUSxa1B2l7Tq7TiuGSI3pOjGxzM";
// const creds = path.join(__dirname, "API-KEY.json"); // Path of service account JSON file
const credentials = "./API-KEY.json";
const serviceAccountAuth = new JWT({
  keyFile: "./API-KEY.json",
  email: credentials.client_email,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

async function populateTestData() {
  try {
    const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();

    // Access sheets (create if not present)
    let ordersSheet = doc.sheetsByTitle["Orders"];
    if (!ordersSheet) {
      ordersSheet = await doc.addSheet({
        title: "Orders",
        headerValues: ["Order ID", "Order Date"],
      });
    }

    let lineItemsSheet = doc.sheetsByTitle["LineItems"];
    if (!lineItemsSheet) {
      lineItemsSheet = await doc.addSheet({
        title: "LineItems",
        headerValues: ["LineItem ID", "Order ID", "Price"],
      });
    }

    // Fill Orders Sheet
    const orders = [];
    for (let i = 0; i < 100; i++) {
      const randomDay = Math.floor(Math.random() * 30) + 1; // 1 to 30
      const randomMonth = Math.floor(Math.random() * 12) + 1; //1 to 12

      orders.push({
        "Order ID": i,
        "Order Date": `${String(randomDay).padStart(2, "0")}-${String(
          randomMonth
        ).padStart(2, "0")}-2023`,
      });

      // const orders [i] = { "Order ID": 1, "Order Date": "01-01-2023" };
    }

    await ordersSheet.addRows(orders);

    // Fill LineItems Sheet
    const lineItems = [];
    for (let i = 0; i < 1000; i++) {
      const randomOrderId = Math.floor(Math.random() * 100) + 1; // 1 to 100
      const randomPrice = Math.floor(Math.random() * 1200) + 200; //200 to 1200

      // { "LineItem ID": "C1", "Order ID": 3, Price: 250 },
      lineItems.push({
        "LineItem ID": `${"C" + i}`,
        "Order ID": randomOrderId,
        Price: randomPrice,
      });
    }
    await lineItemsSheet.addRows(lineItems);

    console.log("Test data populated successfully!");
  } catch (error) {
    console.error("Error populating test data:", error);
  }
}

populateTestData();

// varsion : 03 not working
// const { GoogleSpreadsheet } = require("google-spreadsheet");
// const { google } = require("googleapis");

// const auth = new google.auth.GoogleAuth({
//   keyFile: "./API-KEY.json",
//   scopes: ["https://www.googleapis.com/auth/spreadsheets"],
// });
// const fs = require("fs");
// const path = require("path");

// const creds = path.join(__dirname, "API-KEY.json"); // Path of service account JSON file
// console.log(creds);
// //Google Sheet ID (from the URL of Google Sheet after d/ ... before /edit)
// const SHEET_ID = "1z4i3PBBDz6E84mfDeUSxa1B2l7Tq7TiuGSI3pOjGxzM";
// // console.log(fs.readFileSync(creds, "utf8"));

// async function populateTestData() {
//   try {
//     const doc = google.sheets({ version: "v4", auth });
//     // const spreadsheet=?
//     // const range=?
//     console.log(doc.spreadsheets);
//     // Access sheets (create if not present)
//     let ordersSheet = doc.sheetsByTitle["Orders"];
//     if (!ordersSheet) {
//       ordersSheet = await doc.addSheet({
//         title: "Orders",
//         headerValues: ["Order ID", "Order Date"],
//       });
//     }

//     let lineItemsSheet = doc.sheetsByTitle["LineItems"];
//     if (!lineItemsSheet) {
//       lineItemsSheet = await doc.addSheet({
//         title: "LineItems",
//         headerValues: ["LineItem ID", "Order ID", "Price"],
//       });
//     }

//     // Fill Orders Sheet
//     const orders = [];
//     for (let i = 0; i < 100; i++) {
//       const randomDay = Math.floor(Math.random() * 30) + 1; // 1 to 30
//       const randomMonth = Math.floor(Math.random() * 12) + 1; //1 to 12

//       orders.push({
//         "Order ID": i,
//         "Order Date": `${String(randomDay).padStart(2, "0")}-${String(
//           randomMonth
//         ).padStart(2, "0")}-2023`,
//       });

//       // const orders [i] = { "Order ID": 1, "Order Date": "01-01-2023" };
//     }

//     await ordersSheet.addRows(orders);

//     // Fill LineItems Sheet
//     const lineItems = [];
//     for (let i = 0; i < 1000; i++) {
//       const randomOrderId = Math.floor(Math.random() * 100) + 1; // 1 to 100
//       const randomPrice = Math.floor(Math.random() * 1200) + 200; //200 to 1200

//       // { "LineItem ID": "C1", "Order ID": 3, Price: 250 },
//       lineItems.push({
//         "LineItem ID": `${"C" + i}`,
//         "Order ID": randomOrderId,
//         Price: randomPrice,
//       });
//     }
//     await lineItemsSheet.addRows(lineItems);

//     console.log("Test data populated successfully!");
//   } catch (error) {
//     console.error("Error populating test data:", error);
//   }
// }

// populateTestData();

// // const credentials = JSON.parse(fs.readFileSync(creds, "utf8"));
// // const doc = new GoogleSpreadsheet(SHEET_ID);
// // await doc.useServiceAccountAuth(credentials);

// // await doc.loadInfo();

// // const accountAuth = new JWT({
// //   email: creds.client_EMAIL,
// //   key: creds.private_key,
// //   scopes: ["https://www.googleapis.com/auth/spreadsheets"],
// // });
// // doc.useCredentials(accountAuth);
// // doc.useCredentials(accountAuth);
// //[Old Method - doesn't work] Authenticate with service account
// // await doc.useServiceAccountAuth({
// //   client_email: creds.client_email,
// //   private_key: creds.private_key.replace(/\\n/g, "\n"),
// // });

// // Load document
