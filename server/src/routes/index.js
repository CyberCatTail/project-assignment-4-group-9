const express = require('express');
const router = express.Router();

const { userRoutes, cartRoutes, loginRoutes, logoutRoutes} = require('./userRoutes');
const productRoutes = require('./productRoutes');

router.use('/users', userRoutes);
router.use('/cart', cartRoutes);
router.use('/products', productRoutes);
router.use('/login', loginRoutes);
router.use('/logout', logoutRoutes);

module.exports = router;