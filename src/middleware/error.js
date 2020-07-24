//return 500 errors from the routes
module.exports = function (err, req, res, next) {
  console.log("There is an error");
  res.status(500).send("Internal error");
  return;
};
