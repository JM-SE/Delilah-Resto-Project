const Sequelize = require('sequelize');
const db = require('../config/database');

const Product = db.define('product', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    nameRedux: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    img: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    imgThumb: {
        type: Sequelize.STRING,
        allowNull: false,
    },
});

module.exports = Product;
