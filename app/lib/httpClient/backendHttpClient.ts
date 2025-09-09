import axios from 'axios';

const backendHttpClient = axios.create({
    baseURL: process.env.BACKEND_URL,
    timeout: 10000
});

console.log('env',process.env.BACKEND_URL)

export default backendHttpClient;
