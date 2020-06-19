//add some middlewares
//register all first level route here
const bodyParser = require("body-parser");
const cros = require("cors");
//security middleware
const helmet = require("helmet");
//
const auth = require("../routes/auth");
const user = require("../routes/user");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(helmet());
  app.use(cros());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api/auth", auth);
  app.use("/api/user", user);

  app.use(error);
};
