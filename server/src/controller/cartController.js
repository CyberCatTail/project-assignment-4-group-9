const { Product, Stock } = require("@model/product");
const { cache, db} = require('@root/db');
const { Op } = require('sequelize');
const { sendOrder } = require("../utils/email");

const getCartKey = (req) => {
  const userId = req.userId;
  return `cart_uid_${userId}:`;
}

const getItemKey = (productId) => {
  return `product:${productId}`;
}

const mapProduct2Cart = async (req) => {
  const cartKey = getCartKey(req);
  const cart = await cache.hGetAll(cartKey);
    const itemList = [];
    if (cart) {
      for (const product in cart) {
        const productId = product.split(':')[1]; 
        const quantity = parseInt(cart[product], 10);
        itemList.push({ productId, quantity });
      }
    }
    if (itemList.length < 1) {
      return [];
    }
    const productIdList = itemList.map(v => v.productId);
    const items = await Product.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: {
        product_id: productIdList,
      },
      include: [{
        model: Stock,
        as: "stock",
        attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'product_id'] },
      }],
    }).then(products => {
      return products.map(product => product.get({ plain: true }));
    })
    const data = items.map(product => {      
      const match = itemList.find(item => item.productId == product.product_id);
      if (match) {
        return { ...product, quantity: match.quantity, price: product.price};
      }
      return product;
    });
    return data;
};

exports.getCart = async (req, res) => {
  const cartKey = getCartKey(req);
  try {
    const cart = await cache.hGetAll(cartKey);
    const itemList = [];
    if (cart) {
      for (const product in cart) {
        const productId = product.split(':')[1]; 
        const quantity = parseInt(cart[product], 10);
        itemList.push({ productId, quantity });
      }
    }
    if (itemList.length < 1) {
      res.json({data: []});
      return
    }

    const productIdList = itemList.map(v => v.productId);
    const items = await Product.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: {
        product_id: productIdList,
      },
      include: [{
        model: Stock,
        as: "stock",
        attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'product_id'] },
      }],
    }).then(products => {
      return products.map(product => product.get({ plain: true }));
    })
    const data = items.map(product => {      
      const match = itemList.find(item => item.productId == product.product_id);
      if (match) {
        return { ...product, quantity: match.quantity };
      }
      return product;
    });
    res.json({data: data});
  } catch (err) {
    res.status(500).json({error: {code: 500, detail: err.message}, notice : { message: 'Please Try again' }});
  }
};

exports.addItem = async (req, res) => {
  const { product_id, quantity } = req.body;

  if (!product_id || !quantity) {
    return res.status(500).json({error: {code: 400, detail: "Missing required fields"}});
  }

  const cartKey = getCartKey(req);
  const itemKey = getItemKey(product_id);
  try {
    await cache.hIncrBy(cartKey, itemKey, quantity);
    res.json({notice: { message: 'Item added to cart'}});
  } catch (err) {
    res.status(500).json({error: {code: 500, detail: err.message}, notice : { message: 'Please Try again' }});
  }
};

exports.UpdateQuantity = async (req, res) => {
  const product_id = req.params.id;
  const {quantity} = req.body;
  // const { product_id, quantity} = req.body;
  let productId = product_id;
  if (!productId || quantity<0) {
    return res.status(500).json({error: {code: 400, detail: "Missing required fields"}});
  }

  const cartKey = getCartKey(req);
  const itemKey = getItemKey(productId);
  
  try {
    if (quantity>0){
      const result = await cache.hSet(cartKey, itemKey, quantity);
    }
    else{
      const result = await cache.hDel(cartKey, itemKey);
      if (result === 1) {
          console.log(`Successfully deleted item ${itemKey} from cart ${cartKey}.`);
      } else {
          console.log(`Item ${itemKey} not found in cart ${cartKey}.`);
      }
    }
    const updatedCart = await mapProduct2Cart(req); 
    res.json({data: updatedCart});
  } catch (err) {
    res.status(500).json({error: {code: 500, detail: err.message}, notice : { message: 'Please Try again' }});
  }
};

function generateRandomDigits(length) {
  return Math.random().toString().slice(2, 2 + length);
}

exports.SubmitCart = async (req, res) => { 
  const cartKey = getCartKey(req);
  try {
      const cartKey = getCartKey(req);
      const cart = await cache.hGetAll(cartKey);
      const itemList = [];
      if (cart) {
        for (const product in cart) {
          const productId = product.split(':')[1]; 
          const quantity = parseInt(cart[product], 10);
          itemList.push({ productId, quantity });
        }
      }
      if (itemList.length < 1) {
        res.json({notice : { message: 'Cart is empty.' }})
        return;
      }
      
      const oldCart = await mapProduct2Cart(req);       

      await db.transaction(async t => {  
      for(const cartItem of itemList)
      {
          await Stock.increment({quantity:  -cartItem.quantity}, {
                where:{product_id: cartItem.productId, quantity: { [Op.gt]: cartItem.quantity }
                      },transaction: t});
          const updatedStock = await Stock.findOne({
            where: {
              product_id: cartItem.productId
            }
          });
          const itemKey = getItemKey(cartItem.productId);
          const result = await cache.hDel(cartKey, itemKey);
      };
    });

    let paymentData = req.body;
    paymentData.order_id = generateRandomDigits(7);
    paymentData.products = oldCart;    
    paymentData.payment = {};    
    paymentData.payment.card = paymentData.number;    
    paymentData.total_price  = paymentData.Subtotal; 
    console.log(paymentData);
    // result = sendOrder(paymentData, req.email);
    const newCart = await mapProduct2Cart(req);      
    res.json({data: newCart, notice : { message: 'SubmitCart successfully.' }})
    
  } catch (err) {
    res.status(500).json({error: {code: 500, detail: err.message}, notice : { message: 'Modify Product Failed' }});
  }
};