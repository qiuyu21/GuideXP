//add some middlewares
//register all first level route here
const bodyParser = require("body-parser");
const cros = require("cors");
//security middleware
const helmet = require("helmet");

module.exports = function (app) {
  app.use(helmet());
  app.use(cros());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
};
