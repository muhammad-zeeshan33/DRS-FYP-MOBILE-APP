import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://10.113.21.145:5000',
});

export default instance;
