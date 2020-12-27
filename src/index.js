const yargs = require("yargs");
const { version } = require("../package.json");

module.exports = function (_args) {
  const options = yargs
    .usage("Usage: nakal <options> <sheet_id>")
    .epilogue("Backup MySQL databases to Google Sheets")
    .option("u", {
      alias: "user",
      describe: "MySQL Username",
      type: "string",
      demandOption: true,
    })
    .option("p", {
      alias: "pass",
      describe: "MySQL Password",
      type: "string",
    })
    .option("db", {
      describe: "MySQL Database",
      type: "string",
      demandOption: true,
    })
    .options("c", {
      alias: "credentials",
      describe: "Path to credentials.json file for access to Google's APIs.",
      type: "string",
      demandOption: true,
    }).argv;

  const {
    user,
    pass,
    db,
    _: [sheetId],
  } = options;

  console.log({ user, pass, db, sheetId });
};
