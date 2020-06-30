const { status_codes, error_codes } = require("../helper/responseHelper");
//permission has the following format
//STAFF MANAGER GUIDEXP
// 0      0       0
module.exports = function (permission) {
  return function (req, res, next) {
    const bit = 1 << (req.user.Role - 1); // to -1 becase user.Role starts with 1
    if ((bit & permission) !== 0) next();
    else {
      const msg = {};
      msg.code = error_codes.ERROR_AUTHORIZATION;
      msg.message = "You have no permission for this endpoint";
      return res.status(status_codes.FORBIDDEN).send(msg);
    }
  };
};
