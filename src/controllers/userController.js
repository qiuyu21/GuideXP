const HttpStatus = require("../helper/httpHelper");
const ROLE = require("../helper/roleHelper");
const crypto = require("crypto");
const RegisterUserHelper = require("../helper/registerHelper");

function UserController(mongoose, User, Customer) {
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
   * GUIDEXP create a new customer
   * req.body: {name, description, email, first_name, last_name}
   *
   * Tables:
   *  - Customer => insert customer name and customer description and create a new customer_id
   *  - User => insert a new user with the customer_id and ROLE=MANAGER
   *
   * Send activation link to the email with the randomly generated password
   */
  async function postCreateSingleCustomer(req, res) {
    const register = RegisterUserHelper(req, res, mongoose, User, Customer);
    await register(ROLE.MANAGER);
  }

  /**
   * MANAGER create a new staff
   * req.body: {email, first_name, last_name}
   *
   * Tables:
   *  - User => insert a new user with the customer_id and ROLE=STAFF
   *
   * Send activation link to the email with the randomly generated password
   */
  async function postCreateSingleStaff(req, res) {
    const register = RegisterUserHelper(req, res, mongoose, User, Customer);
    await register(ROLE.STAFF);
  }

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
