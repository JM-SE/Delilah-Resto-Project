const Sequelize = require('sequelize');
const db = require('../config/database');

const Order = db.define('order', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    status: {
        type: Sequelize.INTEGER,
    },
    paymentMethod: {
        type: Sequelize.INTEGER,
    },
});

module.exports = Order;
