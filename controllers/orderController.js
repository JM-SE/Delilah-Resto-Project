const Order = require('../models/order');
const Utility = require('../utility/utility');

exports.addOrder = (req, res) => {
    let fetchedCart;
    req.user
        .getCart()
        .then((cart) => {
            fetchedCart = cart;
            return cart.getProducts();
        })
        .then((products) => {
            if (products.length > 0) {
                req.user
                    .createOrder()
                    .then((order) => {
                        const newOrderStatus = { status: 0 };
                        const paymentMethod = {
                            paymentMethod: req.body.paymentMethod,
                        };

                        Order.update(newOrderStatus, {
                            where: { id: order.id },
                        })
                            .then((_result) => {
                                console.log(
                                    '\x1b[35m',
                                    'Order Status: 0 (New)'
                                );
                            })
                            .catch((err) => console.log(err));

                        Order.update(paymentMethod, { where: { id: order.id } })
                            .then((_result) => {
                                console.log(
                                    '\x1b[35m',
                                    `Payment Method: ${
                                        paymentMethod.paymentMethod
                                    } (${Utility.paymentMethod(
                                        paymentMethod.paymentMethod
                                    )})`
                                );
                            })
                            .catch((err) => console.log(err));

                        return order.addProducts(
                            products.map((product) => {
                                product.orderItem = {
                                    quantity:
                                        product.dataValues.cartItem.dataValues
                                            .quantity,
                                };
                                return product;
                            })
                        );
                    })
                    .then((_result) => {
                        fetchedCart.setProducts(null);
                    })
                    .catch((err) => console.log(err));
            } else {
                res.status(400).json({
                    status: 'fail',
                    message: 'No products in cart.',
                });
            }
            return products;
        })
        .then((products) => {
            res.status(200).json({
                status: 'success',
                newOrder: products,
            });
        })
        .catch((err) => console.log(err));
};

exports.getOrders = (req, res) => {
    req.user.getOrders({ include: ['products'] }).then((orders) => {
        res.status(200).json({
            status: 'success',
            data: orders,
        });
    });
};

exports.getAllOrders = (_req, res) => {
    Order.findAll({ include: ['products'] })
        .then((orders) => {
            const shortOrders = orders.map((order) => {
                let prodsStr;
                order.products.forEach((product) => {
                    prodsStr += ` ${product.orderItem.quantity}x${product.nameRedux}`;
                    return prodsStr;
                });
                return prodsStr.replace('undefined', ' ').trim();
            });

            res.status(200).json({
                status: 'success',
                orderShort: shortOrders,
                data: orders,
            });
        })
        .catch((err) => console.log(err));
};

exports.cancelOrderAdmin = (req, res) => {
    const { id } = req.params;

    Order.destroy({ where: { id: id } })
        .then((_result) => {
            res.status(204).json({
                status: 'success',
                data: null,
            });
        })
        .catch((err) => console.log(err));
};

exports.cancelOrder = (req, res) => {
    const { id } = req.params;

    req.user.getOrders({ where: { id: id } }).then((order) => {
        Order.destroy({ where: { id: order[0].id } })
            .then((_result) => {
                res.status(200).json({
                    status: 'success',
                    data: null,
                });
            })
            .catch((err) => console.log(err));
    });
};

exports.setOrderStatus = (req, res) => {
    const orderId = req.params.id;
    const newOrderStatus = { status: req.body.status };

    Order.findByPk(orderId).then((order) => {
        if (order.status !== newOrderStatus.status) {
            Order.update(newOrderStatus, { where: { id: orderId } })
                .then((_result) => {
                    res.status(200).json({
                        status: 'success',
                        orderStatus: `Order Status: ${
                            newOrderStatus.status
                        } (${Utility.statusName(newOrderStatus.status)})`,
                    });
                })
                .catch((err) => console.log(err));
        } else if (order.status === newOrderStatus.status) {
            res.status(400).json({
                status: 'fail',
                message: 'Selected status is already set.',
            });
        }
    });
};

exports.orderStatus = (req, res) => {
    const { id } = req.params;

    req.user.getOrders({ where: { id: id } }).then((order) => {
        res.status(200).json({
            status: 'success',
            orderStatus: order[0].status,
            msg: `Order Status: ${order[0].status} (${Utility.statusName(
                order[0].status
            )})`,
        });
    });
};
