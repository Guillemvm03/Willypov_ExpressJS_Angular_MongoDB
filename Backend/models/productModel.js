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
        // state: {
        //     type: String,
        //     requiered: true
        // },
        location: String,
        product_images: [String],
});


product_schema.plugin(uniqueValidator);

product_schema.pre('save', function(next){
    this.slug = slugify(this.name, { lower: true, replacement: '-'});
    next();
});

product_schema.methods.toProductResponse = async function () {
    return {
        slug: this.slug,
        name: this.name,
        price: this.price,
        description: this.description,
        id_category: this.id_category,
        // state: this.state,
        product_images: this.product_images,
    }
}

product_schema.methods.toProductCarouselResponse = async function () {
    return {
        slug: this.slug,
        product_images: this.product_images,
    }
}





module.exports = mongoose.model('Product', product_schema);