const AsyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");

// console.log('patata');

const findAll_category = AsyncHandler(async (req, res) => {

    res.json("patata");

})


module.exports = {
findAll_category
}