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
const { status_codes, error_codes } = require("../helper/responseHelper");

module.exports = function (req, res, next) {
  const user = User.findOne({
    Customer: req.user.Customer,
    _id: req.user._id,
  }).populate("Customer");
  const msg = {};
  if (!user.Active) {
    msg.code = error_codes.ERROR_USER_NOT_ACTIVE;
    msg.message = "User is not active";
    return res.status(status_codes.FORBIDDEN).send(msg);
  }

  const { Customer } = user;
  if (!Customer.Active) {
    msg.code = error_codes.ERROR_USER_NOT_ACTIVE;
    msg.message = "Customer is not active";
    return res.status(status_codes.FORBIDDEN).send(msg);
  }

  if (
    !Customer.Subscribed &&
    Customer.Free_Trial &&
    Customer.Free_Trial_End < Date.now()
  ) {
    msg.code = error_codes.ERROR_FREE_TRIAL_EXPIRE;
    msg.message = `Free trial has ended at ${Customer.Free_Trial_End}`;
    return res.status(status_codes.FORBIDDEN).send(msg); //Don't update Free_Trial to false.
  }
  if (Customer.Subscribed && Customer.Subscription_End < Date.now()) {

    return res
      .status(status_codes.FORBIDDEN)
      .send("Please renew your subscription to continue");
  }

  if (!Customer.Subscribed && !Customer.Free_Trial) {

    return res
      .status(status_codes.FORBIDDEN)
      .send("You need to subscribe to our service to use it");
  }

  next();
};
