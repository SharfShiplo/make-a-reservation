import axios from 'axios';

const Axios = axios.create({
  baseURL: process.env.PUBLIC_REST_API_ENDPOINT,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Change response data/error here
Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export class HttpClient {
  static async get(url, params) {
    const response = await Axios.get(url, { params });
    return response.data;
  }

  static async post(url, data, options) {
    const response = await Axios.post(url, data, options);
    return response.data;
  }
}
