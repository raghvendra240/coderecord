const express = require('express');
const serverConfig = require('./config/serverConfig');
const connectDB = require('./config/database');
const app = express();
const PORT = serverConfig.PORT || 5000;


app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}`);
    await connectDB();
});