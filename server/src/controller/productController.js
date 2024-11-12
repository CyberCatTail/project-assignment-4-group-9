const Product = require('@model/product');
exports.getProductById = (req, res) => {
    const pk = req.params.id;

    Product.findByPk(pk)
      .then(product => {
        if (!product) {
          return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
      })
      .catch(err => res.status(500).json({ error: err.message }));
  };

  exports.getAllProducts = (req, res) => {
    // mock
    Product.findAll()
      .then(products => {
        res.json(products);
      })
      .catch(err => res.status(500).json({ error: err.message }));
  }