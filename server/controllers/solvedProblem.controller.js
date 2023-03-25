const SolvedProblem = require("../models/solvedProblem.model.js");
const Reminder = require("../models/reminder.model.js");
const { default: mongoose } = require("mongoose");

module.exports.getSolvedProblems = async (req, res) => {
    const search = req.query.search || '';
    const query = {
        userId: req.userId,
        $or: [
            { platformName: { $regex: search, $options: 'i' } },
            { problemName: { $regex: search, $options: 'i' } },
        ],
    };
    try {
        const solvedProblems = await SolvedProblem.find(query).select('platformName problemName problemUrl submittedDate problemHint');
        res.status(200).json({
            success: true,
            message: 'Solved problems fetched successfully',
            data: solvedProblems,
            err: [],
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error while getting solved problems',
            data: [],
            err: [error], 
        });
    }
}

module.exports.createSolvedProblem = async (req, res) => {
    let session = null;
    try {
        session = await mongoose.startSession();
        session.startTransaction();

        let reminderDate = null;
        if (req.body.reminderDate) {
            reminderDate = new Date(req.body.reminderDate)
            reminderDate.setHours(0, 0, 0, 0);
        }
        const solvedProblem = new SolvedProblem({
            platformName: req.body.platformName,
            problemName: req.body.problemName,
            problemId: req.body.problemId,
            problemUrl: req.body.problemUrl,
            submittedDate: req.body.submittedDate,
            reminderDate: reminderDate,
            problemHint: req.body.problemHint,
            userId: req.userId,
        });
        let solvedProblemResponse = await solvedProblem.save({session});
        if (req.body.reminderDate) {
            const reminder = new Reminder({
                problemName: req.body.problemName,
                problemUrl: req.body.problemUrl,
                dueDate: reminderDate,
                userId: req.userId,
            });
            await reminder.save({session});
        }
        await session.commitTransaction();
        res.status(201).json({
            success: true,
            message: 'Solved problem created successfully',
            data: solvedProblem,
            err: [],
        });
    } catch (error) {
        console.log("Error while creating solved problem", error);
        await session.abortTransaction();
        let errorMessage = 'Error while creating solved problem';
        if (error.code === 11000) {
            errorMessage = 'Problem already recorded';
        }
        res.status(400).json({
            success: false,
            message: errorMessage,
            data: [],
            err: [error],
        });
    } finally {
        if (session) {
            session.endSession();
        }
    }
}