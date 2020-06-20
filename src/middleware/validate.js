const validate = require("../helper/validateHelper");
//Validate the body inside
module.exports = async function (req, res, next) {
  try {
    await validate(req.body);
    next();
  } catch (err) {
    res.status(400).send(err.details);
  }
};
