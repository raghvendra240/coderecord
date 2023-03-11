const express = require('express');
const router = express.Router();

// const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const solvedProblemRoutes = require('./solvedProblem.routes');

// router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/solvedproblems', solvedProblemRoutes);

module.exports = router;
