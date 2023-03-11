const emailService = require('./emailService');

module.exports = async (to, otp) => {
    try {
        const subject = 'OTP for Login';
        const text = 'Your OTP is: ' + otp;
        const result = await emailService(to, subject, text);
        return result;
    } catch (error) {
        console.log("Error while sending OTP",error);
        throw new Error("Error while sending OTP",error);
    }
}
