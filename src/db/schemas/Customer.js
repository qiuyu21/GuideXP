module.exports = function (mongoose) {
  const Customer = new mongoose.Schema({
    Name: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    Status: {
      type: String,
      enum: ["Active", "Not Active", "Member", "Expire"],
      require: true,
      default: "Not Active",
    },
    Subscription_Start: Date,
    Subscription_End: Date,
    Free_Trial: {
      type: Boolean,
      require: true,
      default: false,
    },
    Free_Trial_End: Date,
  });
  return Customer;
};
