
// mock
const Product = {
    findByPk: (id) => {
        return new Promise((resolve, reject) => resolve({id: id}));
    }
}

module.exports = Product;