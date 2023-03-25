const express = require('express');
const router = express.Router();

// const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const solvedProblemRoutes = require('./solvedProblem.routes');
const operationRoutes = require('./operations.routes');

// router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/solved-problems', solvedProblemRoutes);
router.use('/operations', operationRoutes);

module.exports = router;
