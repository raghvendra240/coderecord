const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/', userController.createUser);
router.post('/login', userController.loginUser);
router.post('/verify-otp', userController.verifyOTP);

module.exports = router;
