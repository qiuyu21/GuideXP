const tokenHelper = require("../helper/tokenHelper");
const HttpHelper = require("../helper/httpHelper");

module.exports = async function (req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(HttpHelper.UNAUTHORIZED).send("Unauthorized");
  try {
    const token = authHeader.split(" ")[1];
    const decoded = await tokenHelper.verify(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(HttpHelper.UNAUTHORIZED).send("Unauthorized");
  }
};
