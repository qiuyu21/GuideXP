module.exports = function (mongoose) {
  const Translation = new mongoose.Schema({
    Language_Code: {
      type: String,
      required: true,
    },
    Status: {
      type: String,
      enum: ["Ready", "Paused", "Deleted"],
    },
    Name: {
      Hash: String,
      Value: String
    },
    Audio_Path: String,
    Description: [
      {
        Hash: String,
        Key: String,
        Value: String
      }
    ],
    Last_Modified: Date,
  });
  return Translation;
};
