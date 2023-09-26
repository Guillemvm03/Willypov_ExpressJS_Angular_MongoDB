const mongoose = require('mongoose');
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
        location: String,
        product_images: [String],
});


product_schema.plugin(uniqueValidator);

product_schema.pre('save', function(next){
    this.slug = slugify(this.title, { lower: true, replacement: '-'});
    next();
});

module.exports = mongoose.model('Product', product_schema);