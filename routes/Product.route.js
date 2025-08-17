const express = require("express");
const Product = require("../models/product.model.js");
const { authMiddleware, isAdmin } = require("../middlewares/auth");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller.js");

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProduct);

// Only admins can create products
router.post("/", authMiddleware, isAdmin, createProduct);

// Only admins can update products
router.put("/:id", authMiddleware, isAdmin, updateProduct);

// Only admins can delete products
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);

module.exports = router;
