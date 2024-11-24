require('module-alias/register')
const { db, testDBConnection } = require("@root/db");
const { Product, Stock } = require('@model/product');
const { User } = require('@model/user');

const importCsv = async (filePath, csvop = {}) => {
  const csv = require("csvtojson");
  return await csv(csvop)
    .fromFile(filePath)
};

async function initdb() {
  if (!(await testDBConnection())) {
    process.exit(1);
  }
  await db
    .sync({ force: true })
    .then(() => {
      console.log("All tables have been created successfully.");
    })
}

async function importProduct() {
  const csvop =
  {
    colParser: {
      "price": "number",
    },
  }
  const products = await importCsv(__dirname + "/laptop.csv", csvop);
  console.log("get product rows:" + products.length);
  products.forEach(product => {
    const randomNumber = Math.ceil(Math.random() * 5);
    product.img = `https://localhost/img/${product.brand}/${randomNumber}.jpg`;
  });
  await Product.bulkCreate(products);
  console.log("Product CSV file successfully imported into the database!");
}

async function importStock() {
  const stocks = await importCsv(__dirname + "/stock.csv");
  console.log("get stocks rows:" + stocks.length);
  await Stock.bulkCreate(stocks);
  console.log("Stock CSV file successfully imported into the database!");
}

async function createUser() {
  await User.create({
    email: 'admin@beastbuy.com',
    password: 'admin',
    role: 1
    });
  console.log("successfully create admin!");
}

initdb().then(importProduct).then(importStock).then(createUser)


