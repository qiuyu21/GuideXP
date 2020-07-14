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
const exhibitionController = require("../controllers/exhibitionController");
const { route } = require("./exhibit");
//
const {

} = exhibitionController(mongoose, User, Customer, Exhibit, Exhibition, Access, History, Translation);

router.use(authenticationMiddleware);


/**
 * Permission: GUIDEXP MANAGER STAFF
 * Get all exhibitions
 */
router.get("/", authorizationMiddleware(0b111), asyncMiddleware());

/**
 * Permission: MANAGER
 * MANAGER creates a single exhibition
 */
route.post("/", authorizationMiddleware(0b010), asyncMiddleware());

/**
 * Permission: GUIDEXP MANAGER STAFF
 * Get a single exhibition
 */
router.get("/:exhibitionId", authorizationMiddleware(0b111), asyncMiddleware());

/**
 * Permission: GUIDEXP MANAGER STAFF
 * Get a single exhibition of a language
 */
router.get("/:exhibitionId/:lang_code", authorizationMiddleware(0b111), asyncMiddleware());

/**
 * Permission: MANAGER STAFF
 * Update an exhibiton of a language
 */
router.put("/:exhibitionId/:lang_code", authorizationMiddleware(0b011), asyncMiddleware());

/**
 * Permission: MANAGER
 * Update an exhibition's name and description
 */
router.put("/update/:exhibitionId", authorizationMiddleware(0b010), asyncMiddleware());


/**
 * Permission: MANAGER
 * Update an exhibition's status and identifier
 */
router.put("/update/option/:exhibitionId", authorizationMiddleware(0b010), asyncMiddleware());


/**
 * Permission: MANAGAER
 * Update an exhibition's exhibits (adding, removing)
 */
router.put("/update/exhibit/:exhibitionId", authorizationMiddleware(0b010), asyncMiddleware());


/**
 * Permission: MANAGER
 * Update an exhibtion's support languages
 */
router.put("/update/language/:exhibitionId", authorizationMiddleware(0b010), asyncMiddleware());


/**
 * Permission: MANAGER
 * Delete an exhibition
 */
router.delete("/delete/:exhibitionId", authorizationMiddleware(0b010), asyncMiddleware());

module.exports = router;
