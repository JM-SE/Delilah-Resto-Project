const express = require('express');
const authController = require('./controllers/authController');
const productController = require('./controllers/productController');
const cartController = require('./controllers/cartController');
const orderController = require('./controllers/orderController');

const router = express.Router();

//
// MENU ROUTES
router
    // Get All items (Allowed w/o auth), Create Item (Admin only)
    .get('/menu', productController.getAllProducts)
    .post(
        '/menu',
        authController.protect,
        authController.allowAdmin(),
        productController.createProduct
    )
    // Get All items (Allowed w/o auth), Update Item (Admin only) & Delete Item (Admin only)
    .get('/menu/:id', productController.getProduct)
    .put(
        '/menu/:id',
        authController.protect,
        authController.allowAdmin(),
        productController.updateProduct
    )
    .delete(
        '/menu/:id',
        authController.protect,
        authController.allowAdmin(),
        productController.deleteProduct
    );

//
// USER ROUTES
// Signup User, Login User, Delete User (Admin only)
router
    .get(
        '/user/:id',
        authController.protect,
        authController.allowAdmin(),
        authController.getUser
    )
    .post('/signup', authController.signup)
    .post('/login', authController.login)
    .get('/logout', authController.protect, authController.logout)
    .delete('/user/:id', authController.protect, authController.userDelete)
    .put('/user/:id', authController.protect, authController.userUpdate);

//
// CART ROUTES
// Get Cart, Add Product, Delete Product
router
    .get('/cart', authController.protect, cartController.findCart)
    .post('/cart/:id', authController.protect, cartController.addProduct)
    .delete('/cart/:id', authController.protect, cartController.deleteProduct);

//
// ORDER ROUTES
// User Get Order, Get All Orders (Admin), Create Order, Delete Order, Order Status (Admin only), Status Order
router
    .get('/order', authController.protect, orderController.getOrders)
    .get(
        '/order/all',
        authController.protect,
        authController.allowAdmin(),
        orderController.getAllOrders
    )
    .post('/order', authController.protect, orderController.addOrder)
    .delete(
        '/order/admin/:id',
        authController.protect,
        authController.allowAdmin(),
        orderController.cancelOrderAdmin
    )
    .delete('/order/:id', authController.protect, orderController.cancelOrder)
    .patch(
        '/order/status/:id',
        authController.protect,
        authController.allowAdmin(),
        orderController.setOrderStatus
    )
    .get(
        '/order/status/:id',
        authController.protect,
        orderController.orderStatus
    );

//
//
module.exports = router;
