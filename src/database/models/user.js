const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  country: { type: String, required: true },
  jobTitle: { type: String, required: true },
  yearsOfExperience: { type: Number, required: true },
  industry: { type: String, required: true },
  companySize: { type: String, required: true },
  score: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model("users", UserSchema);