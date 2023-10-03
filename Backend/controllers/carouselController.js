const AsyncHandler = require("express-async-handler");
const Category = require("../models/category.model.js");

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

module.exports = {
    get_carousel_category
}
