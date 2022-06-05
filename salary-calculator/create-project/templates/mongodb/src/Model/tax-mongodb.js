const mongoose = require("mongoose");

const taxSchema = mongoose.Schema({
  MinSalary: {
    type: Number,
    required: false,
  },
  MaxSalary: {
    type: Number,
    required: false,
  },
  Tax: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model("Tax", taxSchema);
