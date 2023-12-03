import axios from 'axios';

export const baseURL = 'http://localhost:5000/'
const instance = axios.create({
  baseURL: baseURL, // Replace with your API base URL
  timeout: 5000, // Adjust the timeout as needed
});

export default instance;