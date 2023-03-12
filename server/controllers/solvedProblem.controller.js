const SolvedProblem = require("../models/solvedProblem.model.js");

module.exports.getSolvedProblems = async (req, res) => {
    try {
        const solvedProblems = await SolvedProblem.find({ userId: req.userId }).select('platformName problemName problemUrl');
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
    try {
        const solvedProblem = new SolvedProblem({
            platformName: req.body.platformName,
            problemName: req.body.problemName,
            problemId: req.body.problemId,
            problemUrl: req.body.problemUrl,
            submittedDate: req.body.submittedDate,
            reminderDate: req.body.reminderDate,
            problemHint: req.body.problemHint,
            userId: req.userId,
        });
        await solvedProblem.save();
        res.status(201).json({
            success: true,
            message: 'Solved problem created successfully',
            data: solvedProblem,
            err: [],
        });
    } catch (error) {
        console.log("Error while creating solved problem", error);
        res.status(400).json({
            success: false,
            message: 'Error while creating solved problem',
            data: [],
            err: [error],
        });
    }
}