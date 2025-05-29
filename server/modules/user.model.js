const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  idNo: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  role: { type: String, default: "user" },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("UsersGuMorning", UserSchema);
