const express = require('express');
const router = express.Router();

const categories = require('../controllers/categoryController.js');
  
//api/categories
// router.post('/', categories.create_category);
router.get('/hola', categories.findAll_category);
// router.get('/:id', categories.findOne_category);
// router.put('/:id', categories.update_category);
// router.delete('/:id', categories.delete_category);
// router.delete('/', categories.deleteAll_categories);

module.exports = router;