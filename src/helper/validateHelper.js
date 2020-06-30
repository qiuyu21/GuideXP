//This module provides functions to validate data sent from users
const Joi = require("@hapi/joi");

//rules definition
const first_name = Joi.string().alphanum().max(32).required();
const last_name = Joi.string().alphanum().max(32).required();
const password = Joi.string().min(3).max(30);
const email = Joi.string().email();
const days = Joi.number().integer().min(0);
const name = Joi.string().required();
const description = Joi.string().required();

function createDef(requestdata) {
  const def = {};
  for (let key of Object.keys(requestdata)) {
    switch (key) {
      case "first_name":
        def.first_name = first_name;
        break;
      case "last_name":
        def.last_name = last_name;
        break;
      case "password":
        def.password = password;
        break;
      case "email":
        def.email = email;
        break;
      case "days":
        def.days = days;
        break;
      case "name":
        def.name = name;
        break;
      case "description":
        def.description = description;
        break;
    }
  }
  return def;
}

module.exports = function (requestdata) {
  const schema = Joi.object(createDef(requestdata)).unknown(true);
  return schema.validateAsync(requestdata, {
    abortEarly: false,
  });
};
