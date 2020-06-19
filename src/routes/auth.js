const express = require("express");
const router = express.Router();
const db = require("../db/db");
const { User, Customer } = db.models;
const AuthController = require("../controllers/authController");
//
const authController = AuthController(User, Customer);

/**
 * LOGIN ROUTE [POST]
 * /auth/login
 */
router.post("/login", authController.postLogin);

/**
 * REGISTER NEW CUSTOMER ROUTE [POST]
 * /auth/register
 * - GiudeXP register a new customer
 * - Also create a manager type
 */
router.post("/register", authController.postCreateSingleCustomer);

/**
 * FORGET PASSWORD ROUTE [GET]
 * /auth/forget
 * - check if a emails exist
 * - send a reset password link to the email
 */
router.get("/forget", authController.getForget);

/**
 * Method: [GET,POST]
 * Endpoint: /auth/reset/:userId/:token
 * -
 */
router.get("/reset/:userId/:token", authController.getReset);
router.post("/reset/:userId/:token", authController.postReset);

/**
 * Method: [GET]
 * Endpoint: /auth/active/:userId/:token
 * - activate user account
 *
 */
router.get("/active/:userId/:token", authController.getActivateAccount);

module.exports = router;
