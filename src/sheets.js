const { google } = require("googleapis");

module.exports = {
  authenticate: function (clientEmail, clientSecret) {
    return new google.auth.JWT(clientEmail, null, clientSecret, [
      "https://www.googleapis.com/auth/drive",
      "https://www.googleapis.com/auth/drive.file",
      "https://www.googleapis.com/auth/spreadsheets",
    ]);
  },
  write: async function (auth, data, sheetId, time) {
    const spreadsheets = google.sheets({ version: "v4", auth });
    let spreadsheet;
    try {
      spreadsheet = await spreadsheets.spreadsheets.get({
        spreadsheetId: sheetId,
      });
    } catch (e) {
      console.error("Invalid sheetId");
      console.error(e);
      process.exit(1);
    }

    const sheetIndexes = {};
    try {
      for (let { table } of data) {
        sheetIndexes[table] = (
          await spreadsheets.spreadsheets.batchUpdate({
            spreadsheetId: sheetId,
            requestBody: {
              includeSpreadsheetInResponse: true,
              requests: [
                {
                  addSheet: {
                    properties: {
                      title: `${time}-${table}`,
                    },
                  },
                },
              ],
            },
          })
        ).data.replies[0].addSheet.properties.index;
      }
    } catch (e) {
      console.error("Error creating sheets");
      console.error(e);
      process.exit(1);
    }

    console.log(sheetIndexes);

    return;
  },
};

// export const drive = google.drive({ version: "v3", auth });
// export const docs = google.docs({ version: "v1", auth });
