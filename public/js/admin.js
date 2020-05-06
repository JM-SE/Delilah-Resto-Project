/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const setOrderStatus = async (id, status) => {
    try {
        const res = await axios({
            method: 'PATCH',
            url: `http://localhost:5000/api/v1/order/status/${id}`,
            data: { status: status },
        });

        if (status === 5) {
            cancelOrder(id);
        }

        if (res.data.status === 'success') {
            showAlert('success', 'ORDER STATUS CHANGED');
            location.reload(true);
        }
    } catch (err) {
        showAlert('fail', 'FAIL');
    }
};

export const cancelOrder = async (orderId) => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: `http://localhost:5000/api/v1/order/${orderId}`,
        });

        if (res.data.status === 'success') {
            location.reload(true);
        }
    } catch (err) {
        showAlert('fail', 'FAIL');
    }
};

export const createProduct = async (name, price, nameRedux, img, imgThumb) => {
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://localhost:5000/api/v1/menu',
            data: {
                name,
                price,
                nameRedux,
                img,
                imgThumb,
            },
        });

        if (res.data.status === 'success') {
            location.reload(true);
            showAlert('success', 'PRODUCT CREATED');
        }
    } catch (err) {
        showAlert('fail', 'FAIL');
    }
};

export const editProduct = async (
    id,
    name,
    price,
    nameRedux,
    img,
    imgThumb
) => {
    try {
        const res = await axios({
            method: 'PUT',
            url: `http://localhost:5000/api/v1/menu/${id}`,
            data: {
                name,
                price,
                nameRedux,
                img,
                imgThumb,
            },
        });

        if (res.data.status === 'success') {
            location.reload(true);
            showAlert('success', 'PRODUCT EDITED');
        }
    } catch (err) {
        showAlert('fail', 'FAIL');
    }
};

export const deleteProduct = async (productId) => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: `http://localhost:5000/api/v1/menu/${productId}`,
        });

        if (res.data.status === 'success') {
            location.reload(true);
            showAlert('success', 'PRODUCT DELETED');
        }
    } catch (err) {
        showAlert('fail', 'FAIL');
    }
};

export const deleteUser = async (userId) => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: `http://localhost:5000/api/v1/user/${userId}`,
        });

        if (res.data.status === 'success') {
            location.reload(true);
            showAlert('success', 'USER DELETED');
        }
    } catch (err) {
        showAlert('fail', 'FAIL');
    }
};
