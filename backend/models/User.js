const mongoose = require("mongoose");

const User = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  sub: {
    type: String,
  },
  displayName: {
    type: String,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  autoArchive: {
    type: Boolean,
    default: false,
  },
  
});

module.exports = mongoose.model("user", User);
