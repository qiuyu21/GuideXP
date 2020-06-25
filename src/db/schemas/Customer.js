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
      enum: ["Active", "Not Active"],
      require: true,
      default: "Not Active",
    },
    Subscription_Start: Date,
    Subscription_End: Date,
  });
  return Customer;
};
