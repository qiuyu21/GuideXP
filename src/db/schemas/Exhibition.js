const mongoose = require("../db");
module.exports = function (mongoose) {
  const Exhibition = new mongoose.Schema({
    Customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    Status: {
      type: String,
      enum: ["Created", "Ready", "Paused", "Deleted"],
      required: true,
    },
    Lock: {
      type: Boolean,
      default: false,
      required: true,
    },
    Passcode: {
      type: String,
      maxlength: 32,
    },
    Exhibition_Identifier: {
      type: String,
      maxlength: 10,
    },
    Name: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    Translation: [require("./Translation")(mongoose)],
    Last_Modified: Date,
  });
  return Exhibition;
};
