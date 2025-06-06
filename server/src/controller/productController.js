const { Product, Stock } = require("@model/product");
const {db} = require('@root/db');
const { Op } = require('sequelize');


exports.getProductById = (req, res) => {
  const pk = req.params.id;

  Product.findByPk(pk, {
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [{
      model: Stock,
      as: "stock",
      attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'product_id'] },
    }],
  })
    .then((product) => {
      if (!product) {
        res.json({error: {code: 404, detail: `can not find product ${pk}`}});
        return
      }
      let imgs = Array.from({ length: 5 }, (_, i) => `https://localhost/img/${product.brand}/${i + 1}.jpg`);
      imgs.unshift(product.img)
      imgs = imgs.filter((item, index) => imgs.indexOf(item) === index);
      res.json({data: {...product.dataValues, imgs}});
    })
    .catch((err) => res.status(500).json({error: {code: 500, detail: err.message}, notice : { message: 'Please Try again' }}));
};

exports.getAllProducts = (req, res) => {
  const { category, brand, limit, offset, search } = req.query;

  const query = {};

  if (category) query.category = category;
  if (brand) query.brand = brand;

  Product.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [{
      model: Stock,
      as: "stock",
      attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'product_id'] },
    }],
    where: query,
    order: [['product_id', 'ASC']],
    limit: limit,
    offset: offset
  })
    .then((products) => {
      if (search && search.trim() !== "") {
        const keywords = search.trim().toLowerCase().split(/\s+/);
        products = products.filter(product =>
          keywords.every(keyword =>
            product.brand.toLowerCase().includes(keyword) ||
            product.model.toLowerCase().includes(keyword)
          )
        );
      }
      res.json({data: products});
    })
    .catch((err) => res.status(500).json({error: {code: 500, detail: err.message}, notice : { message: 'Please Try again' }}));
};

const updateProductWithStock = async (req, res) => {
  const updatedData = req.body;
  const pk = req.params.id;
  try {
    await db.transaction(async t => {
      await Product.update(updatedData, {
        where: { product_id: pk },
        transaction: t
      })
  
      await Stock.update({quantity: updatedData.stock.quantity}, {
        where: { product_id: pk },
        transaction: t
      })
      res.json({notice : { message: 'Product updated successfully.' }});
    });
  
  } catch (err) {
    res.status(500).json({error: {code: 500, detail: err.message}, notice : { message: 'Modify Product Failed' }});
  }
}

exports.updateProduct = async (req, res) => {
  const updatedData = req.body;
  if (updatedData.stock) {
    return await updateProductWithStock(req, res);
  }
  const pk = req.params.id;
  Product.update(updatedData, {
    where: { product_id: pk },
  })
    .then(([updatedRowCount]) => {
      if (updatedRowCount > 0) {
        res.status(200).json({notice : { message: 'Product updated successfully.' }});
      } else {
        res.status(404).json({error: {code: 404, detail: 'Product not found'}, notice : { message: 'Product not found' }});
      }
    })
    .catch((err) => res.status(500).json({error: {code: 500, detail: err.message}, notice : { message: 'Modify Product Failed' }}));
};

exports.createProduct = async (req, res) => {
  const data = req.body;
  Product.create(
    data,
    {
      include: [{ model: Stock, as: 'stock' } ],
    },
  ).then((product) => {
      if (product) {
        res.status(200).json({notice : { message: 'Product created successfully.' }});
      } else {
        res.status(400).json({error: {code: 400, detail: 'Request Error'}, notice : { message: 'Create Product Failed' }});
      }
    })
    .catch((err) => {
      res.status(500).json({error: {code: 500, detail: err.message}, notice : { message: 'Create Product Failed' }});
      });
};