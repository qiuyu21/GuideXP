const bcrypt = require("bcrypt");
const crypto = require("crypto");
const HttpStatus = require("../helper/httpHelper");
const RoleHelper = require("../helper/roleHelper");

function RegisterUserHelper(req, res, mongoose, User, Customer) {
  async function register(ROLE) {
    const { body: data } = req;
    //synchronous operations
    //Create a random password and a hash for activation
    const password = crypto.randomBytes(4).toString("hex"); //String of length 8
    const token = crypto.randomBytes(16).toString("hex"); //String of length 32
    //Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);
    //
    let customer_id;
    //create a new customer id
    if (ROLE === RoleHelper.MANAGER) customer_id = mongoose.Types.ObjectId();
    else customer_id = req.user.Customer_Id; //ROLE === RoleHelper.STAFF

    const query = { Email: data.email };
    const update = {
      $setOnInsert: {
        Role: ROLE,
        First_Name: data.first_name,
        Last_Name: data.last_name,
        Password: hashpassword,
        Hash: token,
        Active: false,
        Customer_Id: customer_id,
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
    if (doc.lastErrorObject.updatedExisting)
      return res.status(HttpStatus.BAD_REQUEST).send("User already exists");

    if (ROLE === RoleHelper.MANAGER) {
      const customer = new Customer();
      customer._id = customer_id;
      customer.Name = data.name;
      customer.Description = data.description;
      await customer.save();
    }
    //Todo:
    //Send an email to client

    //return success response to client
    res.status(HttpStatus.OK).send("User has been created");
  }

  return register;
}

module.exports = RegisterUserHelper;
