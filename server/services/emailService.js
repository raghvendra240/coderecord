  //Google API
  const { google } = require("googleapis");

  //Nodemailer
  const nodeMailer = require("nodemailer");

  const {EMAIL, EMAIL_CLIENT_ID, EMAIL_CLIENT_SECRET, EMAIL_CLIENT_REDIRECT_URI, EMAIL_REFRESH_TOKEN} = require('../config/serverConfig');
    const CLIENT_EMAIL = EMAIL;
    const CLIENT_ID = EMAIL_CLIENT_ID;  
    const CLIENT_SECRET = EMAIL_CLIENT_SECRET;
    const REDIRECT_URI = EMAIL_CLIENT_REDIRECT_URI;
    const REFRESH_TOKEN = EMAIL_REFRESH_TOKEN;
  
  const OAuth2Client = new google.auth.OAuth2(
      CLIENT_ID,
      CLIENT_SECRET,
      REDIRECT_URI
  );
  
  OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
  
  async function getTransporter () {
    try {
      // Generate the accessToken on the fly
      const accessToken = await OAuth2Client.getAccessToken();
      // Create the email envelope (transport)
      const transport = nodeMailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: CLIENT_EMAIL,
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: REFRESH_TOKEN,
          accessToken: accessToken,
        },
      });
      return transport;
    } catch (error) {
        console.log("Error while creating transporter",error);
        throw new Error("Error while creating transporter",error);
    }
  }

  module.exports = async (to, subject, text) => {
    try {
      const transporter = await getTransporter();
      const mailOptions = {
        from: CLIENT_EMAIL,
        to: to,
        subject: subject,
        text: text,
      };
      const result = await transporter.sendMail(mailOptions);
      return result;
    } catch (error) {
      console.log("Error while sending Mail",error);
      throw new Error("Error while sending Mail",error);
    }
  }