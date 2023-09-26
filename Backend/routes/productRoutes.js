const express = require('express');
const router = express.Router();

const products = require('../controllers/productController.js');



router.get('/', products.findAll_product);
router.get('/category/:id', products.find_products_category);


module.exports = router;