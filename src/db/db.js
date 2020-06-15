const mongoose = require("mongoose");
//Models references
const UserModel = require("./models/User");
const CustomerModel = require("./models/Customer");
const ExhibitModel = require("./models/Exhibit");
const ExhibitionModel = require("./models/Exhibition");
const TranslationModel = require("./models/Translation");

//
const db = {};
db.mongoose = mongoose;
db.models = {};
db.models.User = UserModel(mongoose);
db.models.Customer = CustomerModel(mongoose);
db.models.TranslationModel = TranslationModel(mongoose);
db.models.ExhibitModel = ExhibitModel(mongoose);
db.models.ExhibitionModel = ExhibitionModel(mongoose);

//database connection settings
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, // Don't build indexes
  poolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};

//get database connection information
const { DB_NAME, DB_HOST, DB_USER, DB_PASS, DB_PORT } = require("../../config");

//connect to database here;
mongoose
  .connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, options)
  .then(() => console.log("Connected to db"))
  .catch((err) => console.log("Connect to db failed: ", err));

module.exports = db;
