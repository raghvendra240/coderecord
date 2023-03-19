// const otpGenerator = require('otp-generator');

// module.exports.getNewOTP = function () {
//   return otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
// }

const crypto = require('crypto');

module.exports.getNewOTP = function () {
    const buffer = crypto.randomBytes(3); 
  const otp = parseInt(buffer.toString('hex'), 16) % 1000000; 
  return otp.toString().padStart(6, '0'); 
}

