const express = require("express");
const router = express.Router();

/**
 * Permission: GUIDEXP MANAGER STAFF
 */
router.route("/exhibit").get();

/**
 * Permission: MANAGER
 */
router.route("/exhibit").post();

/**
 * Permission: GUIDEXP MANAGER STAFF
 */
router.route("/exhibit/:exhibitId").get();

/**
 * Permission: MANAGER
 */
router.route("/exhibit/:exhibitId").put();

/**
 * Permission: MANAGER STAFF(with permission)
 */
router.route("/exhibit/:exhibitId/:language_code").put();

/**
 * Permission: GUIDEXP MANAGER STAFF
 */
router.route("/exhibition").get();

/**
 * Permission: MANAGER
 */
router.route("/exhibition").post();

/**
 * Permission: GUIDEXP MANAGER STAFF
 */
router.route("/exhibition/:exhibitionId").get();

/**
 * Permission: MANAGER
 */
router.route("/exhibition/:exhibitionId").put();

/**
 * Permission: MANAGER
 */
router.route("/exhibition/:exhibitionId/:language_code").put();

module.exports = router;
