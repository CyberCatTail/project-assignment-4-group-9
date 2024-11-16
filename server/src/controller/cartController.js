const { Product, Stock } = require("@model/product");
const { cache } = require('@root/db');

const getCartKey = (req) => {
  const userId = req.session.userId;
  return `cart_uid_${userId}:`;
}

const getItemKey = (productId) => {
  return `product:${productId}`;
}

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
      res.json({data: {}});
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
    res.json({data: data});
  } catch (err) {
    res.status(500).json({error: {code: 500, detail: err.message}, data : { message: 'Please Try again' }});
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
    res.json({data: { message: 'Item added to cart'}});
  } catch (err) {
    res.status(500).json({error: {code: 500, detail: err.message}, data : { message: 'Please Try again' }});
  }
};