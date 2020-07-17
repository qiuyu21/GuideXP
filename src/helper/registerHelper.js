const bcrypt = require("bcrypt");
const crypto = require("crypto");
const RoleHelper = require("./roleHelper");
const moment = require("moment");
const { status_codes, error_codes } = require("./responseHelper.js");

function RegisterUserHelper(req, res, mongoose, User, Customer) {
  async function register(ROLE) {
    const { body: data } = req;
    //synchronous operations
    //Create a random password and a hash for activation in production environment
    let password;
    if (process.env.NODE_ENV === "development") {
      password = "password";
    } else {
      password = crypto.randomBytes(4).toString("hex"); //String of length 8
    }
    const token = crypto.randomBytes(16).toString("hex"); //String of length 32
    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);
    //
    let customer_id;
    //create a new customer id
    if (ROLE === RoleHelper.MANAGER) customer_id = mongoose.Types.ObjectId();
    else customer_id = req.user.Customer; //ROLE === RoleHelper.STAFF

    const query = { Email: data.email };
    const update = {
      $setOnInsert: {
        Role: ROLE,
        First_Name: data.first_name,
        Last_Name: data.last_name,
        Password: hashpassword,
        Hash: token,
        Active: false,
        Customer: customer_id,
        Created_By: req.user._id,
      },
    };
    const doc = await User.findOneAndUpdate(query, update, {
      //new:true return the document after update was applied
      //upsert: if no document matches filter, mongodb will insert one by combining filter and update
      //rawResult: return the raw result from the mongodb driver
      new: true,
      upsert: true,
      rawResult: true,
      runValidators: true,
    });

    //check whether it is an upsert otherwise send error 400 notifying client user already exists
    if (doc.lastErrorObject.updatedExisting) {
      const msg = {};
      msg.code = error_codes.ERROR_USER_EXIST;
      msg.message = "Email already exists";
      return res.status(status_codes.FORBIDDEN).send(msg);
    }

    if (ROLE === RoleHelper.MANAGER) {
      const customer = new Customer();
      customer._id = customer_id;
      customer.Name = data.name;
      customer.Description = data.description;
      customer.Active = false;
      customer.Subscribed = false;
      customer.Free_Trial = data.days !== 0;
      if (data.days !== 0)
        customer.Free_Trial_End = moment()
          .utc()
          .add(data.days, "days")
          .format();
      await customer.save();
    }
    //Todo:
    //Send an email to client

    //return success response to client
    const msg = {};
    if (ROLE === RoleHelper.MANAGER) {
      msg.id = customer_id;
      msg.message = `Customer ${data.name} has been created, and an email with activation link has been sent to ${data.email}`;
      res.status(status_codes.OK).send(msg);
    }
    else {
      msg.message = `Staff ${data.first_name} has been created, and an email with activation link has been sent to ${data.email}`;
      res.status(status_codes.OK).send(msg);
    }
  }

  async function guidexpRegister() {
    const { body: data } = req;
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(data.password, salt);
    const query = { Email: data.email };
    const update = {
      $setOnInsert: {
        Role: RoleHelper.GUIDEXP,
        First_Name: data.first_name,
        Last_Name: data.last_name,
        Password: hashpassword,
        Active: true,
      },
    };
    const doc = await User.findOneAndUpdate(query, update, {
      new: true,
      upsert: true,
      rawResult: true,
      runValidators: true,
    });
    if (doc.lastErrorObject.updatedExisting)
      return res.status(status_codes.BAD_REQUEST).send("User already exists");
    res.status(status_codes.OK).send("GUIDEXP has been created");
  }

  return {
    register,
    guidexpRegister,
  };
}

module.exports = RegisterUserHelper;
