const validate = require("../helper/validateHelper");
//Validate the request body
module.exports = async function (req, res, next) {
  try {
    await validate(req.body);
    next();
  } catch (err) {
    res.status(400).send(err.details);
  }
};
