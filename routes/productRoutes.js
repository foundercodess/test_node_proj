// const express = require("express");
// const router = express.Router();
// const Product = require("../models/Product");

// // ➤ Add a new product

// // ➤ Get all products
// router.get("/", async (req, res) => {
//   try {
//     const products = await Product.find();
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// // ➤ Get a single product by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     res.json(product);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// // ➤ Update a product by ID
// router.put("/:id", async (req, res) => {
//   try {
//     const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedProduct) {
//       return res.status(404).json({ message: "Product not found" });
//     }
//     res.json({ message: "Product updated", product: updatedProduct });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// });

// // ➤


const express = require("express");
const router = express.Router();
const Product = require("../model/product");
const mongoose = require("mongoose");

// ➤ Test Route
router.get("/test", (req, res) => {
  res.send("Product API is working!");
});

// ➤ Add a New Product
router.post("/add", async (req, res) => {
  try {
    const { name, description, images, price, category, stock } = req.body;
    if (!name || !description || !images || !price || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProduct = new Product({ name, description, images, price, category, stock });
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ➤ Get All Products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ➤ Delete product by ID
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Validate ObjectId before querying
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});
module.exports = router;
