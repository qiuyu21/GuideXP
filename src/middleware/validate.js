const Joi = require('@hapi/joi');
const auth = require("../helper/validate/auth");
const exhibit = require("../helper/validate/exhibit");
const user = require("../helper/validate/user");
const { status_codes, error_codes } = require("../helper/responseHelper");
//Validate the request body
/**
 * route      :: String : ["auth", "exhibit", "user"]
 * valid_keys :: Array  : Keys that can be found in the request body
 * must       :: Array  : Keys must be presented in the request body   
 * optional   :: Array  : Keys' presence are optinal in the request body
 */
module.exports = function (route, valid_keys, must = null, optional = null) {
  return async function (req, res, next) {
    //If must is null, all valid keys must be presented. 
    if (!must) must = valid_keys;
    const msg = {};
    const body_keys = Object.keys(req.body);

    //Check if all json keys are valid keys
    const is_valid = body_keys.every(v => valid_keys.includes(v));
    if (!is_valid) {
      msg.code = error_codes.ERROR_INPUT_PARAMETER;
      msg.message = `Valid JSON keys are ${valid_keys}, but received ${body_keys}`;
      return res.status(status_codes.BAD_REQUEST).send(msg);
    }

    //Check if required keys are all presented
    const clonekeys = [...body_keys];
    for (const key of must) {
      if (!body_keys.includes(key)) {
        msg.code = error_codes.ERROR_INPUT_PARAMETER;
        msg.message = `Following keys are required: ${must}, but only received ${body_keys}`;
        return res.status(status_codes.BAD_REQUEST).send(msg);
      }
      else {
        //remove the key from clonekeys
        const index = clonekeys.indexOf(key);
        clonekeys.splice(index, 1);
      }
    }

    //If there is no optional keys, and received the same keys more than once. 
    if (!optional && !clonekeys.length) {
      msg.code = error_codes.ERROR_INPUT_PARAMETER;
      msg.message = `Received the same keys more than once. Received: ${body_keys}`;
    }


    const definition = {};

    body_keys.forEach((key) => {
      //Validate all required keys and optional keys with value
      if (must.includes(key) || (optional.includes(key) && req.data[key])) {
        switch (route) {
          case "auth": definition[key] = auth[key]; break;
          case "exhibit": definition[key] = exhibit[key]; break;
          case "user": definition[key] = user[key]; break;
        }
      }
    });

    //Validate each input format
    try {
      const schema = Joi.object(definition).unknown(true);
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (err) {
      msg.code = error_codes.ERROR_INPUT_FORMAT;
      msg.message = err.details;
      return res.status(status_codes.BAD_REQUEST).send(msg);
    }
  };
};
