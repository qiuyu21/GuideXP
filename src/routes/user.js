const express = require("express");
const router = express.Router();
const db = require("../db/db");
const { User, Customer, Exhibit, Exhibition, Access } = db.models;
const { mongoose } = db;
//
const asyncMiddleware = require("../middleware/async");
const authenticationMiddleware = require("../middleware/token");
const authorizationMiddleware = require("../middleware/auth");
const validateMiddleware = require("../middleware/validate");
//
const UserController = require("../controllers/userController");
const {
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
} = UserController(mongoose, User, Customer, Exhibit, Exhibition, Access);

//Every route here is not open to the public. thus the following middleware is used.
router.use(authenticationMiddleware);

//With that being said, every route is accessible by users of some roles, thus using authoizationMiddleware.
//checkout ../middleware/auth.js to find the format of permission parameter for authorizationMiddleware(permission) method.

/**
 * Permission: GUIDEXP
 */
router.get(
  "/customer",
  authorizationMiddleware(0b001),
  asyncMiddleware(getAllCustomer)
);

/**
 * Permission: GUIDEXP
 */
router.get(
  "/manager",
  authorizationMiddleware(0b001),
  asyncMiddleware(getAllManager)
);

/**
 * Permission: GUIDEXP, MANAGER
 */
router.get(
  "/staff",
  authorizationMiddleware(0b011),
  asyncMiddleware(getAllStaff)
);

/**
 * Permission: GUIDEXP
 */
router.get(
  "/customer/:userId",
  authorizationMiddleware(0b001),
  asyncMiddleware(getSingleCustomer)
);

/**
 * Permission: GUIDEXP
 */
router.get(
  "/manager/:customerId/:userId",
  authorizationMiddleware(0b001),
  asyncMiddleware(getSingleManager)
);

/**
 * Permission: GUIDEXP MANAGER
 */
router.get(
  "/staff/:customerId/:userId",
  authorizationMiddleware(0b011),
  asyncMiddleware(getSingleStaff)
);

/**
 * Permission: GUIDEXP
 * Request Body Data: {name, description, days, first_name(manager), last_name, email}
 */
router.post(
  "/customer",
  [
    authorizationMiddleware(0b001),
    validateMiddleware(["name", "description", "first_name", "last_name", "email", "days"]),
  ],
  asyncMiddleware(postCreateSingleCustomer)
);

/**
 * Permission: MANAGER
 * Request Body Data: {first_name, last_name, email}
 */
router.post(
  "/staff",
  authorizationMiddleware(0b010),
  asyncMiddleware(postCreateSingleStaff)
);

/**
 * Permission MANAGER
 *
 * Function: Assign Translation to a STAFF user
 *
 * Request Body Data: {}
 */
router.post(
  "/permission/:userId",
  authorizationMiddleware(0b010),
  asyncMiddleware(postGiveWritePermission)
);

/**
 * Permission GUIDEXP
 *
 * Function: Change MANAGER email, first name, last name
 */
router.post(
  "/change/manager/:userId",
  authorizationMiddleware(0b001),
  asyncMiddleware(postChangeManager)
);

/**
 * Permission MANAGER
 *
 * Delete a STAFF user
 */
router.post(
  "/delete/staff/:userId",
  authorizationMiddleware(0b010),
  asyncMiddleware(postDeleteStaff)
);

/**
 * Function: Create user GUIDEXP
 *
 * This endpoint is not exposed to any type of normal users (GUIDEXP, MANAGER, STAFF)
 *
 * Request Body Data: {first_name, last_name, email, password}
 */
router.post("/guidexp", asyncMiddleware(postCreateSingleGuidexp));

module.exports = router;
