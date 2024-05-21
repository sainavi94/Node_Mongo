const jwt = require('jsonwebtoken');

const sessionsModel = require('../models/sessions');

const checkToken = async (sessionId, username, token) => {
    const session = await sessionsModel.findOne({ sessionId: sessionId }).exec();
    if(session.username === username && session.accesstoken === token) {
        return true;
    }
    return false;
}

const verifyAuth = async (req, res, next) => {
    try {
        const token = req.headers['x-access-token'];
        const username = req.headers.username;
        const sessionId = req.headers.sessionid;
        const decoded = jwt.decode(token);
        const { exp } = decoded;
        const curTimestamp = Math.floor(Date.now()/1000); 
        const isValid = await checkToken(sessionId, username, token);
        if(isValid) {
            if(exp < curTimestamp) {
                return res.status(401).send("Invalid accesstoken");
            }
            next();
        } else {
            return res.status(401).send("Invalid accessToken")
        }
    } catch(err) {
        return res.status(401).send("Invalid accessToken")
    }
}

module.exports = {
    verifyAuth
}