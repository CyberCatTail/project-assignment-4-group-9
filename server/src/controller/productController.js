const { Product, Stock } = require("@model/product");
const {db} = require('@root/db');


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

      res.json({data: product});
    })
    .catch((err) => res.status(500).json({error: {code: 500, detail: err.message}, notice : { message: 'Please Try again' }}));
};

exports.getAllProducts = (req, res) => {
  const limit = req.query.limit;
  const offset = req.query.offset;

  Product.findAll({
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: [{
      model: Stock,
      as: "stock",
      attributes: { exclude: ['createdAt', 'updatedAt', 'id', 'product_id'] },
    }],
    order: [['product_id', 'ASC']],
    limit: limit,
    offset: offset
  })
    .then((products) => {
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
    res.status(500).json({error: {code: 500, detail: err.message}, notice : { message: 'Please Try again' }});
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
    .catch((err) => res.status(500).json({error: {code: 500, detail: err.message}, notice : { message: 'Please Try again' }}));
};