const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: String,
    price: {
        type: Number,
        required: true
    },
    image: String,
    stock: {
        type: Number,
        default: 10
    }
});

module.exports = mongoose.model("Product", productSchema);