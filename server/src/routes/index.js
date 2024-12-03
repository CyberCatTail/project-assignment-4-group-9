const express = require('express');
const router = express.Router();

const { verifyAuth, verifyAdmin } = require('@root/middleware/authMiddleware');
const { userRoutes, cartRoutes, loginRoutes, paymentRoutes } = require('./userRoutes');
const productRoutes = require('./productRoutes');
const adminRoutes = require('./adminRoutes');

router.use('/user', verifyAuth, userRoutes);
router.use('/payment', verifyAuth, paymentRoutes);
router.use('/cart', verifyAuth, cartRoutes);
router.use('/products', productRoutes);
router.use('/login', loginRoutes);
router.use('/admin', verifyAdmin, adminRoutes);

module.exports = router;