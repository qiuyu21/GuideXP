const express = require("express");
const router = express.Router();

/**
 * Method:[GET]
 * Endpoint: /exhibit/
 * Description: Get all the exhibits
 */
router.route("/").post();

/**
 * Method:[GET]
 * Endpoint: /exhibit/
 * Description: Get an exhibit
 */
router.route("/:exhibitId").post();

module.exports = router;
