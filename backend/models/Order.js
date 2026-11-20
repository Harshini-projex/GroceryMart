const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    customerName: String,
    phone: String,
    address: String,

    items: [{
        productId: mongoose.Schema.Types.ObjectId,
        name: String,
        quantity: Number,
        price: Number
    }],

    totalAmount: Number,

    orderDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Order", orderSchema);