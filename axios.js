import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.18.17:5000',
});

export default instance;
