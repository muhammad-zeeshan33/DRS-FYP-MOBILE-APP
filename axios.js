import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.137.11:5000',
});

export default instance;
