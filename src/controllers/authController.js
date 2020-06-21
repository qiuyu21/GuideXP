const HttpStatus = require("../helper/httpHelper");
const bcrypt = require("bcrypt");
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
    let user = await User.findOne({ Email: email });
    if (user) res.status(HttpStatus.BAD_REQUEST).send("User already exists");
  }

  /**
   *
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
