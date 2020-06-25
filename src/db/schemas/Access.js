module.exports = function (mongoose) {
  const UserAccess = new mongoose.Schema({
    Customer_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    OnModel: {
      type: String,
      enum: ["Exhibit", "Exhibition"],
      required: true,
    },
    Model_Id: {
      type: mongoose.Schema.Types.ObjectId,
      refPath: "OnModel",
    },
    Access: [
      {
        Language_Code: {
          type: String,
          required: true,
        },
        User_Id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      },
    ],
  });
  return UserAccess;
};
