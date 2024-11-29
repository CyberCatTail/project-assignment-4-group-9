const express = require('express');
const authController = require('@controller/authController');
const cartController = require('@controller/cartController');
const userRoutes = express.Router();
const loginRoutes = express.Router();
const cartRoutes = express.Router();
const paymentRoutes = express.Router();

loginRoutes.post('/', authController.login);


cartRoutes.get('/items', cartController.getCart);
cartRoutes.post('/items', cartController.addItem);
// cartRoutes.put('/items', cartController.UpdateQuantity);
paymentRoutes.put('/', cartController.SubmitCart);
cartRoutes.put('/items/:id', cartController.UpdateQuantity);
// cartRoutes.delete('/items:id', cartController.removeItem);

module.exports = {userRoutes, loginRoutes, cartRoutes, paymentRoutes};