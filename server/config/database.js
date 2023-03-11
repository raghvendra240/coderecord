//connect to mongoose using async function
const serverConfig = require('./serverConfig');
const mongoose = require('mongoose');
const {  dbHost, dbUser, dbPassword, dbName } = serverConfig;

const MONGO_URL = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGO_URL, {
            useNewUrlParser: true
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error While connecting to MongoDB`, err);
        process.exit(1);
    }
}

module.exports = connectDB;

