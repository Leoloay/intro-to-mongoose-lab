const mongoose = require("mongoose")

const CRMSchema = new mongoose.Schema({
  name: String,
  age: Number,
})

const CRM = mongoose.model("CRM", CRMSchema)
module.exports = CRM
