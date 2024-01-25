const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});
userSchema.index({ username: 1 });
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
