module.exports = function (mongoose) {
  const Exhibit = new mongoose.Schema({
    Customer_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    Exhibition_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exhibition",
    },
    Exhibit_Status: {
      type: String,
      enum: ["Created", "Ready", "Paused", "Deleted"],
      required: true,
    },
    Exhibit_Identifier: Number,
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
  return Exhibit;
};
