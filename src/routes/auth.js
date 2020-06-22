const express = require("express");
const router = express.Router();
const db = require("../db/db");
const { User, Customer } = db.models;
//
const asyncMiddleware = require("../middleware/async");
//
const AuthController = require("../controllers/authController");
const { postLogin, postForget, getReset, postReset } = AuthController(
  User,
  Customer
);

//middleware
const validate = require("../middleware/validate");

/**
 * Permission: All
 * Request Body Data: {email, password}
 * Response Status Code: 200, 400, 403
 */
router.post("/login", asyncMiddleware(postLogin));

/**
 * Permission: All
 * Request Body Data: {email}
 * Response Status Code: 204, 400, 403
 */
router.post("/forget", asyncMiddleware(postForget));

/**
 * Permission: All
 *
 */
router.get("/reset/:userId/:token", asyncMiddleware(getReset));

/**
 * Permission: All
 * Request Body Data: {password}
 */
router.post("/reset/:userId/:token", asyncMiddleware(postReset));

module.exports = router;
