const Product = require('../models/product');

exports.getAllProducts = (req, res) => {
    Product.findAll()
        .then((products) => {
            const allProducts = [];
            products.forEach((product) => {
                allProducts.push(product.dataValues);
            });
            res.status(200).json({
                status: 'success',
                data: allProducts,
            });
        })
        .catch((err) => console.log(err));
};

exports.getProduct = (req, res) => {
    const { id } = req.params;

    Product.findByPk(id)
        .then((product) => {
            if (product) {
                res.status(200).json({
                    status: 'success',
                    data: product,
                });
            } else {
                res.status(400).json({
                    status: 'fail',
                    message: 'Product does not exist.',
                });
            }
        })
        .catch((err) => console.log(err));
};

exports.createProduct = (req, res) => {
    const newMenuItem = {
        name: req.body.name,
        price: req.body.price,
        nameRedux: req.body.nameRedux,
        img: req.body.img,
        imgThumb: req.body.imgThumb,
    };

    req.user
        .createProduct({
            name: newMenuItem.name,
            price: newMenuItem.price,
            nameRedux: newMenuItem.nameRedux,
            img: newMenuItem.img,
            imgThumb: newMenuItem.imgThumb,
        })
        .then(() => {
            console.log('Product created successfully.');
        })
        .catch((err) => console.log(err));

    res.status(201).json({
        status: 'success',
        data: newMenuItem,
    });
};

exports.updateProduct = (req, res) => {
    const { id } = req.params;

    const updatedProduct = {
        name: req.body.name,
        price: req.body.price,
        nameRedux: req.body.nameRedux,
        img: req.body.img,
        imgThumb: req.body.imgThumb,
    };

    Product.update(updatedProduct, { where: { id: id } })
        .then((_result) => {
            res.status(200).json({
                status: 'success',
                data: updatedProduct,
            });
        })
        .catch((err) => console.log(err));
};

exports.deleteProduct = (req, res) => {
    const { id } = req.params;

    Product.destroy({ where: { id: id } })
        .then((_result) => {
            console.log('Product deleted');

            res.status(200).json({
                status: 'success',
                data: null,
            });
        })
        .catch((err) => console.log(err));
};
