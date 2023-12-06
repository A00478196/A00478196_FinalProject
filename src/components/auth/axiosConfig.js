import axios from 'axios';

export const baseURL = 'https://localhost:7006/'
//  export const baseURL = '/'

const instance = axios.create({
  baseURL: baseURL, // Replace with your API base URL
  // timeout: 5000, // Adjust the timeout as needed
});

export default instance;