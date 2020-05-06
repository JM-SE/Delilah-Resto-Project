const Product = require('../models/product');
const Utility = require('../utility/utility');

exports.findCart = (req, res) => {
    req.user.getCart().then((cart) => {
        return cart
            .getProducts()
            .then((products) => {
                res.status(200).json({
                    msg: 'Ok',
                    data: products,
                    prodsTotal: Utility.cartTotalProducts(products),
                    priceTotal: Utility.cartTotalPrice(products),
                });
            })
            .catch((err) => console.log(err));
    });
};

exports.addProduct = (req, res) => {
    const prodId = req.params.id;
    console.log(req.params.id);
    let fetchedCart;
    let newQuantity = 1;

    req.user
        .getCart()
        .then((cart) => {
            fetchedCart = cart;
            return cart.getProducts({ where: { id: prodId } });
        })
        .then((products) => {
            let product;
            if (products.length > 0) {
                product = products[0];
            }
            if (product) {
                const oldQuantity = product.cartItem.quantity;
                newQuantity = oldQuantity + 1;
                return product;
            }
            return Product.findByPk(prodId);
        })
        .then((product) => {
            return fetchedCart.addProduct(product, {
                through: { quantity: newQuantity },
            });
        })
        .then((added) => {
            res.status(200).json({
                status: 'success',
                itemsAdded: added[0],
                totalCart: `Total Items for product ID #${prodId}: ${newQuantity}.`,
            });
        })
        .catch((err) => console.log(err));
};

exports.deleteProduct = (req, res) => {
    const { id } = req.params;

    req.user
        .getCart()
        .then((cart) => {
            return cart.getProducts({ where: { id: id } });
        })
        .then((products) => {
            const product = products[0];
            const oldQuantity = product.cartItem.quantity;
            let newQuantity;

            const reduceItem = () => {
                if (oldQuantity > 1) {
                    newQuantity = oldQuantity - 1;

                    req.user
                        .getCart()
                        .then((cart) => {
                            return cart.addProducts(product, {
                                through: { quantity: newQuantity },
                            });
                        })
                        .catch((err) => console.log(err));
                } else if (oldQuantity === 1) {
                    newQuantity = 0;
                    product.cartItem.destroy();
                }
            };

            return [reduceItem(), newQuantity];
        })
        .then((result) => {
            res.status(200).json({
                status: 'success',
                deleted: `Product ID #${id}. Updated quantity: ${result[1]}`,
            });
        })
        .catch((err) => console.log(err));
};
