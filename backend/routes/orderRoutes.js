const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Order = require("../models/Order");

// Place an order
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { customerName, phone, address, items } = req.body;

        if (!customerName || !phone || !address ||
            !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({
                message: "Please provide customer details and cart items"
            });
        }

        const order = new Order({
            customerName,
            phone,
            address,
            items,
            totalAmount: items.reduce(
                (total, item) => total + item.price * item.quantity, 0
            )
        });

        await order.save();

        res.status(201).json({
            message: "Order placed successfully!",
            order
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all orders
router.get("/", async (req, res) => {
    try {
        const orders = await Order.find().sort({ orderDate: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;