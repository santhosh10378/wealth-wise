import axios from 'axios';

const API_DOMAIN = 'http://localhost:3000';
const baseURL = `${API_DOMAIN}/api`;

export const apiClient = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => {
    console.log(`Response:`, response);

    return response;
  },
  (error) => {
    if (error.response) {
      console.log('Response Error:', error.response);
      return Promise.reject(error.response.data);
    } else {
      console.log('Network Error:', error.message);
      return Promise.reject(error);
    }
  }
);
