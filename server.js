const app = require("./app");
// Start the server
const PORT = 3001;
//enabling the localhost at PORT - 3001
app.listen(PORT, () => {
  //console logging the iniation of the server
  console.log(`Server running on port ${PORT}`);
});
