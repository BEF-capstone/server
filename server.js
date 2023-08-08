const app = require("./app");
const { PORT } = require("./config");

// Listen to the server on PORT
app.listen(PORT, () => {
  console.log(`Server running on port` + ` http://localhost:${PORT}`.blue);
});
