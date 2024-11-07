const express = require('express');
const router = express.Router();

const controller = require('@controller/productController');

router.get('/:id', controller.getProductById);

module.exports = router;