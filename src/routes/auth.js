const express = require("express");
const router = express.Router();
const db = require("../db/db");
const { User, Customer } = db.models;
//
const asyncMiddleware = require("../middleware/async");
//
const AuthController = require("../controllers/authController");
const {
  postLogin,
  postCreateSingleCustomer,
  getForget,
  getReset,
  postReset,
  getActivateAccount,
} = AuthController(User, Customer);

//middleware
const validate = require("../middleware/validate");

/**
 * LOGIN ROUTE [POST]
 * /auth/login
 */
router.post("/login", asyncMiddleware(postLogin));

/**
 * REGISTER NEW CUSTOMER ROUTE [POST]
 * /auth/register
 * - GiudeXP register a new customer
 * - Also create a manager type
 */
router.post("/register", asyncMiddleware(postCreateSingleCustomer));

/**
 * FORGET PASSWORD ROUTE [GET]
 * /auth/forget
 * - check if a emails exist
 * - send a reset password link to the email
 */
router.get("/forget", asyncMiddleware(getForget));

/**
 * Method: [GET,POST]
 * Endpoint: /auth/reset/:userId/:token
 * -
 */
router.get("/reset/:userId/:token", asyncMiddleware(getReset));
router.post("/reset/:userId/:token", asyncMiddleware(postReset));

/**
 * Method: [GET]
 * Endpoint: /auth/active/:userId/:token
 * - activate user account
 *
 */
router.get("/active/:userId/:token", asyncMiddleware(getActivateAccount));

module.exports = router;
