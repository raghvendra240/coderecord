const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//OTP Modal
const OTP = require('./otp.model');

//OTP Generator service
const {getNewOTP} = require('../utils/otpGenerator');

//Env Config
const {JWT_SECRET} = require('../config/serverConfig');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, required: true , default: false},
  silentMode: { type: Boolean, required: true , default: false},
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user.isVerified = false;
  next();
});

// userSchema.post('save', async function (doc) {
 
//   try {
//     const otp = getNewOTP();
//     const otpDoc = new OTP({
//       userId: doc._id,
//       otp: otp,
//       createdAt: Date.now()
//     });
//     await otpDoc.save();
//   } catch (error) {
//    try {
//       console.log(doc);
//    } catch (error) {
//      console.log("Error while removing user", error)
//    }
//     throw new Error('Error while creating OTP',error);
//   }
// })

userSchema.methods.comparePassword = async function (candidatePassword) {
  const user = this;
  return bcrypt.compare(candidatePassword, user.password);
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id },JWT_SECRET, { expiresIn: '5d' });
  // user.tokens = user.tokens.concat({ token });
  // await user.save();
  return token;
}

userSchema.methods.getFilteredUserDetails = function (user) {
  user  = user || this
  const filteredUser = {
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    isVerified: user.isVerified,
    silentMode: user.silentMode,
  }
  return filteredUser;
}

module.exports = mongoose.model('User', userSchema);
