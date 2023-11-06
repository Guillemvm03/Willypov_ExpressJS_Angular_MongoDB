const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');
const verifyJWT = require('../middleware/verifyJWT');
const verifyJWTOptional = require('../middleware/verifyJWTOptional');

// Get profile - authentication optional
router.get('/:username',verifyJWTOptional, profileController.getProfile);

// Follow a user
router.post('/:username/follow', verifyJWT, profileController.followUser);

// unfollow a user
router.delete('/:username/follow', verifyJWT, profileController.unFollowUser);


//get followers and following users for each user

router.get('/:username/follow', profileController.getFollowUsers);

router.get('/:username/following', profileController.getfollowingUsers);

module.exports = router;