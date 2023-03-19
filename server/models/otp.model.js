const mongoose = require('mongoose');

const {OTP_EXPIRES_IN_MINUTES} = require('../config/serverConfig');

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
  }
}, { timestamps: true });

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 120 });

const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;