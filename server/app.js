const express = require('express');
const serverConfig = require('./config/serverConfig');
const connectDB = require('./config/database');
const bodyParser = require('body-parser');
const PORT = serverConfig.PORT || 5000;
const apiRoutes = require('./routes');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('Server is running');
});
app.use('/api', apiRoutes);

app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}`);
    await connectDB();
});