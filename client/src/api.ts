import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.DEV ? '/api/movies' : 'https://movie-recommendation-app-backend-nh2u.onrender.com',
});

export default api;