const express = require("express");
const { PORT } = require("./config");
const app = express();
const path = require("path");

//database connection
require("./src/db/db");

//set up middlewares and routes
require("./src/startup/routes")(app);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log("App is litening on port " + PORT);
});
