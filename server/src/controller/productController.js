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
    limit: limit,
    offset: offset
  })
    .then((products) => {
      res.json({data: products});
    })
    .catch((err) => res.status(500).json({error: {code: 500, detail: err.message}, data : { message: 'Please Try again' }}));
};
