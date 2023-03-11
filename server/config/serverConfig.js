require('dotenv').config();

module.exports = {
    dbPort: process.env.DB_PORT,
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    PORT: process.env.PORT,
    OTP_EXPIRES_IN: process.env.OTP_EXPIRES_IN,
    EMAIL: process.env.EMAIL,
    EMAIL_CLIENT_ID: process.env.EMAIL_CLIENT_ID,
    EMAIL_CLIENT_SECRET: process.env.EMAIL_CLIENT_SECRET,
    EMAIL_CLIENT_REDIRECT_URI: process.env.EMAIL_CLIENT_REDIRECT_URI,
    EMAIL_REFRESH_TOKEN: process.env.EMAIL_REFRESH_TOKEN,
    
}