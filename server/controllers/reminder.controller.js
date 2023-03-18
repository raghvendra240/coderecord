const Reminder = require('../models/reminder.model');

// Controller for creating a new reminder
exports.createReminder = async (req, res, next) => {
  try {
    const { problemName, problemUrl, dueDate } = req.body;
    const userId = req.user._id;
    const reminder = await Reminder.create({
      problemName,
      problemUrl,
      dueDate,
      userId,
    });
    res.status(201).json({ reminder });
  } catch (error) {
    next(error);
  }
};

// Controller for getting all reminders of a user
exports.getAllReminders = async (req, res, next) => {
  try {
    const today = new Date(); // Get current date
    today.setHours(0, 0, 0, 0); // Set time to midnight;
    const reminders = await Reminder.find({ 
        userId : req.userId,   
        dueDate: { $eq: today }, 
    });
    res.status(200).send({
        success: true,
        message: 'Reminders fetched successfully',
        data: reminders,
        err: [],
    })
  } catch (error) {
    console.log("Error while getting reminders", error);
    res.status(500).json({
        success: false,
        message: 'Error while getting reminders',
        data: [],
        err: [error],
    });
  }
};

// Controller for deleting a reminder
exports.deleteReminder = async (req, res, next) => {
  try {
    const { reminderId } = req.params;
    await Reminder.findByIdAndDelete(reminderId);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
