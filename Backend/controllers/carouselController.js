const AsyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");
const Product = require("../models/productModel");

const get_carousel_category = AsyncHandler(async (req, res) => {
    
        const categories = await Category.find({}, {});

        if (!categories) {
            res.status(400).json({message: "Ha ocurrido un error al buscar las categorias"});
        }
        return res.status(200).json({
            categories: await Promise.all(categories.map(async category => {
                return await category.toCategoryCarouselResponse();
            })),
        });
})

const findCarouselProduct = AsyncHandler(async (req, res) => {

    const slug = req.params.id;

    const product = await Product.findOne({slug}).exec();

    if (!product) {
        res.status(400).json({message: "Producto no encontrado"});
    }

    return res.status(200).json({
       product: await product.toProductCarouselResponse()
    });

})


module.exports = {
    get_carousel_category,
    findCarouselProduct
}
