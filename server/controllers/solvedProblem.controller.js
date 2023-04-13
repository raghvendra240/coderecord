const SolvedProblem = require("../models/solvedProblem.model.js");
const Reminder = require("../models/reminder.model.js");
const { default: mongoose } = require("mongoose");
const { sortOptions, filterOptions, pageSize } = require("../constants");

function getDefaultSortId() {
    return sortOptions.find((sortOption) => sortOption.default).id;
}
function gerDefaultSortOrder() {
    return sortOptions.find((sortOption) => sortOption.default).order;
}

module.exports.getSolvedProblems = async (req, res) => {
    const search = req.query.search || '';
    const sortId = req.query.sortId || getDefaultSortId();
    const sortOrder =  sortOptions.find((sortOption) => sortOption.id == sortId).order
    const sortValue  = sortOptions.find((sortOption) => sortOption.id == sortId).value;
    const pageNum = req.query.page || 1;
    const filterId = req.query.filterId ;
    let filterQuery = {};
    if (filterId > 0) {
        filterQuery = filterOptions.find((filterOption) => filterOption.id == filterId).query;
    }
    const query = {
        $and: [
            { userId: req.userId },
            filterQuery
        ],
        $or: [
            { platformName: { $regex: search, $options: 'i' } },
            { problemName: { $regex: search, $options: 'i' } },
        ],
    };
    if (filterId > 0) {

    }
    const sortQuery = {
        [sortValue]: sortOrder.toLowerCase() == 'asc' ? 1 : -1,
    }
    try {
        const totalProblems = await SolvedProblem.countDocuments(query);
        const totalPages = Math.ceil(totalProblems / pageSize);
        const solvedProblems = await SolvedProblem.find(query)
                                                   .sort(sortQuery)
                                                   .select('platformName problemName problemUrl submittedDate problemHint reminderDate')
                                                   .skip((pageNum - 1) * pageSize)
                                                    .limit(pageSize)
                                                   .exec();
        res.status(200).json({
            success: true,
            message: 'Solved problems fetched successfully',
            data: {solvedProblems, totalPages},
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

module.exports.getAllSolvedProblemCount = async (req, res) => {
    try {
        const totalProblems = await SolvedProblem.countDocuments({ userId: req.userId });
        const leetcodeProblemsCount = await SolvedProblem.countDocuments({ userId: req.userId, platformName: 'leetcode' });
        res.status(200).json({
            success: true,
            message: 'Solved problems fetched successfully',
            data: {
                gfg: totalProblems - leetcodeProblemsCount,
                leetcode: leetcodeProblemsCount,
                total: totalProblems,
            },
            err: [],
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error while getting solved problems',
            data: {},
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