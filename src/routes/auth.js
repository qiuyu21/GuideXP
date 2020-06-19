const express = require("express");
const router = express.Router();

/**
 * LOGIN ROUTE [POST]
 * /auth/login
 */
router.route("/login").post();

/**
 * REGISTER NEW CUSTOMER ROUTE [POST]
 * /auth/register
 * -
 */
router.route("/register").post();

/**
 * FORGET PASSWORD ROUTE [GET]
 * /auth/forget
 * - check if a emails exist
 * - send a reset password link to the email
 */
router.route("/forget").get();

/**
 * Method: [POST]
 * Endpoint: /auth/reset/:userId/:token
 * -
 */
router.route("/reset/:userId/:token").post();

/**
 * Method: [POST]
 * Endpoint: /auth/active/:userId/:token
 * - activate user account
 *
 */
router.route("/active/:userId/:token").post();

module.exports = router;
