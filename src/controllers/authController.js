const HttpStatus = require("../helper/httpHelper");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const tokenHelper = require("../helper/tokenHelper");

function AuthController(User, Customer) {
  /**
   * Login route handler
   */
  async function postLogin(req, res) {
    const { email, password } = req.body;
    let user = await User.findOne({ Email: email });
    if (!user)
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send("Invalid username or password");
    if (!user.Active)
      return res.status(HttpStatus.FORBIDDEN).send("User is not active");
    const match = await bcrypt.compare(password, user.Password);
    if (!match)
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send("Invalid username or password");
  }

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
    let doc = await User.findOneAndUpdate({ Email: email }, update, {
      new: true,
      upsert: true,
      rawResult: true,
      runValidators: true,
    });
    if (doc.lastErrorObject.updatedExisting)
      res.status(HttpStatus.BAD_REQUEST).send("User already exists");

    await customer.save();
    //Todo: send an email to user

    res.status(HttpStatus.OK).send("User has been created.");
  }

  /**
   * User
   */
  function getForget(req, res) {}

  function getReset(req, res) {}

  function postReset(req, res) {}

  function getActivateAccount(req, res) {}

  return {
    postLogin,
    postCreateSingleCustomer,
    getForget,
    getReset,
    postReset,
    getActivateAccount,
  };
}

module.exports = AuthController;
