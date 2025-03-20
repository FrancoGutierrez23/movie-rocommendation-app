import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Example endpoint for fetching movie data from TMDB
app.get('/api/movies', async (req, res) => {
  const { query } = req.query; // Expecting a search query parameter

  try {
    const tmdbUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.TMDB_API_KEY}&query=${query}`;
    const response = await axios.get(tmdbUrl);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching movies:', error.message);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
