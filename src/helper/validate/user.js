const Joi = require("@hapi/joi");


const name = Joi.string().required(); //customer name
const description = Joi.string().required(); //customer description
const first_name = Joi.string().regex(/^[a-zA-Z ]*$/).required(); //GUIDEXP, MANAGER, STAFF's first name
const last_name = Joi.string().regex(/^[a-zA-Z ]*$/).required(); //GUIDEXP, MANAGER, STAFF's last name
const email = Joi.string().email().required(); //GUIDEXP, MANAGER, STAFF's email
const days = Joi.number().integer().min(0).required();   //Customer trial days
const userId = Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(); //MongoDB Id

module.exports = {
    name, description, first_name, last_name, email, days, userId
}