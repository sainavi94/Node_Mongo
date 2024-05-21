const db = require('../db/dbConnection');
const { ordersGetSchema } = require("../utils/schemaValidator");
const ordersModel = require('../models/orders');


const getOrders=  async (req, res) => {
    try {
        const username = req.headers.username;
        const orders = await ordersModel.find({ username: username });
        return res.send(orders);
    } catch (err) {
        return res.status(400).send(err);
    }
};


const createOrders= async (req, res) => {
    try {
        const payload = req.body;
        const isSchemaValid = await ordersGetSchema(payload);
        if (!isSchemaValid) {
            return res.status(400).send("Schema not Valid");
        }
        const order = new ordersModel(payload);
        await order.save();
        return res.send(order);
    } catch (err) {
        res.status(400).send(err.msg);
    }
};


module.exports = {
    getOrders,
    createOrders
}