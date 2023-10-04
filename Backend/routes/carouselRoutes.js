const express = require('express');
const router = express.Router();
// const router = require('express').Router();

const carousel = require('../controllers/carouselController.js');
  
//api/categories/carousel
router.get('/categories', carousel.get_carousel_category);
router.get('/products/:id', carousel.findCarouselProduct);

module.exports = router;
