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
 * Permission: MANAGER
 * Create a single exhibit
 */
router.post(
    "/",
    authorizationMiddleware(0b010),
    asyncMiddleware(postCreateSingleExhibit)
)


/**
 * Permission: GUIDEXP MANAGER STAFF
 * Get all exhibits
 */
router.get(
    "/",
    authorizationMiddleware(0b111),
    asyncMiddleware(getAllExhibit)
);

/**
 * Permission: GUIDEXP MANAGER STAFF
 * Get a single exhibit
 */
router.get(
    "/:exhibitId",
    authorizationMiddleware(0b111),
    asyncMiddleware(getSingleExhibit)
)

/**
 * Permission: MANAGER
 * Update a single exhibit
 */
router.route("/:exhibitId").put();

/**
 * Permission: MANAGER STAFF(with permission)
 * Update a single exhibit of a language 
 */
router.route("/exhibit/:exhibitId/:language_code").put();

/**
 * Permission: GUIDEXP MANAGER STAFF
 * Get all exhibitions
 */
router.route("/all/exhibition").get();

/**
 * Permission: MANAGER
 * Create a single exhibition
 */
router.route("/exhibition").post();

/**
 * Permission: GUIDEXP MANAGER STAFF
 * Get a single exhibition
 */
router.route("/exhibition/:exhibitionId").get();

/**
 * Permission: MANAGER
 * Update a single exhibiton
 */
router.route("/exhibition/:exhibitionId").put();

/**
 * Permission: MANAGER
 * Update a single exhibition of a language
 */
router.route("/exhibition/:exhibitionId/:language_code").put();

module.exports = router;
