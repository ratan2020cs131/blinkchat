import axios from '@/utils/axiosInterceptor';
import { BASE_AUTH } from '@/utils/baseUrl';

const login = async (data) => {
    try {
        console.log('Login api data: ', data);
        const res = await axios.post(`${BASE_AUTH}/login`, data)
        console.log('Login api response: ', res.data);
        window.sessionStorage.setItem('token', res.data.token)
        return res.data;
    } catch (error) {
        console.log('Login api error: ', error.message);
    }
}

const signup = async (data) => {
    try {
        console.log('Signup api data: ', data);
        const res = await axios.post(`${BASE_AUTH}/signup`, data)
        console.log('Signup api response: ', res.data);
        window.sessionStorage.setItem('token', res.data.token)
        return res.data;
    } catch (error) {
        console.log('Signup api error: ', error.message);
    }
}

const profile = async () => {
    try {
        const res = await axios.get(`${BASE_AUTH}/profile`)
        console.log('Profile api response: ', res.data);
        return res.data;
    } catch (error) {
        console.log('Profile api error: ', error.message);
    }
}

export default {
    login,
    signup,
    profile
}