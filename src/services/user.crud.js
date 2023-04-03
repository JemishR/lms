import axios from 'axios';
import { API_URL } from './../Constants';

export function register(bodyFormData) {
    return axios.post(`${API_URL}register`, bodyFormData);
}

export function login(bodyFormData) {
    return axios.post(`${API_URL}login`, bodyFormData);
}