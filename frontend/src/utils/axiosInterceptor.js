import axios from 'axios';

const axiosInterceptor = axios.create({});

axiosInterceptor.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `${token}`;
    }
    return config;
})