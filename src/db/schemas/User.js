module.exports = function (mongoose) {
  const User = new mongoose.Schema({
    Role: {
      type: Number,
      enum: [1, 2, 3], //1:GUIDEXP 2:MANAGER 3:STAFF
      required: true,
    },
    First_Name: {
      type: String,
      maxlength: 32,
      required: true,
    },
    Last_Name: {
      type: String,
      maxlength: 32,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 256,
    },
    Active: {
      type: Boolean,
      required: true,
      default: false,
    },
    Hash: {
      type: String,
      required: false,
      maxlength: 255,
    },
    Lock: {
      type: Boolean,
      required: true,
      default: false,
    },
    Lock_Start: Date,
    Fail_Count: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    Login_Count: {
      type: Number,
      default: 0,
      required: true,
      min: 0,
    },
    Password_Change: Date,
    Password_Forgot: Date,
    Last_Login_In: Date,
    Customer_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    Created_By: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
  });
  return User;
};
