const express = require('express');
const router = express.Router();

const controller = require('@controller/productController');

router.get('/products/:id', controller.getProductById);
router.put('/products/:id', controller.updateProduct);

router.get('/products', controller.getAllProducts);
router.post('/products', controller.createProduct);

module.exports = router;