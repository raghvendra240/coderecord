const mongoose = require("mongoose");

const SolvedProblemSchema = new mongoose.Schema({
  platformName: {
    type: String,
    required: true,
  },
  problemName: {
    type: String,
    required: true,
  },
  problemId: {
    type: String,
    required: true,
    unique: true,
  },
  problemUrl: {
    type: String,
    required: true,
  },
  submittedDate: {
    type: Date,
    required: true,
  },
  reminderDate: {
    type: Date,
  },
  problemHint: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});



module.exports = mongoose.model("SolvedProblem", SolvedProblemSchema);

