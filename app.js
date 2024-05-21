const express = require('express');
const app = express();
const router = require("./routes/routes");
const db = require('./db/dbConnection')
require('dotenv').config()
const port = process.env.PORT;


db

app.use(express.json());
app.use('/api',router);


app.listen(port, () => {console.log(`The app is listening on...${port}`)});