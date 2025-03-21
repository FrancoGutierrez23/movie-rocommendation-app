import { Request, Response } from 'express';
import axios from 'axios';

const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Helper function to make API calls to TMDB
const fetchFromTMDB = async (url: string, params: object) => {
  try {
    const response = await axios.get(url, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
      params: { api_key: process.env.API_KEY, ...params },
    });
    return response.data;
  } catch (error) {
    console.error('TMDB API error:', error);
    throw error;
  }
};

// Controller for searching movies
export const searchMovies = async (req: Request, res: Response): Promise<void> => {
  const query = req.query.query as string;

  try {
    if (!query) {
      const data = await fetchFromTMDB(`${TMDB_BASE_URL}/movie/popular`, {});
      res.json(data);
      return;
    }
    const data = await fetchFromTMDB(`${TMDB_BASE_URL}/search/movie`, { query });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch search results' });
  }
};

// Controller for getting movie details
export const getMovieDetails = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const data = await fetchFromTMDB(`${TMDB_BASE_URL}/movie/${id}`, {});
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch movie details' });
  }
};

// Controller for getting related movies
export const getRelatedMovies = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const data = await fetchFromTMDB(`${TMDB_BASE_URL}/movie/${id}/similar`, {});
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch related movies' });
  }
};

// Controller for getting movie recommendations
export const getMovieRecommendations = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const data = await fetchFromTMDB(`${TMDB_BASE_URL}/movie/${id}/recommendations`, {});
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
};
