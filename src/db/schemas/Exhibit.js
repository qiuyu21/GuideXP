module.exports = function (mongoose) {
  const Exhibit = new mongoose.Schema({
    Customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    Exhibition: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Exhibition",
    },
    Status: {
      type: String,
      enum: ["Ready", "Paused", "Deleted"],
      required: true,
    },
    Exhibit_Identifier: Number,
    Name: {
      type: String,
      required: true,
    },
    Audio_Path: String,
    Thumbnail_Path: String,
    Description: {
      type: String,
      required: true,
    },
    Translation: [require("./Translation")(mongoose)],
    Last_Modified: Date,
  });
  return Exhibit;
};
