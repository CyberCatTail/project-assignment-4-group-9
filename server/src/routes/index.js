const express = require('express');
const router = express.Router();

const { verifyAuth } = require('@root/middleware/authMiddleware');
const { userRoutes, cartRoutes, loginRoutes } = require('./userRoutes');
const productRoutes = require('./productRoutes');

router.use('/users', userRoutes);
router.use('/cart', verifyAuth, cartRoutes);
router.use('/products', productRoutes);
router.use('/login', loginRoutes);

module.exports = router;