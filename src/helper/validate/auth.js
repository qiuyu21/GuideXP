const Joi = require("@hapi/joi");

const email = Joi.string().email();
const password = Joi.string().min(8).max(30);
const token = Joi.string().required();

module.exports = {
    email, password, token
}

