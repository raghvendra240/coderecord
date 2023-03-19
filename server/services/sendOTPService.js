const emailService = require('./emailService');
const {OTP_EXPIRES_IN} = require('../config/serverConfig');

const getEmailBody = (otp, userName) => {
    return `
    <div>Dear ${userName}</div>
    <br>
    <br>
    <div>Thank you for signing up for CodeRecord! To verify your account, please enter the following One-Time Password (OTP):</div>
    <br>
    <br>
    <div style="font-size: 20px; font-weight: bold; text-align: center;">${otp}</div>
    <br>
    <p>Please enter this OTP within the next ${OTP_EXPIRES_IN/(1000 * 60)} minutes to complete your account registration.</p>
    <br>
     <p>Please ignore this email if you did not sign up for CodeRecord.</p>
    <br>
    <p>Best regards,</p>
    <p>CodeRecord Team</p>
    `
}

module.exports = async (to, otp, userName) => {
    try {
        const subject = 'CodeRecord OTP Verification';
        const text = getEmailBody(otp, userName);
        const result = await emailService(to, subject, text);
        return result;
    } catch (error) {
        console.log("Error while sending OTP",error);
        throw new Error("Error while sending OTP",error);
    }
}
