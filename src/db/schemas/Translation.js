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
      Hash: String,
      Value: String
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
    Last_Modified: Date,
  });
  return Translation;
};
