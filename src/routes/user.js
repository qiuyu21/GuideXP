const express = require("express");
const router = express.Router();
const db = require("../db/db");
const { User, Customer } = db.models;
const { mongoose } = db;
//
const asyncMiddleware = require("../middleware/async");
const tokenMiddleware = require("../middleware/token");
const authorizationMiddleware = require("../middleware/auth");
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
  postActivateUser,
  postDeactivateUser,
} = UserController(mongoose, User, Customer);

//Every route here is not open to the public. thus the following middleware is used.
router.use(tokenMiddleware);
//With that being said, every route is accessible by only users from one or some roles, thus using authoizationMiddleware.
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
  authorizationMiddleware(0b010),
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
  "/manager/:userId",
  authorizationMiddleware(0b001),
  asyncMiddleware(getSingleManager)
);

/**
 * Permission: GUIDEXP MANAGER
 */
router.get(
  "/staff/:userId",
  authorizationMiddleware(0b011),
  asyncMiddleware(getSingleStaff)
);

/**
 * Permission: GUIDEXP
 *
 */
router.post(
  "/customer",
  authorizationMiddleware(0b001),
  asyncMiddleware(postCreateSingleCustomer)
);

/**
 * Permission: MANAGER
 */
router.post(
  "/staff",
  authorizationMiddleware(0b010),
  asyncMiddleware(postCreateSingleStaff)
);

/**
 * Permission: MANAGER USER
 */
router.put(
  "/activate/:userId",
  authorizationMiddleware(0b110),
  asyncMiddleware(postActivateUser)
);

/**
 * Permission GUIDEXP MANAGER
 */
router.put(
  "/deactivate/:userId",
  authorizationMiddleware(0b011),
  asyncMiddleware(postDeactivateUser)
);

module.exports = router;
