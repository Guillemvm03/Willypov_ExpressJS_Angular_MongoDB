const Product = require("../models/productModel.js");
const Category = require("../models/categoryModel.js");
const AsyncHandler = require("express-async-handler");


const findAll_product = AsyncHandler(async (req, res) => {

    const products = await Product.find({},{});
    

    if (!products) {
        res.status(400).json({message: "Ha ocurrido un error al buscar los productos"});
    }

    return res.status(200).json({
        products: await Promise.all(products.map(async product => {
            return await product.toProductResponse();
        })),
    });

})

const findOne_product = AsyncHandler(async (req, res) => {

    const slug = req.params.id;

    const product = await Product.findOne({slug}).exec();

    if (!product) {
        res.status(400).json({message: "Producto no encontrado"});
    }

    return res.status(200).json({
       product: await product.toProductResponse()
    });

})

const create_product = AsyncHandler(async (req, res) => {

    const product_data = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        id_category: req.body.id_category,
        location: req.body.location,
        product_images: []
      };
      const product = new Product(product_data);
      await product.save();

      if (!product) {
        res.status(400).json({message: "Ha ocurrido un error al crear el producto"});
    }

      return res.status(200).json({
        product: await product.toProductResponse()
    })
   

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