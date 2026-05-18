const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: String,
  status: {
    type: String,
    default: "Pending"
  }
});

module.exports = mongoose.model("Task", TaskSchema);
