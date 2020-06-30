const ROLE = require("../helper/roleHelper");
const RegisterUserHelper = require("../helper/registerHelper");
const httpHelper = require("../helper/httpHelper");
const { status_codes, error_codes } = require("../helper/responseHelper");

function UserController(mongoose, User, Customer, Exhibit, Exhibition, Access) {
  /**
   * User: GUIDEXP
   * - Get all Customers
   * - Support Query String & Pagination
   *
   * Query:
   * col=[name, email]
   * order=[ascend, descend]
   * page=number
   *
   * Return:
   * Object{
   *   total,
   *   page,
   *   Array[Object{
   *     Customer(Customer),
   *     Name(Customer),
   *     Active(Customer),
   *     Subscribed(Customer),
   *     Free_Trial(Customer),
   *     Free_Trial_End(Customer),
   *     _id(User where Role === MANAGER),
   *     Email(User where Role === MANAGER),
   *  }]
   * }
   *
   */
  async function getAllCustomer(req, res) {
    // Query String validation
    const { query } = req;
    if (!query.page) query.page = 1;
    if (query.order) {
      if (
        ["ascend", "descend"].includes(query.order) &&
        ["name", "email"].includes(query.col)
      )
        query.order = query.order === "ascend" ? 1 : -1;
      else return res.status(httpHelper.BAD_REQUEST).send();
    }

    const nameSort = [];
    if (query.order) nameSort.push({ $sort: { Name: query.order } });

    const [{ meta, customers }] = await Customer.aggregate([
      {
        $facet: {
          meta: [{ $count: "total" }, { $addFields: { page: query.page } }],
          customers: [
            ...nameSort,
            { $limit: 20 },
            { $skip: (query.page - 1) * 20 },
            {
              $project: {
                _id: 0,
                Customer: "$_id",
                Name: 1,
                Active: 1,
                Description: 1,
                Subscribed: 1,
                Subscription_Start: 1,
                Subscription_End: 1,
                Free_Trial: 1,
                Free_Trial_End: 1,
              },
            },
          ],
        },
      },
    ]);

    let promisegroup = [];

    for (const customer of customers) {
      promisegroup.push(
        User.findOne(
          { Customer: customer.Customer, Role: ROLE.MANAGER },
          "_id Email Customer",
          { lean: true }
        )
      );
    }

    Promise.all(promisegroup).then((values) => {
      const results = customers.map((value, index) =>
        Object.assign({}, value, values[index])
      );
      return res.status(httpHelper.OK).send({ ...meta[0], results });
    });
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
  async function getAllManager(req, res) { }

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
  async function getAllStaff(req, res) { }

  /**
   * User: GUIDEXP
   * Return:
   * Obeject({
   *    Exhibition,
   *    Exhibit,
   *    Manager::Object{
   *       _id,
   *       Emial,
   *       First_Name,
   *       Last_Name
   *    },
   *    Customer::Object{
   *       _id,
   *       Name, 
   *       Description,
   *       Active,
   *       Subscribed,
   *       Free_Trial,
   *       Free_Trial_End,
   *    }
   * })
   *
   */
  async function getSingleCustomer(req, res) {

    const customer = req.params.userId;

    //Check the id
    const isValid = mongoose.Types.ObjectId.isValid(customer);
    if (!isValid) {
      const msg = {};
      msg.code = error_codes.ERROR_ID_STRING;
      msg.message = `${customer} is not a valid id`;
      return res.status(status_codes.BAD_REQUEST).send(msg);
    }

    const p1 = User.findOne({
      Customer: customer,
      Role: ROLE.MANAGER,
    })
      .select("_id First_Name Last_Name Email")
      .populate("Customer")
      .lean();

    const p2 = Exhibition.countDocuments({ Customer: customer });

    const p3 = Exhibit.countDocuments({ Customer: customer });

    Promise.all([p1, p2, p3]).then((values) => {
      const msg = {};
      if (!values[0]) {
        msg.code = error_codes.ERROR_USER_NOT_FOUND;
        msg.message = `No User with id ${customer} found in the database`;
        return res.status(status_codes.NOT_FOUND).send(msg);
      }
      msg.Exhibition = values[1];
      msg.Exhibit = values[2];
      msg.Manager = values[0];
      msg.Customer = values[0].Customer;
      delete msg.Manager.Customer;
      return res.status(status_codes.OK).send(msg);
    }
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
      Customer: customer_id,
      _id: user_id,
    })
      .populate("Customer")
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
    const customer = req.params.customer;

    //MANAGER make a request
    if (req.user.Role === ROLE.MANAGER && customer !== req.user.Customer)
      return res.status(httpHelper.FORBIDDEN).send();

    const p1 = User.findOne({
      Customer: customer,
      _id: user_id,
    });
    const p2 = Access.find({
      Customer: customer,
    }).populate({ path: "Permission", match: { User_Id: user_id } });

    Promise.all(p1, p2).then((values) => {
      return res.status(httpHelper.OK).send(values);
    });
  }

  /**
   * GUIDEXP create a new customer
   * req.body: {name, description, email, first_name, last_name, day}
   *
   * Tables:
   *  - Customer => insert customer name and customer description and create a new customer_id
   *  - User => insert a new user with the customer_id and ROLE=MANAGER
   *
   * Send activation link to the email with the randomly generated password
   */
  async function postCreateSingleCustomer(req, res) {
    const { register } = RegisterUserHelper(req, res, mongoose, User, Customer);
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
    const { register } = RegisterUserHelper(req, res, mongoose, User, Customer);
    await register(ROLE.STAFF);
  }

  async function postGiveWritePermission(req, res) { }

  async function postChangeManager(req, res) { }

  async function postDeleteStaff(req, res) { }

  async function postCreateSingleGuidexp(req, res) {
    const { guidexpRegister } = RegisterUserHelper(req, res, mongoose, User, Customer);
    await guidexpRegister();
  }

  return {
    getAllCustomer,
    getAllManager,
    getAllStaff,
    getSingleCustomer,
    getSingleManager,
    getSingleStaff,
    postCreateSingleCustomer,
    postCreateSingleStaff,
    postGiveWritePermission,
    postChangeManager,
    postDeleteStaff,
    postCreateSingleGuidexp,
  };
}

module.exports = UserController;
