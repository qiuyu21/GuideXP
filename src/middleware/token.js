const tokenHelper = require("../helper/tokenHelper");
const { status_codes, error_codes } = require("../helper/responseHelper");
module.exports = async function (req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    const msg = {};
    msg.code = error_codes.ERROR_AUTHENTICATION;
    msg.message = "You have no token, log in first to get a token";
    return res.status(status_codes.UNAUTHORIZED).send(msg);
  }
  try {
    const token = authHeader.split(" ")[1];
    const decoded = await tokenHelper.verify(token);
    req.user = decoded;
    next();
  } catch (err) {
    const msg = {};
    msg.code = error_codes.ERROR_TOKEN;
    msg.message = "Your token is invalid, re-login to get a new token";
    return res.status(status_codes.FORBIDDEN).send(msg);
  }
};
