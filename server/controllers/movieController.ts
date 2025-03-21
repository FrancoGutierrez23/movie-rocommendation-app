import { Request, Response } from 'express';
import axios from 'axios';
import { MovieGraph } from '../utils/movieGraph';

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

// Controller for getting related movies using a graph
export const getRelatedMovies = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    // Fetch related movies from TMDB
    const relatedData = await fetchFromTMDB(`/movie/${id}/similar`, { language: 'en-US', page: 1 });
    
    // Build a simple graph with the current movie and its related movies
    const graph = new MovieGraph();
    const currentMovieId = parseInt(id);
    const currentMovieTitle = `Movie ${id}`;
    graph.addMovie(currentMovieId, currentMovieTitle);

    relatedData.results.forEach((movie: any) => {
      graph.addMovie(movie.id, movie.title);
      graph.addEdge(currentMovieId, movie.id);
    });

    // Traverse the graph: for example, return all movies within 1 degree (directly related)
    const relatedMovies = graph.bfs(currentMovieId, 1);
    res.json({ relatedMovies: relatedMovies.map(movie => ({ id: movie.id, title: movie.title })) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch related movies' });
  }
};
