module.exports = function (mongoose) {
  const Translation = new mongoose.Schema({
    Language_Code: {
      type: String,
      required: true,
    },
    Translation_Status: {
      type: String,
      enum: ["Created", "Ready", "Paused", "Deleted"],
    },
    Name: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
    Last_Modified: Date,
  });
  return Translation;
};
