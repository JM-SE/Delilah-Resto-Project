/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const addProductCart = async (productId) => {
    try {
        const res = await axios({
            method: 'POST',
            url: `http://localhost:5000/api/v1/cart/${productId}`,
        });

        if (res.data.status === 'success') {
            location.reload(true);
        }
    } catch (err) {
        showAlert('fail', 'FAIL');
    }
};

export const removeProductCart = async (productId) => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: `http://localhost:5000/api/v1/cart/${productId}`,
        });

        if (res.data.status === 'success') {
            location.reload(true);
        }
    } catch (err) {
        showAlert('fail', 'FAIL');
    }
};

let paymentMethod;

export const checkout = async () => {
    try {
        const res = await axios({
            method: 'POST',
            url: `http://localhost:5000/api/v1/order`,
            data: { paymentMethod: paymentMethod },
        });

        if (res.data.status === 'success') {
            showAlert('success', 'ORDER CONFIRMED');
            setTimeout(() => location.assign('order'), 1000);
        }
    } catch (err) {
        showAlert('fail', 'FAIL');
    }
};

export const checkPayment = async (payMethod) => {
    paymentMethod = payMethod;
};
