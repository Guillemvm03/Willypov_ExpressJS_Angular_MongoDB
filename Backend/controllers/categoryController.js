const AsyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");

// console.log('patata');

const findAll_category = AsyncHandler(async (req, res) => {

    res.json("categoria");

})

const findOne_category = AsyncHandler(async (req, res) => {

    res.json("categoria encontrada");

})

const create_category = AsyncHandler(async (req, res) => {

    res.json("categoria creada");

})

const delete_category = AsyncHandler(async (req, res) => {

    res.json("categoria borrada");

})

const deleteAll_categories = AsyncHandler(async (req, res) => {

    res.json("Todas las categorias han sido borradas");

})

const update_category = AsyncHandler(async (req, res) => {

    res.json("categoria actualizada");

})


module.exports = {
findAll_category,
findOne_category,
create_category,
delete_category,
deleteAll_categories,
update_category
}