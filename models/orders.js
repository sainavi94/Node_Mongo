const mongoose = require('mongoose');
const { Schema } = mongoose;
const { v4: uuidv4 } = require('uuid');


const ordersSchema = new Schema({
  username:  String, 
  orderId:  String,
  orderDetails: Array
});

const Orders = mongoose.model('orders', ordersSchema);

module.exports = Orders;