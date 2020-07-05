const express = require("express");
const router = express.Router();
const db = require("../db/db");
const { User, Customer } = db.models;
//
const asyncMiddleware = require("../middleware/async");
const validateMiddleware = require("../middleware/validate");
//
const AuthController = require("../controllers/authController");
const {
  postLogin,
  postForget,
  getReset,
  postReset,
  postActivate,
} = AuthController(User, Customer);

/**
 * Permission: GUIDEXP MANAGER STAFF
 * Request Body Data: {email, password}
 * Response Status Code: 200, 400, 403
 */
router.post("/login", asyncMiddleware(postLogin));

/**
 * Permission: GUIDEXP MANAGER STAFF
 * Request Body Data: {email}
 * Response Status Code: 204, 400, 403
 */
router.post("/forget", asyncMiddleware(postForget));

/**
 * Permission: GUIDEXP MANAGER STAFF
 *
 */
router.get("/reset/:userId", asyncMiddleware(getReset));

/**
 * Permission: GUIDEXP MANAGER STAFF
 * Request Body Data: {token, password}
 */
router.post("/reset/:userId", asyncMiddleware(postReset));

/**
 * Permission: MANAGER STAFF
 * Request Body Data: {token}
 */
router.post("/activate/:userId", asyncMiddleware(postActivate));

module.exports = router;
