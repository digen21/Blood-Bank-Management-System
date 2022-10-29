const mongoose = require("mongoose");

const bloodgroup = new mongoose.Schema({
  bloodgroup: {
    type: String,
  },
  totalml: {
    type: Number,
  },
});

const bgModel = new mongoose.model("bgModel", bloodgroup);
module.exports = bgModel;
