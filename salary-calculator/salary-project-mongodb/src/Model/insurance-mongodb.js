const mongoose = require("mongoose");

const insuranceSchema = mongoose.Schema({
  Name: {
    type: String,
    required: false,
  },
  A1: {
    type: Number,
    required: false,
  },
  A2: {
    type: Number,
    required: false,
  },
  A3: {
    type: Number,
    required: false,
  },
  A4: {
    type: Number,
    required: false,
  },
  Percent: {
    type: Number,
    required: false,
  },
});

module.exports = mongoose.model("Insurance", insuranceSchema);
