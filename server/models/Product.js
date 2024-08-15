const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name for the product'],
    },
    price: {
        type: Number,
        required: [true, 'Please provide a price for the product'],
    },
    oldPrice: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        required: [true, 'Please provide a description for the product'],
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Please provide a category for the product']
    },
    images: {
        type: [String],
        required: [true, 'Please provide at least one image for the product']
    },
    material: {
        type: String,
        default: 'Unknown'
    },
    color: {
        type: String,
        default: 'Unknown'
    },
    size: {
        type: String,
        default: 'Unknown'
    },
    dimensions: {
        type: String,
        default: 'Unknown'
    }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
