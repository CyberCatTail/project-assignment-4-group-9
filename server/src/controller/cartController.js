const { Product, Stock } = require("@model/product");
const { cache } = require('@root/db');

const getCartKey = (req) => {
  const userId = req.userId;
  return `cart_uid_${userId}:`;
}

const getItemKey = (productId) => {
  return `product:${productId}`;
}

exports.getCart = async (req, res) => {
  console.log("getCart start!");
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
      const match = itemList.find(item => item.productId === product.product_id);
      if (match) {
        return { ...product, quantity: match.quantity };
      }
      return product;
    });
    console.log(data);
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
  const { productId, quantity} = req.body;

  console.log(`productId:${productId}:quantity:${quantity}`);
  if (!productId || quantity<0) {
    console.log("quantity error!!");
    return res.status(500).json({error: {code: 400, detail: "Missing required fields"}});
  }

  const cartKey = getCartKey(req);
  const itemKey = getItemKey(productId);
  console.log(`cartKey:${cartKey}:itemKey:${itemKey}`);
  try {
    if (quantity>0){
      const result = await cache.hSet(cartKey, itemKey, quantity);
      // const cart = await cache.hGetAll(cartKey);
    }
    else{
      // console.log(`quantity:${quantity}`);
      // const cart_get = await cache.hGet(cartKey, itemKey);
      // const cart_get_all = await cache.hGetAll(cartKey);
      // console.log(cart_get_all);
      // console.log(cart_get);
      console.log(itemKey);
      const result = await cache.hDel(cartKey, itemKey);
      // const result = await cache.hDel(cartKey, 'product:5');
      console.log("hdel finish!");
        if (result === 1) {
            console.log(`Successfully deleted item ${itemKey} from cart ${cartKey}.`);
        } else {
            console.log(`Item ${itemKey} not found in cart ${cartKey}.`);
        }
    }
    const updatedCart = await exports.getCart(req, res); 
    console.log(updatedCart);
    // console.log();
    // console.log(updatedCart.data);
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({error: {code: 500, detail: err.message}, notice : { message: 'Please Try again' }});
  }
};

// exports.DeletItem = async (req, res) => {
//   const { productId, quantity} = req.body;

//   if (!productId || !quantity) {
//     return res.status(500).json({error: {code: 400, detail: "Missing required fields"}});
//   }

//   const cartKey = getCartKey(req);
//   const itemKey = getItemKey(productId);
//   try {
//     const result = await cache.hSet(cartKey, itemKey, quantity);
//     const cart = await cache.hGetAll(cartKey);
//     const updatedCart = await this.getCart(req, res); 
//     res.json(updatedCart);
//   } catch (err) {
//     res.status(500).json({error: {code: 500, detail: err.message}, notice : { message: 'Please Try again' }});
//   }
// };