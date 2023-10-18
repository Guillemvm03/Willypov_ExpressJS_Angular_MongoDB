const express = require('express');
const router = express.Router();
const user = require('../controllers/userController.js');
const verifyJWT = require('../middleware/verifyJWT');

router.post('/users/login', user.userLogin);
router.post('/users', user.registerUser);
router.get('/user', verifyJWT, user.getCurrentUser);
// router.put('/user', verifyJWT, user.updateUser);

module.exports = router;