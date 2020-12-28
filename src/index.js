const yargs = require("yargs");
const fs = require("fs");
const { promisify } = require("util");
const { connect, tables, records, end } = require("./db");
const { write } = require("./sheets");

module.exports = async function (_args) {
  const options = yargs
    .usage("Usage: nakal <options> <sheet_id>")
    .epilogue("Backup MySQL databases to Google Sheets")
    .option("h", {
      alias: "host",
      describe: "MySQL host",
      type: "string",
      default: "127.0.0.1",
    })
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
    host,
    user,
    pass,
    db,
    credentials: credFile,
    _: [sheetId],
  } = options;

  if (!fs.existsSync(credFile)) {
    console.error("Credentials file does not exist");
    process.exit(1);
  }

  let credentials = {};
  try {
    credentials = JSON.parse(fs.readFileSync(credFile));
  } catch (e) {
    console.error("Error reading credentials");
    console.error(e);
    process.exit(1);
  }

  try {
    const conn = connect(host, user, pass, db);

    const t = await promisify(tables)(conn);
    const data = [];
    for (let table of t) {
      const [rows, headers] = await promisify(records)(conn, table);
      data.push({ table, rows, headers });
    }

    const time = new Date().getTime();

    await write(credentials, data, sheetId, time);

    end(conn);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};
