module.exports = function (mongoose) {
  const Translation = new mongoose.Schema({
    Language_Code: {
      type: String,
      required: true,
    },
    Status: {
      type: String,
      enum: ["Created", "Ready", "Paused", "Deleted"],
    },
    Name: {
      type: String,
      required: true,
    },
    Description: [
      {
        Hash: String,
        Key: {
          type: String,
          required: true,
        },
        Value: String
      }
    ],
  });
  return Translation;
};
