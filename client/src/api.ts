import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.DEV ? '/api/movies' : 'https://your-production-url.com/api/movies',
});

export default api;