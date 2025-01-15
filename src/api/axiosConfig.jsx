import axios from 'axios';

// Retrieve base URL from environment variables or use default
const baseURL = import.meta.env.VITE_API_URL || 'https://localhost:8080';


// Create Axios instance
const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    // Bypass Ngrok's warning
    'Content-Type': 'application/json',  // Specify the content type
  },
  timeout: 5000, // Set a timeout for requests (optional)
});

// Add a response interceptor to log errors or handle them globally
apiClient.interceptors.response.use(
  response => response, // Return the response directly if no error
  error => {
    console.error('API Error:', error.message);
    // Optionally handle errors globally here
    return Promise.reject(error);
  }
);

export default apiClient;
