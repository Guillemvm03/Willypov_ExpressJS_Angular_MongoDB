const express = require('express');
const router = express.Router();

const products = require('../controllers/productController.js');


router.post('/', products.create_product);
router.get('/', products.findAll_product);
router.get('/category/:id', products.CategoriesFromProduct);
router.get('/:id', products.findOne_product);
router.put('/:id', products.update_product);
router.delete('/:id', products.delete_product);
router.delete('/', products.deleteAll_products);


module.exports = router;