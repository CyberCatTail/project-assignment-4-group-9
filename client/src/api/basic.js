import { Cookies } from 'react-cookie';
import { toast } from "sonner"
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
    (response) => {
        if (response.data.notice) {
            toast.success(response.data.notice.message)
        }
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            window.dispatchEvent(new Event('show-login-card'));
        }
        if (error.response.data.notice) {
            toast.error(error.response.data.notice.message)
        }
        return Promise.reject(error);
    }
);
