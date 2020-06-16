const express = require("express");
const router = express.Router();

/**
 * Method:[POST]
 * Endpoint: /auth/login
 */
router.route("/login").post();

/**
 * Method: [POST]
 * Endpoint: /auth/register
 */
router.route("/register").post();

/**
 * Method: [POST]
 *
 */
router.route("/forget").post();

/**
 * Method: [POST]
 */
router.route("/reset/:userId/:token").post();

/**
 * Method: [POST]
 * Endpoint: /auth/active/:userId/:token
 */
router.route("/active/:userId/:token").post();

module.exports = router;
