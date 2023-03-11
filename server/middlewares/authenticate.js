const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { JWT_SECRET } = require('../config/serverConfig');

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Get token from header
    const decoded = jwt.verify(token, JWT_SECRET); // Verify token
    // const user = await User.findOne({ _id: decoded._id, 'tokens.token': token }); 
    // if (!user) {
    //   throw new Error();
    // }
    req.userId = decoded._id; // Attach user id to request
    // req.user = user;  Attach user to request
    req.token = token; // Attach token to request
    next(); // Move to next middleware
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = authenticate;
