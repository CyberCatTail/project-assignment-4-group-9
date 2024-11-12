const express = require('express');
const router = express.Router();

const controller = require('@controller/productController');

router.get('/:id', controller.getProductById);

router.get('/', controller.getAllProducts);

module.exports = router;