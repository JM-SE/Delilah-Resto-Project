const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('user', {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        len: [4, 10],
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        len: [8, 50],
    },
    fullName: {
        type: Sequelize.STRING,
        allowNull: false,
        isAlpha: true,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        isEmail: true,
        isLowercase: true,
    },
    phone: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        isNumeric: true,
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    isAdmin: {
        type: Sequelize.INTEGER,
    },
});

module.exports = User;
