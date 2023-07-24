const app = require("./app");
const { PORT } = require("./config");

// Start the server
app.listen(PORT, () => {
  //console logging the iniation of the server
  console.log(`Server running on port` + ` http://localhost:${PORT}`.blue);
});
