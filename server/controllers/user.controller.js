const  mongoose = require('mongoose');
const User = require('../models/user.model');
const OTP = require('../models/otp.model');
const {getNewOTP} = require('../utils/otpGenerator');
const sendOTPService = require('../services/sendOTPService');

exports.createUser = async (req, res) => {
  let session = null;
  try {
    // await User.deleteMany({});
    session = await mongoose.startSession();
    session.startTransaction();

    const user = new User(req.body);
    // const createdUser = await user.save({session});
    /*--------KEPT OTP SERVICE AT HOLD */
    const otp = getNewOTP();
    // const otpDoc = new OTP({
    //   userId: createdUser._id,
    //   otp: otp,
    //   createdAt: Date.now()
    // });
    // await otpDoc.save({session});
    await sendOTPService(req.body.email, otp, req.body.firstName);
    await session.commitTransaction();
    res.status(201).send({
        success: true,
        message: 'User created successfully',
    });
  } catch (error) {
    if(session) {
        await session.abortTransaction();
    }
    console.log("Error occurred while creating user", error);
    res.status(400).send(error);
  }finally {
    if (session) {
      session.endSession();
    }
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Invalid login credentials');
    }

    const token = await user.generateAuthToken();
    const {password: userPassword, createdAt, updatedAt , isVerified, ...userWithoutPassword} = user._doc;
    res.status(200).send({
      success: true,
      message: 'User logged in successfully',
      data: { user: userWithoutPassword, token },
      err: [],
    });
  } catch (error) {
    console.log("Error while logging in user", error);
    res.status(400).send({
      success: false,
      message: 'Error while logging in user',
      data: [],
      err: [error],
    });
  }
};

exports.verifyOTP = async (req, res) => {

};

exports.getMe = async (req, res) => {
  try {
      const userInfo = await User.findById(req.userId).select('-password');
      res.status(200).send({
        success: true,
        message: 'User info fetched successfully',
        data: userInfo,
        err: [],
      });
  } catch (error) {
    console.log("Error while getting user", error);
    res.status(500).send({
      success: false,
      message: 'Error while getting user',
      data: [],
      err: [error],
    });
  }
}

exports.updateSilentMode = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const { silentMode } = req.body;
    user.silentMode = silentMode;
    await user.save();
    res.status(200).send({
      success: true,
      message: 'User updated successfully',
      data: [],
      err: [],
    });
  } catch (error) {
    console.log("Error while updating user", error);
    res.status(500).send({
      success: false,
      message: 'Error while updating user',
      data: [],
      err: [error],
    });
  }
}

