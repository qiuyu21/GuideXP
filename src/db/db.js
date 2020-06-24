const mongoose = require("mongoose");
const UserSchema = require("./schemas/User");
const CustomerSchema = require("./schemas/Customer");
const ExhibitSchema = require("./schemas/Exhibit");
const ExhibitionSchema = require("./schemas/Exhibition");
const TranslationSchema = require("./schemas/Translation");
const AccessSchema = require("./schemas/Access");

//Models
const User = mongoose.model("User", UserSchema(mongoose));
const Customer = mongoose.model("Customer", CustomerSchema(mongoose));
const Exhibit = mongoose.model("Exhibit", ExhibitSchema(mongoose));
const Exhibition = mongoose.model("Exhibition", ExhibitionSchema(mongoose));
const Translation = mongoose.model("Translation", TranslationSchema(mongoose));
const Access = mongoose.model("Access", AccessSchema(mongoose));

//
const db = {};
db.mongoose = mongoose;
db.models = {};
db.models.User = User;
db.models.Customer = Customer;
db.models.ExhibitModel = Exhibit;
db.models.ExhibitionModel = Exhibition;
db.models.TranslationModel = Translation;
db.models.AccessModel = Access;

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

const {
  DB_NAME_DEV,
  DB_HOST_DEV,
  DB_USER_DEV,
  DB_PASS_DEV,
  DB_PORT_DEV,
  DB_NAME_PRODUCTION,
  DB_HOST_PRODUCTION,
  DB_USER_PRODUCTION,
  DB_PASS_PRODUCTION,
  DB_PORT_PRODUCTION,
} = require("../../config");

//Connect to different database setting based on envrinoment
if (process.env.NODE_ENV === "development") {
  mongoose
    .connect(`mongodb://${DB_HOST_DEV}:${DB_PORT_DEV}/${DB_NAME_DEV}`, options)
    .then(() => console.log(`Connected to development db`))
    .catch((err) => console.log("Connect to db failed: ", err));
} else {
  mongoose
    .connect(
      `mongodb://${DB_HOST_PRODUCTION}:${DB_PORT_PRODUCTION}/${DB_NAME_PRODUCTION}`,
      options
    )
    .then(() => console.log("Connected to production database"))
    .catch((err) => console.log("Connect to db failed: ", err));
}

module.exports = db;
