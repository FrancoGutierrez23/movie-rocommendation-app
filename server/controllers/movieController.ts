import { Request, Response } from 'express';
import axios from 'axios';
import { MovieGraph } from '../utils/movieGraph';
import { PriorityQueue } from '../utils/PrioriryQueue';
import { movieGraphCache, updateMovieGraph } from '../utils/movieGraphCache';

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
    const data = await fetchFromTMDB(`/movie/${id}/recommendations`, { language: 'en-US', page: 1 });
    const queue = new PriorityQueue<any>();

    data.results.forEach((movie: any) => {
      // Calculate priority, e.g., based on vote_average or popularity
      const priority = movie.vote_average; // You can customize this calculation
      queue.enqueue(movie, priority);
    });

    // Collect the sorted movies
    const sortedRecommendations: any[] = [];
    while (!queue.isEmpty()) {
      const movie = queue.dequeue();
      if (movie) sortedRecommendations.push({ id: movie.id, title: movie.title, priority: movie.vote_average });
    }

    res.json({ recommendations: sortedRecommendations });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
};

// Controller for getting related movies using a graph
export const getRelatedMovies = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const currentMovieData = await fetchFromTMDB(`${TMDB_BASE_URL}/movie/${id}`, { language: 'en-US', page: 1 });
    const relatedData = await fetchFromTMDB(`${TMDB_BASE_URL}/movie/${id}/similar`, { language: 'en-US', page: 1 });
    
    // Update the global graph cache
    updateMovieGraph(currentMovieData, relatedData.results);
    
    // Traverse the cached graph (for example, one degree deep)
    const relatedMovies = movieGraphCache.bfs(parseInt(id), 1);
    
    res.json({ relatedMovies: relatedMovies.map(movie => ({ id: movie.id, title: movie.title })) });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch related movies' });
  }
};

// Controller for getting on theatres movies
export const getNowPlayingMovies = async (req: Request, res: Response): Promise<void> => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/now_playing?language=en-US&page=1`, {
      headers: {
        Accept: 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('TMDB API error:', error);
    throw error;
  }
}


// Controller for getting a list of movies ordered by popularity
export const getPopular = async (re: Request, res: Response): Promise<void> => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/popular?language=en-US&page=1`, {
      headers: {
        Accept: 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('TMDB API error:', error);
    throw error;
  }
}


// Controller for getting a list of movies ordered by rating
export const getTopRated = async (re: Request, res: Response): Promise<void> => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/top_rated?language=en-US&page=1`, {
      headers: {
        Accept: 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('TMDB API error:', error);
    throw error;
  }
}


// Controller for getting a list of movies that are being released soon
export const getUpcoming = async (re: Request, res: Response): Promise<void> => {
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/upcoming?language=en-US&page=1`, {
      headers: {
        Accept: 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('TMDB API error:', error);
    throw error;
  }
}