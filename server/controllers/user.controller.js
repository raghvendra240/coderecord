const User = require('../modals/user.modal');
const OTP = require('../modals/otp.modal');

exports.createUser = async (req, res) => {
  try {
    // await User.deleteMany({});
    const user = new User(req.body);
    await user.save();
    res.status(201).send({
        success: true,
        message: 'User created successfully',
    });
  } catch (error) {
    console.log("Error occurred while creating user", error);
    res.status(400).send(error);
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
