const express = require("express");
const { PORT } = require("./config");
const app = express();

//database connection
require("./src/db/db");

//set up middlewares and routes
// require("./src/startup/routes")(app);

app.listen(PORT, () => {
  console.log("App is litening on port " + PORT);
});
