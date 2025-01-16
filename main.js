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

var url,
  startDate = "16-03-2023",
  endDate = "15-8-2023";

const { GoogleSpreadsheet } = require("google-spreadsheet");
const { JWT } = require("google-auth-library");

const SHEET_ID = "1z4i3PBBDz6E84mfDeUSxa1B2l7Tq7TiuGSI3pOjGxzM";
// const creds = path.join(__dirname, "API-KEY.json"); // Path of service account JSON file
const credentials = "./API-KEY.json";
const serviceAccountAuth = new JWT({
  keyFile: "./API-KEY.json",
  email: credentials.client_email,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
const formattedDates = formatDates(startDate, endDate);

async function checkSaveDay({ startDate, endDate }) {
  try {
    // const doc = new GoogleSpreadsheet(SHEET_ID, serviceAccountAuth);
    // await doc.loadInfo();
    console.log(`${startDate} ::: ${endDate}`);
  } catch (error) {
    console.error("Error: ", error);
  }
}

checkSaveDay(formattedDates);
function formatDates(startDate, endDate) {
  function formatDate(inputData) {
    const parts = inputData.split("-");
    if (parts.length !== 3) {
      throw new Error(
        "Invalid Data Format please change, Expected format: DD-MM-YYYY"
      );
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

// const startDate= this.startDate.padStart(2,'0')

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
