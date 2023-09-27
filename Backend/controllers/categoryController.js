const AsyncHandler = require("express-async-handler");
const Category = require("../models/categoryModel");

// console.log('patata');

const findAll_category = AsyncHandler(async (req, res) => {

    const categories = await Category.find({}, {});
    // res.json(categories)
    

    if (!categories) {
        res.status(400).json({message: "Ha ocurrido un error al buscar las categorias"});
    }

    return res.status(200).json({
        categories: await Promise.all(categories.map(async category => {
            return await category.toCategoryResponse();
        })),
    });

    // res.json(categories.map(category => category.toCategoryResponse()));

})

const findOne_category = AsyncHandler(async (req, res) => {

    res.json("categoria encontrada");

})

const create_category = AsyncHandler(async (req, res) => {

    // res.json(req.body);

    const category_data = {
        id_cat: req.body.id_cat,
        category_name: req.body.category_name,
        image: req.body.image,
        products: []
      };
      const category = new Category(category_data);
      await category.save();

      if (!category) {
        res.status(400).json({message: "Ha ocurrido un error al crear la categoria"});
    }

      return res.status(200).json({
        category: await category.toCategoryResponse()
    })

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