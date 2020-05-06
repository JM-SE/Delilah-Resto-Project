/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const signup = async (
    username,
    password,
    fullName,
    email,
    phone,
    address
) => {
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://localhost:5000/api/v1/signup',
            data: {
                username,
                password,
                fullName,
                email,
                phone,
                address,
            },
        });

        if (res.data.status === 'success') {
            showAlert('success', 'ACCOUNT CREATED');
            window.setTimeout(() => {
                location.assign('/menu');
            }, 1000);
        }
    } catch (err) {
        showAlert('fail', 'FAIL');
    }
};
