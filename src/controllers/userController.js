const HttpStatus = require("../helper/httpHelper");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const jwthelper = require("../helper/tokenHelper");

function UserController(User, Customer) {
  /**
   * User: GUIDEXP
   * Get all customers
   */
  async function getAllCustomer(req, res) {}

  /**
   * User: GUIDEXP
   * Get all MANAGER type users
   */
  async function getAllManager(req, res) {}

  /**
   * User: GUIDEXP, MANAGER
   * Get all STAFF type users based on a MANAGER id
   */
  async function getAllStaff(req, res) {}

  /**
   * User: GUIDEXP
   *
   */
  async function getSingleCustomer(req, res) {}

  /**
   * User: GUIDEXP
   */
  async function getSingleManager(req, res) {}

  /**
   * User: GUIDEXP, MANAGER
   */
  async function getSingleStaff(req, res) {}

  /**
   * GUIDEXP admin create a new customer
   * Tables:
   *  - Customer => insert customer name and customer description and create a new customer_id
   *  - User => insert a new user with the customer_id and ROLE=MANAGER
   *
   * Send activation link to the email with the randomly generated password
   */
  async function postCreateSingleCustomer(req, res) {
    const { name, description, email, first_name, last_name } = req.body;
    const customer = new Customer();
    customer.Name = name;
    customer.Description = description;
    //generate a random password and activation string
    const password = crypto.randomBytes(4).toString("hex");
    const hash = crypto.randomBytes(32).toString("hex");
    const query = { Email: email };
    const update = {
      $setOnInsert: {
        Role: 2,
        First_Name: first_name,
        Last_Name: last_name,
        Password: password,
        Hash: hash,
        Customer_Id: customer._id,
        Active: false,
      },
    };
    let doc = await User.findOneAndUpdate(query, update, {
      //new:true return the document after update was applied
      //upsert: if no document matches filter, mongodb will insert one by combining filter and update
      //rawResult: return the raw result from the mongodb driver
      new: true,
      upsert: true,
      rawResult: true,
      runValidators: true,
    });
    //check whether it is an upsert
    if (doc.lastErrorObject.updatedExisting)
      res.status(HttpStatus.BAD_REQUEST).send("User already exists");

    await customer.save();
    //Todo: send an email to user

    res.status(HttpStatus.OK).send("User has been created.");
  }

  async function postCreateSingleStaff(req, res) {}

  async function postActivateUser(req, res) {}

  async function postDeactivateUser(req, res) {}

  return {
    getAllCustomer,
    getAllManager,
    getAllStaff,
    getSingleCustomer,
    getSingleManager,
    getSingleStaff,
    postCreateSingleCustomer,
    postCreateSingleStaff,
    postActivateUser,
    postDeactivateUser,
  };
}

module.exports = UserController;
