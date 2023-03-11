const otpGenerator = require('otp-generator');

module.exports.getNewOTP = function () {
    const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
    return otp;
    // return 134568;
}
