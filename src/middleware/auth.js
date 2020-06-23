const HttpHelper = require("../helper/httpHelper");

//permission has the following format
//STAFF MANAGER GUIDEXP
// 0      0       0
module.exports = function (permission) {
  return function (req, res, next) {
    const bit = 1 << (req.user.Role - 1); // to -1 becase user.Role starts with 1
    if ((bit & permission) !== 0) next();
    else return res.status(HttpHelper.FORBIDDEN).send("No Permission");
  };
};
