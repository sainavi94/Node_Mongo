const jwt = require('jsonwebtoken');
require('dotenv').config()


const generateJWT = (username) => {
    const token = jwt.sign({
        username: username
    }, process.env.JWT_TOKEN, { expiresIn: '1h' });
    return token;
};

module.exports= generateJWT;