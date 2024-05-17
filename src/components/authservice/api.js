import axios from 'axios';
import { useState } from 'react';
const baseURL=import.meta.env.VITE_BASE_URL
const api = axios.create({
  baseURL
  ,
    headers: {
    'Content-Type': 'application/json', 
  },
  withCredentials: true,
  // timeout:100000
});

export function useAxiosErrorHandler() {
  const [error, setError] = useState(null);

  api.interceptors.response.use(
    (response) => {
      console.log('Response received:', response.config.url);
      return response;
    },
    (error) => {
      if (error.response) {
        switch (error.response.status) {
          case 404:
            console.error('API endpoint not found!');
            break;
          case 500:
            console.error('Internal server error!');
            setError(error); // Set the error state to trigger rendering of error component
            break;
          default:
            console.error(error.response.data);
        }
      } else if (error.request) {
        console.error('Network error:', error.request);
      } else {
        console.error('Other error:', error.message);
      }
      return Promise.reject(error);
    }
  );

  return { error };
}

export default api;
