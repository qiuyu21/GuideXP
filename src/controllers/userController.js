const ROLE = require("../helper/roleHelper");
const RegisterUserHelper = require("../helper/registerHelper");
const httpHelper = require("../helper/httpHelper");

function UserController(mongoose, User, Customer, Exhibit, Exhibition) {
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
   * Return:
   * Array[Object{
   *  _id(Customer),
   *  Name(Customer),
   *  Status(Customer)
   *  _id(User where Role === MANAGER),
   *  Email(User where Role === MANAGER),
   *  #Exhibition,
   *  #Exhibits,
   * }]
   *
   */
  async function getAllCustomer(req, res) {
    // Query String validation
    const { query: queryString } = req;

    const query = {};
    if (!queryString.page) query.page = 0;
    else query.page = queryString.page;

    if (queryString.sort) {
      const [key, value] = queryString.sort.split("-");

      if (
        ["name", "email", "exhibition", "exhibit", "date"].includes(key) &&
        ["asc", "desc"].includes(value)
      )
        query.sort = { key: value === "asc" ? 1 : -1 };
      else return res.status(httpHelper.BAD_REQUEST).send();
    }

    const customers = await Customer.find()
      .limit(20)
      .skip(query.page * 20)
      .lean();

    let promisegroup1 = [],
      promisesgroup2 = [],
      promisesgroup3 = [];

    for (const customer of customers) {
      promisegroup1.push(
        User.findOne(
          { Customer_Id: customer._id, Role: ROLE.MANAGER },
          "_id Email",
          { lean: true }
        )
      );
    }

    for (const customer of customers) {
      promisesgroup2.push(
        Exhibition.find({ Customer_Id: customer._id }).count(function (
          err,
          numOfDocs
        ) {})
      );
    }

    for (const customer of customers) {
      promisesgroup3.push(
        Exhibit.find({ Customer_Id: customer._id }).count(function (
          err,
          numOfDocs
        ) {})
      );
    }

    const p1 = Promise.all(promisegroup1).then((values) => {});

    const p2 = Promise.all(promisesgroup2).then((values) => {});

    const p3 = Promise.all(promisesgroup3).then((values) => {});

    Promise.all([p1, p2, p3]).then((values) => {});
  }

  /**
   * User: GUIDEXP
   *  - Get all MANAGER type users
   *
   * Query:
   * sort=[first_name, last_name, email, Name of Customer]-[asc, desc]
   *
   * Return:
   * Array[Object{
   *   _id(Customer),
   *   Name(Customer),
   *   _id(User where Role === MANAGER),
   *   First_Name(User),
   *   Last_Name(User),
   *   Email(User),
   *   Status (User)
   *   #Staff
   * }]
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
   * Return:
   * Array[Object{
   *  _id(Customer),
   *  Name(Customer),
   *  First_Name(User)
   *  Last_Name(User),
   *  Email(User),
   *  Status(User)
   * }]
   *
   * MANAGER:
   * Return:
   * Array[Object{
   *   First_Name(User),
   *   Last_Name(User),
   *   Email(User),
   *   Status(User)
   * }]
   */
  async function getAllStaff(req, res) {}

  /**
   * User: GUIDEXP
   * Return:
   * Obeject({
   *  _id(Customer),
   *  Name(Customer),
   *  Description(Customer),
   *  Customer_Status(Customer),
   *  Subscription_Start(Customer),
   *  Subscription_End(Customer),
   *  _id(User),
   *  Email(User),
   *  #Exhibits,
   *  #Exhibitions
   * })
   *
   * 1: FindOne from User table using customer_id and Role = 2
   * 2: Populate the customer from customer_id
   */
  async function getSingleCustomer(req, res) {
    const customer_id = req.params.userId;

    const p1 = User.findOne({
      Customer_Id: customer_id,
      Role: ROLE.MANAGER,
    })
      .populate("Customer_Id")
      .lean();

    const p2 = Exhibition.countDocuments({ Customer_Id: customer_id });

    const p3 = Exhibit.countDocuments({ Customer_Id: customer_id });

    Promise.all([p1, p2, p3]).then((values) =>
      res.status(httpHelper.OK).send(values)
    );
  }

  /**
   * User: GUIDEXP
   * Return:
   * Object({
   *  _id(Customer),
   *  Name(Customer),
   *  _id(User where Role == MANAGER),
   *  Email(User),
   *  First_Name(User),
   *  Last_Name(User)
   * })
   */
  async function getSingleManager(req, res) {
    const customer_id = req.params.customerId;
    const user_id = req.params.userId;
    const doc = await User.findOne({
      Customer_Id: customer_id,
      _id: user_id,
    })
      .populate("Customer_Id")
      .lean();

    return res.status(httpHelper.OK).send(doc);
  }

  /**
   * User: GUIDEXP, MANAGER
   * Return:
   * Object({
   *  First_Name(User),
   *  Last_Name(User),
   *  Email (User),
   *  Active (User),
   *  Array[
   *    {Model, Model_Id, Language_Code}
   *  ](Permission)
   * })
   *
   */
  async function getSingleStaff(req, res) {
    const user_id = req.params.userId;
    const customer_id = req.params.customerId;
    if (req.user.Role === ROLE.GUIDEXP) {
      //GUIDEXP making this request
      const p1 = User.findOne({
        Customer_Id: customer_id,
        _id: user_id,
      });
    } else {
      //MANAGER making this request
    }
  }

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
