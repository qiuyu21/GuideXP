const validate = require("../helper/validateHelper");
const httpHelper = require("../helper/httpHelper");
const { status_codes, error_codes } = require("../helper/responseHelper");
//Validate the request body

module.exports = function (validKeys) {
  return async function (req, res, next) {
    //Validate correct number of parameters and correct parameters
    const clonekeys = [...validKeys]; //*important dont mutate validKeys anytime.
    const keys = Object.keys(req.body);
    const invalidMsg = `Valid keys are ${validKeys}, but received ${keys}`;
    const msg = {};
    if (clonekeys.length !== keys.length) {

      return res
        .status(httpHelper.BAD_REQUEST)
        .send(invalidMsg);
    }

    for (key of keys) {
      if (!clonekeys.includes(key))
        return res
          .status(httpHelper.BAD_REQUEST)
          .send(invalidMsg);
      else {
        //remove the key from validkeys
        const index = clonekeys.indexOf(key);
        clonekeys.splice(index, 1);
      }
    }

    if (clonekeys.length !== 0)
      return res
        .status(httpHelper.BAD_REQUEST)
        .send(invalidMsg);

    //Validate each input format
    try {
      await validate(req.body);
      next();
    } catch (err) {
      return res.status(httpHelper.BAD_REQUEST).send(err.details);
    }
  };
};
