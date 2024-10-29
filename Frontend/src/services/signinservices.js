import axios from 'axios'
const BASE_URL = 'http://localhost:8080/api/users/signin';

export const listemployee = () => axios.get(BASE_URL);

export const Authemployee = () =>axios.post(BASE_URL,employee);