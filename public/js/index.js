/* eslint-disable */
import '@babel/polyfill';
import { login, logout, deleteUserOwn, userUpdate } from './login';
import { signup } from './signup';
import {
    setOrderStatus,
    cancelOrder,
    createProduct,
    editProduct,
    deleteProduct,
    deleteUser,
} from './admin';
import {
    addProductCart,
    removeProductCart,
    checkout,
    checkPayment,
} from './cart';

//
// Dom Elements
const loginForm = document.querySelector('.login-form');
const signupForm = document.querySelector('.signup-form');
const logOutBtn = document.querySelector('.log-out-btn');
const updateUserForm = document.querySelector('.edit-user-form');
const addProductBtns = document.querySelectorAll('.add-product-btn');
const removeProductBtn = document.querySelectorAll('.remove-product-btn');
const checkoutBtn = document.getElementById('checkout');
const paymentMethod = document.getElementById('paymentMethod');
const orderStatus = document.querySelectorAll('#orderStatus');
const createProductForm = document.getElementById('createProductForm');
const editProductForm = document.getElementById('editProductForm');
const deleteProductAdmin = document.querySelectorAll('.delete-product-btn');
const cancelOrderBtn = document.getElementById('cancelOrder');
const deleteUserBtn = document.querySelectorAll('#deleteUserAdmin');
const deleteUserUser = document.getElementById('deleteUser');

//
// Listeners

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        login(username, password);
    });
}

if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('usernameSign').value;
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const password = document.getElementById('passwordSign').value;
        signup(username, password, fullName, email, phone, address);
    });
}

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (addProductBtns)
    addProductBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const productId = btn.value;

            addProductCart(productId);
        });
    });

if (removeProductBtn)
    removeProductBtn.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const productId = btn.value;

            removeProductCart(productId);
        });
    });

if (checkoutBtn)
    checkoutBtn.addEventListener('click', (e) => {
        const method = paymentMethod.options[paymentMethod.selectedIndex].value;
        checkPayment(method);
        checkout();
    });

if (orderStatus)
    orderStatus.forEach((s) => {
        s.addEventListener('change', (e) => {
            setOrderStatus(s.name, parseInt(s.value));
        });
    });

if (createProductForm) {
    createProductForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('productName').value;
        const price = document.getElementById('productPrice').value;
        const nameRedux = document.getElementById('productNameRedux').value;
        const img = document.getElementById('productImage').value;
        const imgThumb = document.getElementById('productImageThumb').value;

        createProduct(name, price, nameRedux, img, imgThumb);
    });
}

if (editProductForm) {
    editProductForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('editProductID').value;
        const name = document.getElementById('editProductName').value;
        const price = document.getElementById('editProductPrice').value;
        const nameRedux = document.getElementById('editProductNameRedux').value;
        const img = document.getElementById('editProductImage').value;
        const imgThumb = document.getElementById('editProductImageThumb').value;

        editProduct(id, name, price, nameRedux, img, imgThumb);
    });
}

if (deleteProductAdmin)
    deleteProductAdmin.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const productId = btn.value;
            deleteProduct(productId);
        });
    });

if (cancelOrderBtn)
    cancelOrderBtn.addEventListener('click', (e) => {
        const cancelOrderID = cancelOrderBtn.value;
        cancelOrder(cancelOrderID);
    });

if (deleteUserBtn)
    deleteUserBtn.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const userId = btn.value;
            deleteUser(userId);
        });
    });

if (deleteUserUser)
    deleteUserUser.addEventListener('click', (e) => {
        const userId = deleteUserUser.value;
        deleteUserOwn(userId);
    });

if (updateUserForm) {
    updateUserForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('updateUserBtn').value;
        const username = document.getElementById('usernameUpdate').value;
        const password = document.getElementById('passwordUpdate').value;
        const fullName = document.getElementById('fullNameUpdate').value;
        const email = document.getElementById('emailUpdate').value;
        const phone = document.getElementById('phoneUpdate').value;
        const address = document.getElementById('addressUpdate').value;
        userUpdate(id, username, password, fullName, email, phone, address);
    });
}
