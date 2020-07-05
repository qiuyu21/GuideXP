//return 500 errors from the routes
module.exports = function (err, req, res, next) {
  res.status(500).send("Internal error");
  return;
};
