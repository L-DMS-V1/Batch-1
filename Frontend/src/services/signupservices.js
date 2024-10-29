import axios from 'axios'
const BASE_URL = 'http://localhost:8080/api/users/signup';

export const listemployee = () => axios.get(BASE_URL);

export const Createemployee = () =>axios.post(BASE_URL,employee);