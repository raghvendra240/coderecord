const  mongoose = require('mongoose');
const User = require('../modals/user.modal');
const OTP = require('../modals/otp.modal');
const {getNewOTP} = require('../utils/otpGenerator');
const sendOTPService = require('../services/sendOTPService');

exports.createUser = async (req, res) => {
  let session = null;
  try {
    // await User.deleteMany({});
    session = await mongoose.startSession();
    session.startTransaction();

    // const user = new User(req.body);
    // const createdUser = await user.save({session});
    // const otp = getNewOTP();
    // const otpDoc = new OTP({
    //   userId: createdUser._id,
    //   otp: otp,
    //   createdAt: Date.now()
    // });
    // await otpDoc.save({session});
    // await sendOTPService(createdUser.email, otp);
    await sendOTPService('fetetaw789@fenwazi.com', 46789);
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
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Invalid login credentials');
    }

    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.verifyOTP = async (req, res) => {

};
