const express = require('express');
const verifyJWT = require('../middleware/verifyJWT');
const verifyJWTOptional = require('../middleware/verifyJWTOptional');
const router = express.Router();

const products = require('../controllers/productController.js');


router.post('/', verifyJWT, products.create_product);

router.get('/', verifyJWTOptional, products.findAll_product);

router.get('/category/:id', verifyJWTOptional, products.CategoriesFromProduct);

router.get('/:id', verifyJWTOptional, products.findOne_product);

router.get('/:id/related', verifyJWTOptional, products.related_products);

router.put('/:id', verifyJWT, products.update_product);

router.delete('/:id', products.delete_product);

router.delete('/', products.deleteAll_products);



router.post('/:id/like', verifyJWT, products.likeProduct);

router.delete('/:id/like', verifyJWT, products.dislikeProduct );


module.exports = router;