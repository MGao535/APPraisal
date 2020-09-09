const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let appraisals = new Schema({
  company: String,
  startDate: String,
  endDate: String
});

module.exports = mongoose.model("details", appraisals);