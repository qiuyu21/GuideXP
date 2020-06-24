const ROLE = require("../helper/roleHelper");
const RegisterUserHelper = require("../helper/registerHelper");

function UserController(mongoose, User, Customer) {
  /**
   * User: GUIDEXP
   * - Get all Customers
   * - Support Query String & Pagination
   *
   * Query:
   * sort=[name, email, exhibition, exhibit, date]-[asc, desc]
   * active=ture/false
   * page=number
   *
   * Return Array[
   *  Customer_Id,
   *  Name of Customer,
   *  Manager_Id,
   *  Email of Manager,
   *  #Exhibition,
   *  #Exhibits,
   *  Created date
   *  Status
   * ]
   *
   */
  async function getAllCustomer(req, res) {
    // const { query: queryString } = req.query;
    // if (!queryString.page) queryString.page = 0;
    // const dbquery = {};
    // if (queryString.sort) {
    //   const [key, value] = queryString.sort.split("-");
    //   dbquery[key] = value === "asc" ? 1 : -1;
    // }
    const query = await Customer.find(null, null, { lean: true });
    res.send(query);
  }

  /**
   * User: GUIDEXP
   *  - Get all MANAGER type users
   *
   * Query:
   * sort=[first_name, last_name, email, Name of Customer]-[asc, desc]
   *
   * Return Array[
   *   Customer_Id,
   *   Name of Customer,
   *   Manager_Id,
   *   First Name,
   *   Last Name,
   *   Email,
   *   Staff Number,
   *   Status
   * ]
   */
  async function getAllManager(req, res) {}

  /**
   * User: GUIDEXP, MANAGER
   * Get all STAFF type users based on a MANAGER id
   *
   * Query:
   * sort=[first_name, last_name, email]
   *
   * GUIDEXP:
   * Return Array[
   *  Customer_Id,
   *  Name of Customer,
   *  First Name
   *  Last Name,
   *  Email,
   *  Status
   * ]
   *
   * MANAGER:
   * Return Array[
   *   First Name,
   *   Last Name,
   *   Email,
   *   Status,
   * ]
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

  /**
   * User: MANAGER STAFF
   *
   */
  async function postActivateUser(req, res) {}

  async function postDeactivateUser(req, res) {}

  async function postPermission(req, res) {}

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
    postPermission,
  };
}

module.exports = UserController;
