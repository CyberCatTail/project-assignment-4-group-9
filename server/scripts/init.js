require('module-alias/register')
const { db, testDBConnection } = require("@root/db");
const { Product, Stock } = require('@model/product');

const importCsv = async (filePath, csvop={}) => {
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
    .catch((error) => {
      console.error("Error creating tables:", error);
    });
}

async function importProduct() {
  const csvop = 
    {
        colParser:{
            "price":"number",
        },
    }
  try {
    const products = await importCsv(__dirname + "/laptop.csv", csvop);
    console.log("get product rows:" + products.length);
    await Product.bulkCreate(products);
    console.log("CSV file successfully imported into the database!");
  } catch (error) {
    console.error("Error importing CSV data:", error);
  }
}

async function importStock() {
try {
    const stocks = await importCsv(__dirname + "/stock.csv");
    console.log("get stocks rows:" + stocks.length);
    await Stock.bulkCreate(stocks);
    console.log("CSV file successfully imported into the database!");
} catch (error) {
    console.error("Error importing CSV data:", error);
}
}

initdb().then(importProduct).then(importStock)


