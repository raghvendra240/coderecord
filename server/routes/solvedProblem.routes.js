const express = require('express');
const router = express.Router();
const solvedProblemController = require('../controllers/solvedProblem.controller');

const authenticateMW = require('../middlewares/authenticate');

//Private routes
router.get('/', authenticateMW, solvedProblemController.getSolvedProblems);
router.post('/', authenticateMW, solvedProblemController.createSolvedProblem);

module.exports = router;