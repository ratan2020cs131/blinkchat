import axios from 'axios';

const axiosInterceptor = axios.create({});

axiosInterceptor.interceptors.request.use((config) => {
    const token = window.sessionStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `${token}`;
    }
    return config;
})

export default axiosInterceptor;