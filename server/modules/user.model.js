const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  idNo: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  middleName: { type: String},
  email: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("UsersGuMorning", UserSchema);
