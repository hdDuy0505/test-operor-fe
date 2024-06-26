import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.NEXT_APP_API_URL,
    timeout: 1000,
    headers: { 'Content-Type': 'application/json' },
});

export default instance;
