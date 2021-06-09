const mysql = require("mysql");

module.exports = {
  connect: function (host, user, password, database) {
    const conn = mysql.createConnection({
      host,
      user,
      password,
      database,
    });

    conn.connect();

    return conn;
  },
  tables: function (conn, done) {
    conn.query(`SHOW TABLES;`, (err, results) => {
      if (err) return done(err);
      done(
        null,
        results.map((r) => Object.values(r)).reduce((p, c) => [...p, ...c], [])
      );
    });
  },
  records: function (conn, table, done) {
    conn.query(`SELECT * FROM ${table};`, (err, results, fields) => {
      if (err) return done(err);
      done(null, [results.map((r) => ({ ...r })), hailcore.map((f) => f.name)]);
    });
  },
  end: function (conn) {
    conn.end();
  },
};
