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
    getSingleExhibitofLanguage,
} = exhibitController(mongoose, User, Customer, Exhibit, Exhibition, Access, History, Translation);

router.use(authenticationMiddleware);

/**
 * Permission: GUIDEXP MANAGER STAFF
 * Get all exhibits
 */
router.get("/", authorizationMiddleware(0b111), asyncMiddleware(getAllExhibit));

/**
 * Permission: MANAGER
 * Create a single exhibit
 */
router.post("/", authorizationMiddleware(0b010), asyncMiddleware(postCreateSingleExhibit));


/**
 * Permission: GUIDEXP MANAGER STAFF
 * Get a single exhibit
 */
router.get("/:exhibit_id", authorizationMiddleware(0b111), asyncMiddleware(getSingleExhibit));

/**
 * Permission: GUIDEXP MANAGER STAFF
 * Get a single exhibit of a language
 */
router.get("/:exhibit_id/:lang_code", authorizationMiddleware(0b111), asyncMiddleware(getSingleExhibitofLanguage));

/**
 * Permission: MANAGER STAFF
 * Update an exhibit of a language
 */
router.put("/:exhibit_id/:lang_code", authorizationMiddleware(0b011), asyncMiddleware());

/**
 * Permission: MANAGER
 * Update an exhibit's English name and description
 */
router.put("/update/:exhibit_id", authorizationMiddleware(0b010), asyncMiddleware());

/**
 * Permission: MANAGER
 * Update an exhibit's status and identifier
 */
router.put("/update/option/:exhibit_id", authorizationMiddleware(0b010), asyncMiddleware());

/**
 * Permission: MANAGER
 * Update an exhibit's exhibition
 */
router.put("/update/exhibition/:exhibit_id", authorizationMiddleware(0b010), asyncMiddleware());

/**
 * Permission: MANAGER
 * Update an exhibit's support languages
 */
router.put("/update/language/:exhibit_id", authorizationMiddleware(0b010), asyncMiddleware());


/**
 * Permission: MANAGER
 * Delete an exhibit
 */
router.delete("/delete/:exhibitId", authorizationMiddleware(0b010), asyncMiddleware());


module.exports = router;
