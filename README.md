# Google Sheets Sales Analysis-Refund

## This project connects to a Google Sheet and analyzes sales data. It calculates the best day with the most sales and finds out which day would result in the least refund by minimizing business loss.

## Features

- Retrieves sales data from a Google Sheet.
- Computes total sales for each day.
- Identifies the day with the highest sales to minimize refund costs.
- Flexible date formatting to handle custom date ranges.

To run this project, you need the following tools and credentials:

Node.js (v16 or above)
npm (Node Package Manager)
Google Cloud Project with Sheets API enabled
Service Account Key (JSON) for Google Sheets API
Setting Up the Project
Follow the steps below to set up the project on your machine.

1.  #### Clone or Download the Repository

    Clone the repository or download the project folder to your local machine.

    ```bash
        git clone https://github.com/rifat328/google-Sheet-refund-.git
    ```

2.  #### Install Dependencies

    - Make sure you have Node.js installed. If you don't have it yet, download Node.js here.

    ```
        https://nodejs.org/en/download
    ```

    - Navigate to your project folder and run the following command to install the required dependencies:

    ```bash
        npm install
    ```

    This will install all the dependencies listed in package.json.

3.  #### Set Up Google API Credentials

    To interact with Google Sheets, you need a Google Cloud Project with the Google Sheets API and Google Drive API enabled. Follow these steps to set up the credentials:

         1. Go to Google Cloud Console.

         2. Create a new project or select an existing  project.

         3. Enable the Google Sheets API and Google Drive   API.

         4. Create a Service Account under IAM & Admin >    Service Accounts.

         5. Download the JSON key file for the service  account.

         6. Save the JSON file as API-KEY.json in the root  directory of your project.

4.  #### Share Google Sheet with the Service Account

    Make sure the Google Sheets document you're using for the project is shared with the email address associated with your service account (found in the API-KEY.json file).

5.  #### Configure Dates
    Update the startDate and endDate in index.js to specify the date range for the sales analysis:
    ```javascript
    var startDate = "16-03-2023";
    var endDate = "15-08-2023";
    ```
6.  #### Run the Project

    Once everything is set up, run the project with the following command:

    ```bash
        node main.js
    ```

    This will execute the script and output the day with the most sales.

## Customization:

To Populate data to your desired sheet >Access
`javascript
    testDataAutomation.js
    `

change `SHEET_ID` and values according to your liking.

```javascript
node testDataAutomation.js
```

## Code Structure

- `index.js:` Main script for analyzing the sales data.

- `API-KEY.json:` Your Google API credentials for accessing the Google Sheets API.

- `package.json:` Contains project dependencies and metadata.

- `node_modules:` Directory containing installed dependencies.

## Contact Me

If you see face any Problem or want to collaborate contact me:
| Platform | Link |
| --------- | ---------------------------------------------------- |
| Gmail | rifathossain328663@gmail.com |
| Linkedin | https://www.linkedin.com/in/rifat-hossain-a30b691ba/ |
| FaceBook | https://www.facebook.com/rjey.rifat/ |
| Instagram | rjeyrifat |
