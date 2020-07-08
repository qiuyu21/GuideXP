const express = require("express");
const router = express.Router();
const db = require("../db/db");
const { User, Customer, Exhibit, Exhibition, Access, History, Translation } = db.models;
const { mongoose } = db;

//Middlewares
const asyncMiddleware = require("../middleware/async");
const authenticationMiddleware = require("../middleware/token");
const authorizationMiddleware = require("../middleware/auth");
const validateMiddleware = require("../middleware/validate");

//Controllers
const exhibitController = require("../controllers/exhibitController");
//
const {
    getAllExhibit,
    getSingleExhibit,
    postCreateSingleExhibit,

} = exhibitController(mongoose, User, Customer, Exhibit, Exhibition, Access, History, Translation);

router.use(authenticationMiddleware);

/**
 * Permission: GUIDEXP MANAGER STAFF
 */
router.get(
    "/exhibit",
    authorizationMiddleware(0b111),
    asyncMiddleware(getAllExhibit)
);

/**
 * Permission: GUIDEXP MANAGER STAFF
 */
router.get(
    "/exhibit/:exhibitId",
    authorizationMiddleware(0b111),
    asyncMiddleware(getSingleExhibit)
)

/**
 * Permission: MANAGER
 */
router.post(
    "/exhibit",
    authorizationMiddleware(0b010),
    asyncMiddleware(postCreateSingleExhibit)
)

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
