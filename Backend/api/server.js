const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv")
dotenv.config();
const connect_db = require("../config/db.config.js");


const app = express();

const port = process.env.PORT;

connect_db();

var corsOptions = {
  origin: process.env.CORS_URI
};

app.use(cors(corsOptions));

app.use(express.json());

require('../models/index.js');
// require('./app/config/passport');
// app.use(require("../routes/index.js"));q

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})