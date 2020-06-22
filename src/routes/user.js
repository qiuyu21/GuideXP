const express = require("express");
const router = express.Router();
const db = require("../db/db");
const { User, Customer } = db.models;
//
const asyncMiddleware = require("../middleware/async");
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
} = UserController(User, Customer);

/**
 * Permission: GUIDEXP
 */
router.get("/customer", asyncMiddleware(getAllCustomer));

/**
 * Permission: GUIDEXP
 */
router.get("/manager", asyncMiddleware(getAllManager));

/**
 * Permission: GUIDEXP, MANAGER
 */
router.get("/staff", asyncMiddleware(getAllStaff));

/**
 * Permission: GUIDEXP
 */
router.get("/customer/:userId", asyncMiddleware(getSingleCustomer));

/**
 * Permission: GUIDEXP
 */
router.get("/manager/:userId", asyncMiddleware(getSingleManager));

/**
 * Permission: GUIDEXP MANAGER
 */
router.get("/staff/:userId", asyncMiddleware(getSingleStaff));

/**
 * Permission: GUIDEXP
 */
router.post("/customer", asyncMiddleware(postCreateSingleCustomer));

/**
 * Permission: MANAGER
 */
router.post("/staff", asyncMiddleware(postCreateSingleStaff));

/**
 * Permission: MANAGER USER
 */
router.put("/activate/:userId", asyncMiddleware(postActivateUser));

/**
 * Permission GUIDEXP MANAGER
 */
router.put("/deactivate/:userId", asyncMiddleware(postDeactivateUser));

module.exports = router;
