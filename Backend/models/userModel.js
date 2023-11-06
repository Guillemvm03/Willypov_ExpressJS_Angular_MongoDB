const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'],
        index: true
    },
    bio: {
        type: String,
        default: ""
    },
    image: {
        type: String,
        default: function() {
            const encryptedEmail = bcrypt.hashSync(this.email, 10);
            return `https://i.pravatar.cc/500?u=${encryptedEmail}`;
        }
    },
    likedProducts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }],
    followingUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    followedByUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]

},
    {
        timestamps: true
    });

userSchema.plugin(uniqueValidator);

// @desc generate access token for a user
// @required valid email and password
userSchema.methods.generateAccessToken = function() {
    const accessToken = jwt.sign({
            "user": {
                "id": this._id,
                "email": this.email,
                "password": this.password
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d"}
    );
    return accessToken;
}

userSchema.methods.toUserResponse = function() {
    return {
        username: this.username,
        email: this.email,
        bio: this.bio,
        image: this.image,
        token: this.generateAccessToken()
    }
};

userSchema.methods.toProfileJSON = function (user) {
    return {
        username: this.username,
        bio: this.bio,
        image: this.image,
        following: user ? user.isFollowing(this._id) : false,
        followedBy: user ? user.isFollowed(this._id) : false,
        likedProducts: this.likedProducts,
        followingUsers: this.followingUsers,
        followedByUsers: this.followedByUsers
    }
};

userSchema.methods.isFollowing = function (id) {
    const idStr = id.toString();
    for (const followingUser of this.followingUsers) {
        if (followingUser.toString() === idStr) {
            return true;
        }
    }
    return false;
};

userSchema.methods.follow = function (id) {
    if(this.followingUsers.indexOf(id) === -1){
        this.followingUsers.push(id);
    }
    return this.save();
};

userSchema.methods.unfollow = function (id) {
    if(this.followingUsers.indexOf(id) !== -1){
        this.followingUsers.remove(id);
    }
    return this.save();
};



userSchema.methods.isFollowed = function (id) {
    const idStr = id.toString();
    for (const followedByUser of this.followedByUsers) {
        if (followedByUser.toString() === idStr) {
            return true;
        }
    }
    return false;
};


userSchema.methods.followed = function (id) {
    if(this.followedByUsers.indexOf(id) === -1){
        this.followedByUsers.push(id);
    }
    return this.save();
};

userSchema.methods.unfollowed = function (id) {
    if(this.followedByUsers.indexOf(id) !== -1){
        this.followedByUsers.remove(id);
    }
    return this.save();
};


userSchema.methods.isLiking = function (id) {
    const idStr = id.toString();
    for (const product of this.likedProducts) {
        if (product.toString() === idStr) {
            return true;
        }
    }
    return false;
}

userSchema.methods.likes = function (id) {
    if(this.likedProducts.indexOf(id) === -1){
        this.likedProducts.push(id);
    }


    return this.save();
}

userSchema.methods.dislikes = function (id) {
    if(this.likedProducts.indexOf(id) !== -1){
        this.likedProducts.remove(id);
    }


    return this.save();
};

module.exports = mongoose.model('User', userSchema);