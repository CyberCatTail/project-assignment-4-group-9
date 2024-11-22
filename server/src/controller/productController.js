const { Product, Stock } = require("@model/product");
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
    .catch((err) => res.status(500).json({error: {code: 500, detail: err.message}, data : { message: 'Please Try again' }}));
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
    .catch((err) => res.status(500).json({error: {code: 500, detail: err.message}, data : { message: 'Please Try again' }}));
};


exports.updateProduct = async (req, res) => {
  const pk = req.params.id;
  const updatedData = req.body;

  Product.update(updatedData, {
    where: { product_id: pk },
  })
    .then(([updatedRowCount]) => {
      if (updatedRowCount > 0) {
        res.status(200).json({data : { message: 'Product updated successfully.' }});
      } else {
        res.status(404).json({error: {code: 404, detail: 'Product not found'}, data : { message: 'Product not found' }});
      }
    })
    .catch((err) => res.status(500).json({error: {code: 500, detail: err.message}, data : { message: 'Please Try again' }}));
};