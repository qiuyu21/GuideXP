const express = require("express");
const router = express.Router();

/**
 * Method:[GET]
 * Endpoint: /user
 * Description:
 */
router.route("/").post();

/**
 * Method:[POST]
 * Endpoint: /user/register
 * Description:
 */
router.route("/register").post();

/**
 *
 */
router.route("/password").post();

module.exports = router;
