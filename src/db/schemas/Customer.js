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
    Customer_Status: {
      type: Boolean,
      require: true,
      default: true,
    },
  });
  return Customer;
};
