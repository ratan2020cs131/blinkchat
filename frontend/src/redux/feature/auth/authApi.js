import axios from '@/utils/axiosInterceptor';
import { BASE_AUTH } from '@/utils/baseUrl';

const login = async (data) => {
    try {
        console.log('Login api data: ', data);
        const res = await axios.post(`${BASE_AUTH}/login`, data)
        console.log('Login api response: ', res.data);
        window.localStorage.setItem('token', res.data.token)
        return res.data;
    } catch (error) {
        console.log('Login api error: ', error.message);
    }
}

export default {
    login
}