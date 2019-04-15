import axios from 'axios';
import interceptors from './interceptors';

const http = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    timeout: 10000
});

interceptors(http);

export function setToken(token: string) {
    http.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export default http;
