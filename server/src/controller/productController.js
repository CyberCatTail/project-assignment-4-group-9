const { Product, Stock } = require("@model/product");
exports.getProductById = (req, res) => {
  const pk = req.params.id;

  Product.findByPk(pk, {
    include: [{
      model: Stock,
      as: "stock",
    }],
  })
    .then((product) => {
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};

exports.getAllProducts = (req, res) => {
  const limit = req.params.limit;
  const offset = req.params.offset;
  Product.findAll({
    include: [{
      model: Stock,
      as: "stock",
    }],
    limit: limit,
    offset: offset
  })
    .then((products) => {
      res.json(products);
    })
    .catch((err) => res.status(500).json({ error: err.message }));
};
