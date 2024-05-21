const mongoose = require('mongoose');
const { Schema } = mongoose;

const usersSchema = new Schema({
  firstName:  String, 
  lastName:  String,
  username: String,
  email:   String,
  password:   String,
  age: Number,
  address: String
});

const Users = mongoose.model('users', usersSchema);

module.exports = Users;