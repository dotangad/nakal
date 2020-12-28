const { GoogleSpreadsheet } = require("google-spreadsheet");

module.exports = {
  write: async function (credentials, data, sheetId, time) {
    try {
      const doc = new GoogleSpreadsheet(sheetId);
      await doc.useServiceAccountAuth(credentials);
      await doc.loadInfo();

      for (let { table, rows, headers } of data) {
        const sheet = await doc.addSheet({ title: `${time}-${table}` });
        await sheet.setHeaderRow(headers);
        await sheet.addRows(rows.map(Object.values));
      }

      return;
    } catch (e) {
      console.error("An error occurred");
      console.error(e);
      process.exit(1);
    }
  },
};
