const mongoose = require('mongoose');

const {OTP_EXPIRES_IN} = require('../config/serverConfig');

const otpSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  otp: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: OTP_EXPIRES_IN || 15000
  }
});


const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;