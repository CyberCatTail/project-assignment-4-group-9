const express = require('express');
const router = express.Router();

const controller = require('@controller/productController');

router.get('/products/:id', controller.getProductById);

router.get('/products', controller.getAllProducts);

module.exports = router;