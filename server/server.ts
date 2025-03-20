import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import { AxiosError } from 'axios';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/movies', async (req, res) => {
  const { query } = req.query;

  try {
    const tmdbUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${query}`;
    const response = await axios.get(tmdbUrl);
    res.json(response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error('Axios error:', error.response?.data || error.message);
      res.status(error.response?.status || 500).json({ error: 'Failed to fetch movies' });
    } else if (error instanceof Error) {
      console.error('Unexpected error:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      console.error('Unknown error:', error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
