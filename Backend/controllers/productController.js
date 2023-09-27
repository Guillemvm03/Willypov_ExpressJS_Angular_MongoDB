const Product = require("../models/productModel.js");
const Category = require("../models/categoryModel.js");
const AsyncHandler = require("express-async-handler");


const findAll_product = AsyncHandler(async (req, res) => {

    res.json("producto");

})

const findOne_product = AsyncHandler(async (req, res) => {

    res.json("producto encontrado");

})

const create_product = AsyncHandler(async (req, res) => {

    res.json("producto creado");

})

const delete_product = AsyncHandler(async (req, res) => {

    res.json("producto borrado");

})

const deleteAll_products = AsyncHandler(async (req, res) => {

    res.json("productos eliminados");

})

const update_product = AsyncHandler(async (req, res) => {

    res.json("producto actualizado");

})

module.exports = {
    findAll_product,
    findOne_product,
    create_product,
    delete_product,
    deleteAll_products,
    update_product
}