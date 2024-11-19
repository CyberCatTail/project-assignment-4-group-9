import { Cookies } from 'react-cookie';
const cookies = new Cookies()

import axios from 'axios';

export const apiInstance = axios.create({
    baseURL: '/api/v1',
    headers: {
        'Content-Type': 'application/json'
    }
});

apiInstance.interceptors.request.use(
    (config) => {
        const token = cookies.get('jwt');

        if (token) {
            config.headers['authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            window.dispatchEvent(new Event('show-login-card'));
        }
        return Promise.reject(error);
    }
);
