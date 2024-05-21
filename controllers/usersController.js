const { v4: uuidv4 } = require('uuid');
const db = require('../db/dbConnection');
const usersModel = require('../models/users');
const sessionsModel = require('../models/sessions');
const { checkSignupSchema, checkLoginSchema } = require("../utils/schemaValidator");
const generateJWT = require("../utils/tokenGenerate");



const userSignUp= async (req, res) => {
    try {
        const payload = req.body;
        const isSchemaValid = await checkSignupSchema(payload);
        if (!isSchemaValid) {
            return res.status(400).send("Invalid Schema");
        }
        const user = new usersModel(payload);
        await user.save();
        return res.send(user);
    } catch (err) {
        res.status(400).send("Signup failed");
    }
};

const userLogin = async (req, res) => {
    try {
        const payload = req.body;
        const { username, password } = payload;
        const isSchemaValid = await checkLoginSchema(payload);
        if (!isSchemaValid) {
            return res.status(400).send("Invalid Schema");
        }
        const user = await usersModel.findOne({ username: username }).exec();
        if (user.username === username && user.password === password) {
            const accessToken = generateJWT(username);
            const sessionData = {
                sessionId: uuidv4(),
                username: username,
                accesstoken: accessToken
            }
            const session = new sessionsModel(sessionData);
            await session.save();
            return res.send(sessionData);
        }
        return res.status(400).send("Invalid username/password");
    } catch (err) {
        return res.status(400).send("Failed to login");
    }
};

const getUsers = async (req, res) => {
    try{
        const users = await usersModel.find();
        return res.status(200).send(users)
    }catch(err) {
        return res.status(500).send('Internal Server Error')
    }
}

module.exports={
    userSignUp,
    userLogin,
    getUsers
} 