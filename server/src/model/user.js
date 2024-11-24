const { DataTypes } = require('sequelize');
const {db} = require('@root/db');

const User = db.define('User', {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
  }, {
    tableName: 'users',
    timestamps: true,
  });


module.exports = { User };