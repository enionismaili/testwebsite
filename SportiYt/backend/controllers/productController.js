const Product = require('../models/product.js');

// GET /api/products
const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// POST /api/products
const createProduct = async (req, res) => {
  const { name, image, price, category, description } = req.body;

  const product = new Product({ name, image, price, category, description });
  await product.save();

  res.status(201).json(product);
};

module.exports = { getProducts, createProduct };
