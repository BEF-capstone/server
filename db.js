const { Client } = require("pg");
const { getDatabaseUri } = require("./config");
require("colors");

// create a pg client with connection information
const db = new Client({ connectionString: getDatabaseUri() });
// connect server to database
db.connect()
  .then(() => {
    console.log(`Succesfully connected to postgres db!`.blue);
  })
  .catch((err) => {
    console.log(`connection error, ${err.stack}`.red);
  });

module.exports = db;
