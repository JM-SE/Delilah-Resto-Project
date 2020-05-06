const Product = require('../models/product');
const Order = require('../models/order');
const User = require('../models/user');
const Utility = require('../utility/utility');

exports.getBase = async (req, res) => {
    res.status(200).render('base');
};

exports.getLogIn = async (req, res, next) => {
    res.status(200).render('login', {
        title: 'Log into your account',
    });
};

exports.getSignUp = async (req, res) => {
    res.status(200).render('signup');
};

exports.getCart = async (req, res, next) => {
    try {
        req.user.getCart().then((cart) => {
            return cart
                .getProducts()
                .then(async (products) => {
                    const prodsTotal = Utility.cartTotalProducts(products);
                    const priceTotal = Utility.cartTotalPrice(products);
                    const userOfCart = req.user.address;
                    const hasOrders = await Utility.orderCheck(req, res);

                    res.status(200).render('cart', {
                        title: 'Your Cart',
                        products,
                        prodsTotal,
                        priceTotal,
                        userOfCart,
                        hasOrders,
                    });
                })
                .catch((err) => console.log(err));
        });
    } catch (error) {
        console.error(error);
    }
};

exports.getMenu = async (req, res, next) => {
    try {
        const products = await Product.findAll();
        const cart = await req.user.getCart().then((fetchedCart) => {
            return fetchedCart.getProducts();
        });

        res.status(200).render('menu', {
            title: 'Our Menu',
            products,
            cart,
        });
    } catch (error) {
        console.error(error);
    }
};

exports.getOrder = async (req, res, next) => {
    try {
        const products = [];
        let paymentMethod;

        req.user.getOrders({ include: ['products'] }).then((orders) => {
            orders.forEach((order) => {
                products.push(order.products);
                // eslint-disable-next-line prefer-destructuring
                paymentMethod = order.paymentMethod;
            });

            let totalProducts = 0;
            let totalPrice = 0;

            products.forEach((orderProducts) => {
                orderProducts.forEach((product) => {
                    totalProducts += product.orderItem.quantity;
                    totalPrice += product.orderItem.quantity * product.price;
                });
            });

            res.status(200).render('order', {
                title: 'Your Order',
                orders,
                products,
                totalProducts,
                totalPrice,
                paymentMethod,
            });
        });
    } catch (error) {
        console.error(error);
    }
};

exports.getAdminPage = async (req, res) => {
    try {
        if (req.user.isAdmin === 1) {
            const orders = await Order.findAll({ include: ['products'] });

            orders.forEach((order) => {
                let totalPr = 0;
                order.products.forEach((product) => {
                    totalPr += product.orderItem.quantity * product.price;
                });
                order.totalPrice = totalPr;
            });

            const users = await User.findAll();

            res.status(200).render('admin', {
                title: 'Admin',
                orders,
                users,
            });
        }
    } catch (error) {
        console.error(error);
    }
};

exports.getCreateProduct = async (req, res) => {
    const products = await Product.findAll();

    res.status(200).render('create-product', {
        products,
    });
};

exports.getUsersPage = async (req, res) => {
    const users = await User.findAll();

    res.status(200).render('users', {
        users,
    });
};

exports.getUser = async (req, res) => {
    const user = await User.findByPk(req.user.id);

    res.status(200).render('user', {
        user,
    });
};
