const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: '90d' });
};

exports.checkPassword = (req, res, user, token, password, userPassword) => {
    bcrypt
        .compare(password, userPassword)
        .then((isTrue) => {
            if (isTrue) {
                res.status(200).json({
                    status: 'success',
                    mesage: 'Logged In',
                    user: user,
                    token,
                });
            } else {
                res.status(400).json({
                    status: 'fail',
                    message: 'Password is incorrect.',
                });
            }
        })
        .catch((err) => console.log(err));
};

exports.statusName = (status) => {
    const statusNames = [
        'New',
        'Confirmed',
        'Preparing',
        'Delivering',
        'Delivered',
        'Cancelled',
    ];

    return statusNames[status];
};

exports.paymentMethod = (payment) => {
    const paymentNames = ['Cash', 'Credit Card'];

    return paymentNames[payment];
};

exports.cartTotalPrice = (cartProducts) => {
    let totalPrice = 0;

    cartProducts.forEach((product) => {
        const totalProdPrice = product.price * product.cartItem.quantity;
        totalPrice += totalProdPrice;
        return totalPrice;
    });

    return totalPrice;
};

exports.cartTotalProducts = (cartProducts) => {
    let totalPrpducts = 0;

    cartProducts.forEach((product) => {
        const totalProdQty = product.cartItem.quantity;
        totalPrpducts += totalProdQty;
        return totalPrpducts;
    });

    return totalPrpducts;
};

exports.orderCheck = async (req, res) => {
    const orders = await req.user.getOrders();

    let hasOrders;
    if (orders.length > 0) {
        hasOrders = 1;
        res.locals.order = 1;
    }
    return hasOrders;
};
