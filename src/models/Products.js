const mongoose = require('mongoose');

const productSchema = {
    title: String,
    description: String,
    //imageUrl: String,
    pricing: Number
};

module.exports = mongoose.model('products', productSchema);