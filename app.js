const express = require('express');
const path = require('path');

// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config({ path: `${__dirname}/.env` });
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const db = require('./config/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cartItem');
const Order = require('./models/order');
const OrderItem = require('./models/orderItem');
const authController = require('./controllers/authController');

const app = express();

app.use(cors());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//
// Show HTML Files
app.use(express.static(path.join(__dirname, '/public')));

//
// Logger
app.use(morgan('dev'));

//
// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//
// Render Routes
app.use('/', require('./viewRoutes.js'));

//
// API Routes
app.use('/api/v1/', require('./routes.js'));

//
// Relations // DELETE DUPLICATES
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, { through: OrderItem });

//
// Server
db.sync()
    .then((_res) => {
        const { PORT } = process.env;
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    })
    .then((_res) => {
        authController.adminCreation();
    })
    .catch((err) => {
        console.log(err);
    });
