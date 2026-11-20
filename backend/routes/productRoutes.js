const express = require("express");
const router = express.Router();

const Product = require("../models/Product");

// Get all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a product
router.post("/", async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();

        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Search products
router.get("/search/:name", async (req, res) => {
    try {
        const products = await Product.find({
            name: { $regex: req.params.name, $options: "i" }
        });

        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;