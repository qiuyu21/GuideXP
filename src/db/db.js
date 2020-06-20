const mongoose = require("mongoose");
const UserSchema = require("./schemas/User");
const CustomerSchema = require("./schemas/Customer");
const ExhibitSchema = require("./schemas/Exhibit");
const ExhibitionSchema = require("./schemas/Exhibition");
const TranslationSchema = require("./schemas/Translation");

//Models
const User = mongoose.model("User", UserSchema(mongoose));
const Customer = mongoose.model("Customer", CustomerSchema(mongoose));
const Exhibit = mongoose.model("Exhibit", ExhibitSchema(mongoose));
const Exhibition = mongoose.model("Exhibition", ExhibitionSchema(mongoose));
const Translation = mongoose.model("Translation", TranslationSchema(mongoose));

//
const db = {};
db.mongoose = mongoose;
db.models = {};
db.models.User = User;
db.models.Customer = Customer;
db.models.ExhibitModel = Exhibit;
db.models.ExhibitionModel = Exhibition;
db.models.TranslationModel = Translation;

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
