import axios from 'axios';

// Create an Axios instance
const AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080/',
  headers: {
    'Content-Type': 'application/json',
  },
});




export default AxiosInstance;
