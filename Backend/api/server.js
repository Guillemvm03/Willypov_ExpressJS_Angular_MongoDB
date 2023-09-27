const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv")
dotenv.config();
const connect_db = require("../config/dbConfig.js");


const app = express();

const port = process.env.PORT || 8080;

connect_db();

var corsOptions = {
  origin: process.env.CORS_URI
};

app.use(cors(corsOptions));

app.use(express.json());


app.use('/api/categories', require('../routes/categoryRoutes.js'));
app.use('/api/products', require('../routes/productRoutes.js'));


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})

module.exports = app;