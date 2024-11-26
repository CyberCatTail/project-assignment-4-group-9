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
      return {"data": {}};
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
        // console.log(match);
        return { ...product, quantity: match.quantity, price: product.price/10.0};
        // return { ...product, quantity: match.quantity };
      }
      return product;
    });
    // res.json({data: data});
    return {"data": data};
};

exports.getCart = async (req, res) => {
  console.log("start getCart");
  const cartKey = getCartKey(req);
  console.log(cartKey);
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
    console.log(itemList);
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
    console.log(items);
    const data = items.map(product => {      
      const match = itemList.find(item => item.productId == product.product_id);
      console.log(match);
      if (match) {
        console.log(match);
        return { ...product, quantity: match.quantity };
      }
      return product;
    });
    console.log();
    res.json({data: data});
  } catch (err) {
    res.status(500).json({error: {code: 500, detail: err.message}, notice : { message: 'Please Try again' }});
  }
};

exports.addItem = async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(500).json({error: {code: 400, detail: "Missing required fields"}});
  }

  const cartKey = getCartKey(req);
  const itemKey = getItemKey(productId);
  try {
    await cache.hIncrBy(cartKey, itemKey, quantity);
    res.json({notice: { message: 'Item added to cart'}});
  } catch (err) {
    res.status(500).json({error: {code: 500, detail: err.message}, notice : { message: 'Please Try again' }});
  }
};

exports.UpdateQuantity = async (req, res) => {
  const { product_id, quantity} = req.body;
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
  // console.log(req.userId); 
  const cartKey = getCartKey(req);
  try {
      console.log("SubmitCart!!!!!!");
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
        console.log("itemList is none");
        res.json({notice : { message: 'Cart is empty.' }})
        return;// error to do
      }
      
      const oldCart = await mapProduct2Cart(req);       
      
      // const productIdList = itemList.map(v => v.productId);
      // console.log(itemList);

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
          console.log(updatedStock.dataValues);  
          const itemKey = getItemKey(cartItem.productId);
          const result = await cache.hDel(cartKey, itemKey);
      };
    });
    console.log("after transaction");
    // const newCart = await mapProduct2Cart(req); 
    // console.log(`oldCart:${newCart}`);

    // paymentCart = {card: 11};
    // console.log(req.body);
    console.log(oldCart)
    let paymentData = req.body;
    console.log(paymentData)
    const order_id = generateRandomDigits(7);
    console.log(order_id)
    paymentData.order_id = `req.userId_${order_id}`;
    console.log(paymentData.order_id )
    paymentData.products = oldCart.data;
    
    paymentData.payment = {};
    
    paymentData.payment.card = paymentData.number;    
    paymentData.total_price  = paymentData.Subtotal;
    console.log(paymentData )
    console.log(req.email)


    // order = {order_id: 1, total_price: 0, }
    result = sendOrder(paymentData, req.email);
    res.json({notice : { message: 'SubmitCart successfully.' }})
    
  } catch (err) {
    res.status(500).json({error: {code: 500, detail: err.message}, notice : { message: 'Modify Product Failed' }});
  }
};