require('dotenv').config();

module.exports = {
    dbPort: process.env.DB_PORT,
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    PORT: process.env.PORT,
    OTP_EXPIRES_IN: process.env.OTP_EXPIRES_IN,
}