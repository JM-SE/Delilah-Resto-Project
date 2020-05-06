const express = require('express');
const viewsController = require('./controllers/viewsController');
const authController = require('./controllers/authController');

const router = express.Router();

router.use(authController.isLoggedIn);

router.get('/', viewsController.getLogIn);
router.get('/signup', viewsController.getSignUp);
router.get('/cart', authController.protect, viewsController.getCart);
router.get('/menu', authController.protect, viewsController.getMenu);
router.get('/order', authController.protect, viewsController.getOrder);
router.get('/user', authController.protect, viewsController.getUser);
router.get(
    '/admin',
    authController.protect,
    authController.allowAdmin(),
    viewsController.getAdminPage
);
router.get(
    '/users',
    authController.protect,
    authController.allowAdmin(),
    viewsController.getUsersPage
);
router.get(
    '/create-product',
    authController.protect,
    authController.allowAdmin(),
    viewsController.getCreateProduct
);

module.exports = router;
