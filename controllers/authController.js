const { promisify } = require('util');
// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config({ path: `${__dirname}/.env` });
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Utility = require('../utility/utility');

exports.getUser = (req, res) => {
    const { id } = req.params;

    User.findByPk(id)
        .then((user) => {
            res.status(200).json({
                status: 'success',
                data: user,
            });
        })
        .catch((err) => console.log(err));
};

exports.signup = (req, res) => {
    bcrypt
        .hash(req.body.password, 12)
        .then(async (hashedPassword) => {
            const newUser = await User.create({
                username: req.body.username,
                password: hashedPassword,
                fullName: req.body.fullName,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
            });

            const token = Utility.signToken(newUser.id);

            res.cookie('jwt', token, {
                expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
                //secure: true,
                httpOnly: true,
            });

            const user = [newUser, token];

            return user;
        })
        .then((user) => {
            user[0].createCart();
            return user;
        })
        .then((user) => {
            res.status(201).json({
                status: 'success',
                token: user[1],
                data: {
                    createdUser: user[0],
                },
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({
                status: 'fail',
                message: 'User creation failed',
            });
        });
};

exports.login = (req, res) => {
    const { email, username, password } = req.body;

    if (email && password) {
        User.findAll({ where: { email: email } })
            .then((user) => {
                const userPassword = user[0].dataValues.password;
                const token = Utility.signToken(user[0].dataValues.id);

                res.cookie('jwt', token, {
                    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
                    //secure: true,
                    httpOnly: true,
                });

                Utility.checkPassword(
                    req,
                    res,
                    user,
                    token,
                    password,
                    userPassword
                );
            })
            .catch((err) =>
                res.status(404).json({
                    status: 'fail',
                    message: 'User does not exist.',
                    error: err,
                })
            );
    } else if (username && password) {
        User.findAll({ where: { username: username } })
            .then((user) => {
                const userPassword = user[0].dataValues.password;
                const token = Utility.signToken(user[0].dataValues.id);

                res.cookie('jwt', token, {
                    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
                    //secure: true,
                    httpOnly: true,
                });

                Utility.checkPassword(
                    req,
                    res,
                    user,
                    token,
                    password,
                    userPassword
                );
            })
            .catch((err) =>
                res.status(404).json({
                    status: 'fail',
                    message: 'User does not exist.',
                    error: err,
                })
            );
    } else {
        res.status(400).json({
            status: 'fail',
            mesage: 'Username, email or password missing.',
        });
    }
};

exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedOut', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    });
    res.status(200).json({ status: 'success' });
};

exports.userDelete = (req, res) => {
    User.destroy({ where: { id: req.params.id } })
        .then((result) => {
            res.status(200).json({
                status: 'success',
                message: 'User deleted.',
            });
        })
        .catch((err) => console.log(err));
};

exports.protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }

    if (!token) {
        res.status(401).json({
            status: 'fail',
            message: 'Token not found.',
        });
        return next();
    }

    const decoded = await promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET_KEY
    );

    const newLogUser = await User.findByPk(decoded.id);
    if (!newLogUser) {
        return next(
            res.status(410).json({
                status: 'fail',
                message: 'User no longer exist.',
            })
        );
    }
    req.user = newLogUser;
    next();
};

exports.isLoggedIn = async (req, res, next) => {
    if (req.cookies.jwt) {
        try {
            const decoded = await promisify(jwt.verify)(
                req.cookies.jwt,
                process.env.JWT_SECRET_KEY
            );

            const newLogUser = await User.findByPk(decoded.id);
            if (!newLogUser) {
                return next();
            }

            res.locals.user = newLogUser;
            return next();
        } catch (err) {
            return next();
        }
    }
    next();
};

exports.allowAdmin = () => {
    return (req, res, next) => {
        if (req.user.isAdmin === 1) {
            next();
        } else {
            res.status(403).json({
                status: 'fail',
                message: 'Not permitted to perform',
            });
        }
    };
};

exports.userUpdate = async (req, res) => {
    try {
        const { id } = req.params;

        const password = await bcrypt.hash(req.body.password, 12);

        const updatedUser = {
            username: req.body.username,
            password: password,
            fullName: req.body.fullName,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
        };

        User.update(updatedUser, { where: { id: id } })
            .then((_result) => {
                res.status(200).json({
                    status: 'success',
                    data: updatedUser,
                });
            })
            .catch((err) => console.log(err));
    } catch (err) {
        console.log(err);
    }
};
