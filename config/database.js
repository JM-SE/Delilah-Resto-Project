const Sequelize = require('sequelize');
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config({ path: `${__dirname}/.env` });

const db = new Sequelize('delilah', process.env.DB_USER, process.env.DB_PASS, {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

db.authenticate()
    .then(() => {
        console.log(
            'Connection to database has been established successfully.'
        );
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = db;
