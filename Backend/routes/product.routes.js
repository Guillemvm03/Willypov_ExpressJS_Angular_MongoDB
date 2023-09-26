const router = require('express').Router();

const products = require('../controllers/product.controller.js');



router.get('/', products.findAll_product);
router.get('/category/:id', products.find_products_category);


module.exports = router;