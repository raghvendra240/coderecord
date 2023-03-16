const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authenticateMW = require('../middlewares/authenticate');

//Public routes
router.post('/', userController.createUser);
router.post('/login', userController.loginUser);
router.post('/verify-otp', userController.verifyOTP);

//Private routes
router.get('/me', authenticateMW, userController.getMe);
router.post('/update-silent-mode', authenticateMW, userController.updateSilentMode);


module.exports = router;
