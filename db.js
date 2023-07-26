const { Client } = require("pg");
const { getDatabaseUri } = require("./config");
require("colors");

// create a pg client with specific connection information
const db = new Client({ connectionString: getDatabaseUri() });

// connect server to database
db.connect((err) => {
  err
    ? console.log(`connection error, ${err.stack}`.red)
    : console.log(`Succesfully connected to postgres db!`.blue);
});

module.exports = db;