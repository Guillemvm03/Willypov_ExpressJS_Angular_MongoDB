const Product = require("../models/productModel.js");
const Category = require("../models/categoryModel.js");
const AsyncHandler = require("express-async-handler");


const findAll_product = AsyncHandler(async (req, res) => {
    
    let query = {};
    let transUndefined = (varQuery, otherResult) => {
        return varQuery != "undefined" && varQuery ? varQuery : otherResult;
    };

    let limit = transUndefined(req.query.limit, 3);
    let offset = transUndefined(req.query.offset, 0);
    let category = transUndefined(req.query.category, "");
    let name = transUndefined(req.query.name, "");
    let price_min = transUndefined(req.query.price_min, 0);
    let price_max = transUndefined(req.query.price_max, Number.MAX_SAFE_INTEGER);
    let nameReg = new RegExp(name);

    query = {
        name: { $regex: nameReg },
        $and: [{ price: { $gte: price_min } }, { price: { $lte: price_max } }],
    };

    if (category != "") {
        query.id_category = category;
    }

    const products = await Product.find(query).sort("name").limit(Number(limit)).skip(Number(offset));
    const product_count = await Product.find(query).countDocuments();

    if (!products) {
        res.status(404).json({ msg: "There was an error finding the products" });
    }

    // return res.json({products: products.map(product => product), 
    //     product_count: product_count});

    return res.status(200).json({
        products: await Promise.all(products.map(async product => {
            return await product.toProductResponse();
        })), product_count: product_count
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


const CategoriesFromProduct = AsyncHandler(async (req, res) => {

    const slug = req.params.id;

    const category = await Category.findOne({slug}).exec();

    if (!category) {
        res.status(400).json({message: "Categoria no encontrada"});
    }

    return await res.status(200).json({
        products: await Promise.all(category.products.map(async productId => {
            const productObj = await Product.findById(productId).exec();
            return await productObj.toProductResponse();
        }))
    })
    
})



const create_product = AsyncHandler(async (req, res) => {

    const product_data = {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        id_category: req.body.id_category,
        location: req.body.location,
        product_images: req.body.product_images
      };

      const id_cat = req.body.id_category;

    //   res.json(cat_id);

      const category = await Category.findOne({id_cat}).exec();

    //   res.json(category)

      if (!category) {
        res.status(400).json({message: "Ha ocurrido un error buscar la categoria a la que pertenece el producto"});
    }

      const product = new Product(product_data);
      await product.save();

      if (!product) {
        res.status(400).json({message: "Ha ocurrido un error al crear el producto"});
    }

    await category.addProduct(product._id);

      return res.status(200).json({
        product: await product.toProductResponse()
    })
   

})

const delete_product = AsyncHandler(async (req, res) => {

    const slug = req.params.id;

    const product = await Product.findOneAndDelete({slug}).exec();

    if (!product) {
        res.status(400).json({message: "Producto no encontrado"});
    }

    const id_cat = product.id_category
    const category = await Category.findOne({id_cat}).exec();

    if (!category) {
        res.status(400).json({message: "Ha ocurrido un error buscar la categoria a la que pertenece el producto"});
    }

    await category.removeProduct(product._id)

    res.json("producto eliminado")


})

const deleteAll_products = AsyncHandler(async (req, res) => {

    res.json("productos eliminados");

})

const update_product = AsyncHandler(async (req, res) => {

    res.json("producto actualizado");

})

// const find_product_name = AsyncHandler(async (req, res) => {
//     let search = new RegExp(req.params.search);

//     const product = await Product.find({ product_name: { $regex: search } });

//     if(!product) {
//         return res.status(401).json({
//             message: "Product Not Found"
//         })
//     }

//     res.json(product.map((product) => product.toNameJSONFor()));

// })

module.exports = {
    findAll_product,
    findOne_product,
    create_product,
    delete_product,
    deleteAll_products,
    update_product,
    CategoriesFromProduct
}