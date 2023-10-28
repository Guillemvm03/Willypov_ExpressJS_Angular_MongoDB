const mongoose = require('mongoose');
const User = require('./userModel');
const slugify = require('slugify');
const uniqueValidator = require('mongoose-unique-validator');

const product_schema = mongoose.Schema({
        slug: { 
            type: String, 
            lowercase: true, 
            unique: true 
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        id_category: {
            type: String,
            required: true
        },
        state: {
            type: String,
            requiered: true
        },
        location: String,
        product_images: [String],
        likesCount: {
            type: Number,
            default: 0
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }]
});


product_schema.plugin(uniqueValidator);

product_schema.pre('save', function(next){
    this.slug = slugify(this.name, { lower: true, replacement: '-'});
    next();
});

product_schema.methods.toProductResponse = async function (user) {
    const authorObj = await User.findById(this.author).exec();
    return {
        slug: this.slug,
        name: this.name,
        price: this.price,
        description: this.description,
        id_category: this.id_category,
        state: this.state,
        product_images: this.product_images,
        liked: user ? user.isLiking(this._id) : false,
        likesCount: this.likesCount,
        author:  authorObj.toProfileJSON(user)
    }
}

product_schema.methods.toProductCarouselResponse = async function () {
    return {
        slug: this.slug,
        product_images: this.product_images,
    }
}


product_schema.methods.updateLikesCount = async function () {
    const likesCount = await User.count({
        likedProducts: {$in: [this._id]}
    });

    this.likesCount = likesCount;

    return this.save();
}


product_schema.methods.addComment = function (commentId) {
    if(this.comments.indexOf(commentId) === -1){
        this.comments.push(commentId);
    }
    return this.save();
};

product_schema.methods.removeComment = function (commentId) {
    if(this.comments.indexOf(commentId) !== -1){
        this.comments.remove(commentId);
    }
    return this.save();
};





module.exports = mongoose.model('Product', product_schema);