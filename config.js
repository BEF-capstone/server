// const { get } = require("./routes/AuthRoutes");

require("dotenv").config();
require("colors");

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
const SECRET_KEY = process.env.SECRET_KEY || "secret-dev";
const BCRYPT_WORK_FACTOR = 10;

const getDatabaseUri = () => {
  const dbUser = process.env.DATABASE_USER || `postgres`;
  const dbPassword = process.env.DATABASE_PASSWORD
    ? encodeURI(process.env.DATABASE_PASSWORD)
    : `postgres`;
  const dbHost = process.env.DATABASE_HOST || `localhost`;
  const dbPort = process.env.DATABASE_PORT || 5432;
  const dbTestName = process.env.DATABASE_TEST_NAME || `chef_compass_test`;
  const dbProdName = process.env.DATABASE_NAME || `chef_compass`;
  const dbName = process.env.NODE_ENV == `test` ? dbTestName : dbProdName;
  return (
    process.env.DATABASE_HOSTED_URL ||
    `postgresql://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`
  );
};

console.log(`---`);
console.log(`Chef Compass Config:`.red);
console.log(`PORT: `.blue, PORT);
console.log(`Database:`.blue, getDatabaseUri());
console.log(`---`);

module.exports = {
  PORT,
  getDatabaseUri,
  BCRYPT_WORK_FACTOR,
  SECRET_KEY,
};
