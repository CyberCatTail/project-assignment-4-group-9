
// mock
const Product = {
    findByPk: (id) => {
        return new Promise((resolve, reject) => resolve({id: id, productItemName: 'Mock'}));
    },

    findAll: () => {
        return new Promise((resolve, reject) => resolve([{id: 1, productItemName: 'Mock'}]));
    }
}

module.exports = Product;