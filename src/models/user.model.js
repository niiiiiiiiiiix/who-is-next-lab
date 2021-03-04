const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 8,
    lowercase: true,
    match: /^[a-zA-Z0-9]*$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

// userSchema.virtual("fullName").get(function () {
//   return `${this.salutation} ${this.firstName} ${this.lastName}`;
// });

// userSchema.virtual("reverseName").get(function () {
//   return `${this.lastName}, ${this.firstName}`;
// });

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const rounds = 10;
    this.password = await bcrypt.hash(this.password, rounds);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
