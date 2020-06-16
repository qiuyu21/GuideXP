const express = require("express");
const router = express.Router();

/**
 * Method:[GET]
 * Endpoint: /user
 */
router.route("/").post();

/**
 * Method:[POST]
 * Endpoint: /user/register
 */
router.route("/register").post();

module.exports = router;
