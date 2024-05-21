const mongoose = require('mongoose');
require('dotenv').config()
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
});

module.exports = db;