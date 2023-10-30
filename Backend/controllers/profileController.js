const User = require('../models/userModel');
const AsyncHandler = require('express-async-handler');

const getProfile = AsyncHandler(async (req, res) => {
    const username  = req.params.username;
    const loggedin = req.loggedin;

    // console.log(`print out username ${username}`)
    const user = await User.findOne({ username }).exec();

    if (!user) {
        return res.status(404).json({
            message: "User Not Found"
        })
    }
    if (!loggedin) {
        return res.status(200).json({
            profile: user.toProfileJSON(false)
        });
    } else {
        const loginUser = await User.findOne({ email: req.userEmail }).exec();
        return res.status(200).json({
            profile: user.toProfileJSON(loginUser)
        })
    }

});

const followUser = AsyncHandler(async (req, res) => {
    const  username  = req.params.username;

    const userId = req.userId;

    const loginUser = await User.findById(userId).exec();
    const user = await User.findOne({ username }).exec();

    if (!user || !loginUser) {
        return res.status(404).json({
            message: "User Not Found"
        })
    }
    await loginUser.follow(user._id);
    await user.followed(loginUser._id);

    return res.status(200).json({
        profile: user.toProfileJSON(loginUser)
    })

});

const unFollowUser = AsyncHandler(async (req, res) => {
    const  username  = req.params.username;
    const userId = req.userId;

    const loginUser = await User.findById(userId).exec();
    const user = await User.findOne({ username }).exec();

    if (!user || !loginUser) {
        return res.status(404).json({
            message: "User Not Found"
        })
    }
    await loginUser.unfollow(user._id);
    await user.unfollowed(loginUser._id);


    return res.status(200).json({
        profile: user.toProfileJSON(loginUser)
    })

});

module.exports = {
    getProfile,
    followUser,
    unFollowUser
}