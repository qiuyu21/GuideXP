module.exports = function (mongoose) {
  const Translation = new mongoose.Schema({
    Language_Code: {
      type: String,
      required: true,
    },
    Name: {
      type: String,
      required: true,
    },
    Description: {
      type: String,
      required: true,
    },
  });
  return Translation;
};
