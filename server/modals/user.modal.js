const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//OTP Modal
const OTP = require('./otp.modal');

//OTP Generator service
const {getNewOTP} = require('../utils/otpGenerator');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  isVerified: { type: Boolean, required: true , default: false},
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

module.exports = mongoose.model('User', userSchema);
