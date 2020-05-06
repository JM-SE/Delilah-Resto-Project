/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const login = async (username, password) => {
    try {
        const res = await axios({
            method: 'POST',
            url: 'http://localhost:5000/api/v1/login',
            data: {
                username,
                password,
            },
        });

        if (res.data.status === 'success') {
            showAlert('success', 'LOGGED IN');
            window.setTimeout(() => {
                location.assign('/menu');
            }, 1000);
        }
    } catch (err) {
        showAlert('fail', 'FAIL');
    }
};

export const logout = async () => {
    try {
        const res = await axios({
            method: 'GET',
            url: 'http://localhost:5000/api/v1/logout',
        });
        if (res.data.status === 'success') location.assign('/');
    } catch (err) {
        console.log(err);
    }
};

export const deleteUserOwn = async (userId) => {
    try {
        const res = await axios({
            method: 'DELETE',
            url: `http://localhost:5000/api/v1/user/${userId}`,
        });
        if (res.data.status === 'success') location.assign('/');
    } catch (err) {
        console.log(err);
    }
};

export const userUpdate = async (
    id,
    username,
    password,
    fullName,
    email,
    phone,
    address
) => {
    try {
        const res = await axios({
            method: 'PUT',
            url: `http://localhost:5000/api/v1/user/${id}`,
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
            showAlert('success', 'ACCOUNT UPDATED');
            location.reload(true);
        }
    } catch (err) {
        showAlert('fail', 'FAIL');
        console.log(err);
    }
};
