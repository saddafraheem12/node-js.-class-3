const express = require("express");
const fs = require("fs");
const router = express.Router();

// GET all products
router.get("/", (req, res) => {
    fs.readFile('./data/products.json', 'utf-8', (err, data) => {
        if (err) return res.status(500).json({ message: "Failed to read products file", error: err });

        const products = JSON.parse(data);
        res.json({ message: "Fetched all products", data: products });
    });
});

// POST new product
router.post("/", (req, res) => {
    const newData = req.body;

    fs.readFile('./data/products.json', 'utf-8', (err, data) => {
        if (err) return res.status(500).json({ message: "Failed to read products file", error: err });

        const products = JSON.parse(data);
        products.push(newData);

        fs.writeFile('./data/products.json', JSON.stringify(products), (err) => {
            if (err) return res.status(500).json({ message: "Failed to save product", error: err });

            res.json({ message: "Product added successfully", data: products });
        });
    });
});

module.exports = router;
