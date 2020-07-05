const Joi = require("@hapi/joi");


const name = Joi.string().required(); //Exhibit, Exhibition's english name
const exhibition = Joi.string().regex(/^[0-9a-fA-F]{24}$/).required();
const languages = Joi.array().items(Joi.string()).has(Joi.string().valid('a'));