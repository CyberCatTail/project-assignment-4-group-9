const express = require('express');
const router = express.Router();

const { verifyAuth, verifyAdmin } = require('@root/middleware/authMiddleware');
const { userRoutes, cartRoutes, loginRoutes } = require('./userRoutes');
const productRoutes = require('./productRoutes');
const adminRoutes = require('./adminRoutes');

router.use('/users', userRoutes);
router.use('/cart', verifyAuth, cartRoutes);
router.use('/products', productRoutes);
router.use('/login', loginRoutes);
router.use('/admin', verifyAdmin, adminRoutes);

module.exports = router;