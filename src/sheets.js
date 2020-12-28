const { google } = require("googleapis");

module.exports = {
  authenticate: function (clientEmail, clientSecret) {
    return new google.auth.JWT(clientEmail, null, clientSecret, [
      "https://www.googleapis.com/auth/drive",
      "https://www.googleapis.com/auth/drive.file",
      "https://www.googleapis.com/auth/spreadsheets",
    ]);
  },
  write: async function (auth, data, sheetId, time, credentials) {
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
        const r = await spreadsheets.spreadsheets.batchUpdate({
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
        });

        sheetIndexes[table] = r.data.replies[0].addSheet.properties.index;
      }
    } catch (e) {
      console.error("Error creating sheets");
      console.error(e);
      process.exit(1);
    }

    try {
      spreadsheet = await spreadsheets.spreadsheets.get({
        spreadsheetId: sheetId,
      });

      console.log(spreadsheet.data.sheets);

      for (let { table, rows, headers } of data) {
        const range = `${time}-${table}!A1:${time}-${table}!${String.fromCharCode(
          64 + headers.length
        )}${rows.length + 1}`;
        const values = [headers, ...rows.map(Object.values)];
        await spreadsheets.spreadsheets.values.batchUpdate({
          spreadsheetId: sheetId,
          resource: { data: [{ range, values }], valueInputOption: "RAW" },
        });
      }
    } catch (e) {
      console.error("Error creating sheets");
      // console.error(e);
      process.exit(1);
    }

    return;
  },
};

// export const drive = google.drive({ version: "v3", auth });
// export const docs = google.docs({ version: "v1", auth });
