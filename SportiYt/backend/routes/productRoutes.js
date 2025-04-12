const express = require('express');
const router = express.Router();
const {
  getProducts,
  createProduct,
} = require('../controllers/productController');

//this route GETs a product
router.get('/', getProducts);

//this route POSTs a product
router.post('/', createProduct);

module.exports = router;
