const { Client } = require("pg");
const { getDatabaseUri } = require("./config");

const db = new Client({ connectionString: getDatabaseUri() });

module.exports = db;
