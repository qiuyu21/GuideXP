//For every write endpoint for MANAGER or STAFF

//Check the status of Customer
//If the Customer is on free trial or is subscribed
//pass the request to the "endpoint"
//If the Customer is neither on free trial nor subscribed
//sends back a forbidden request to the user

//Check the status of User
//If the user status is not active
//sends back a forbidden request to the user

const db = require("../db/db");
const { User } = db.models;
const HttpHelper = require("../helper/httpHelper");

module.exports = function (req, res, next) {
  const user = User.findOne({
    Customer: req.user.Customer,
    _id: req.user._id,
  }).populate("Customer");
  if (!user.Active)
    return res.status(HttpHelper.FORBIDDEN).send("Your account is not active");

  const { Customer } = user;
  if (!Customer.Active)
    return res.status(HttpHelper.FORBIDDEN).send("Customer is not active");

  if (
    !Customer.Subscribed &&
    Customer.Free_Trial &&
    Customer.Free_Trial_End < Date.now()
  )
    return res.status(HttpHelper.FORBIDDEN).send("Free trial has ended"); //Don't update Free_Trial to false.

  if (Customer.Subscribed && Customer.Subscription_End < Date.now())
    return res
      .status(HttpHelper.FORBIDDEN)
      .send("Please renew your subscription to continue");

  if (!Customer.Subscribed && !Customer.Free_Trial)
    return res
      .status(HttpHelper.FORBIDDEN)
      .send("You need to subscribe to our service to use it");

  next();
};
