const express = require("express");

const app = express();
const PORT = 3004;

// Middleware
app.use(express.json());
app.use(express.static("public"));

// Temporary data storage
let products = [
    {
        id: 1,
        name: "Laptop",
        price: 55000,
        category: "Electronics"
    },
    {
        id: 2,
        name: "Headphones",
        price: 2500,
        category: "Accessories"
    }
];

// GET - Get all products
app.get("/api/products", (req, res) => {
    res.json(products);
});

// GET - Get one product
app.get("/api/products/:id", (req, res) => {
    const id = Number(req.params.id);

    const product = products.find(product => product.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.json(product);
});

// POST - Create a product
app.post("/api/products", (req, res) => {
    const { name, price, category } = req.body;

    if (!name || price === undefined || !category) {
        return res.status(400).json({
            message: "Name, price and category are required"
        });
    }

    const newProduct = {
        id: products.length > 0
            ? Math.max(...products.map(product => product.id)) + 1
            : 1,
        name,
        price: Number(price),
        category
    };

    products.push(newProduct);

    res.status(201).json(newProduct);
});

// PUT - Update a product
app.put("/api/products/:id", (req, res) => {
    const id = Number(req.params.id);

    const product = products.find(product => product.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    const { name, price, category } = req.body;

    if (!name || price === undefined || !category) {
        return res.status(400).json({
            message: "Name, price and category are required"
        });
    }

    product.name = name;
    product.price = Number(price);
    product.category = category;

    res.json(product);
});

// DELETE - Delete a product
app.delete("/api/products/:id", (req, res) => {
    const id = Number(req.params.id);

    const productExists = products.some(product => product.id === id);

    if (!productExists) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    products = products.filter(product => product.id !== id);

    res.json({
        message: "Product deleted successfully"
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Task 5 server running at http://localhost:${PORT}`);
});