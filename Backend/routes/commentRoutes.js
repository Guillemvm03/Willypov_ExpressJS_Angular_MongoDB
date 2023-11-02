const express = require('express');
const router = express.Router();
const verifyJWT = require('../middleware/verifyJWT');
const verifyJWTOptional = require('../middleware/verifyJWTOptional');
const commentController = require('../controllers/commentController');

router.post('/:slug/comments', verifyJWT, commentController.addCommentsToProduct);

router.get('/:slug/comments', verifyJWTOptional, commentController.getCommentsFromProduct);

router.delete('/:slug/comments/:id', verifyJWT, commentController.deleteComment)

module.exports = router;