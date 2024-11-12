const { DataTypes } = require('sequelize');
const {db} = require('@root/db');

const Product = db.define('Product', {
    product_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    inches: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    screen_resolution: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpu: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ram: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    memory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gpu: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    op: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  }, {
    tableName: 'products',
    timestamps: true,
  });


  const Stock = db.define('Stock', {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    product_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'stocks',
    timestamps: true,
  });

Product.hasOne(Stock, { foreignKey: 'product_id', as: 'stock'});
Stock.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = { Product, Stock };