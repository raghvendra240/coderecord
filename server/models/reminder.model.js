const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  problemName: {
    type: String,
    required: true,
  },
  problemUrl: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Reminder', reminderSchema);
