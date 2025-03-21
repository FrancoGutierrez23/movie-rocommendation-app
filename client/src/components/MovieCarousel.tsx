import { useState, useEffect } from 'react';
import Movie from './Movie';
import { Movie as MovieType } from '../types/Movie';
import { MovieQueue } from '../utils/MovieQueue';

// Create a movieQueue that holds movie objects
const movieQueue = new MovieQueue<MovieType>();

// Dummy initial recommendations based on TMDB's movie object structure
const initialRecommendations: MovieType[] = [
  {
    id: 111,
    title: 'Movie A',
    poster_path: '/posterA.jpg',
    vote_average: 7.5,
  },
  {
    id: 222,
    title: 'Movie B',
    poster_path: '/posterB.jpg',
    vote_average: 8.1,
  },
  {
    id: 333,
    title: 'Movie C',
    poster_path: '/posterC.jpg',
    vote_average: 6.9,
  },
  {
    id: 444,
    title: 'Movie D',
    poster_path: '/posterD.jpg',
    vote_average: 7.2,
  },
];

// Enqueue the initial recommendations
initialRecommendations.forEach(movie => movieQueue.enqueue(movie));

const MovieCarousel = () => {
  // currentMovie holds the currently displayed movie
  const [currentMovie, setCurrentMovie] = useState<MovieType | undefined>(movieQueue.peek());
  // history holds movies that have been shown previously, for the "Previous" button
  const [history, setHistory] = useState<MovieType[]>([]);

  // Automatically cycle recommendations every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentMovie]);

  const handleNext = () => {
    if (currentMovie) {
      // Save the current movie into history
      setHistory(prev => [...prev, currentMovie]);
    }
    // Dequeue next movie
    const next = movieQueue.dequeue();
    if (next) {
      setCurrentMovie(next);
    } else {
      setCurrentMovie(initialRecommendations[0]);
    }
  };

  const handlePrevious = () => {
    if (history.length > 0) {
      // Get the last movie from history
      const previous = history[history.length - 1];
      // Remove it from history
      setHistory(history.slice(0, history.length - 1));
      // Optionally, you could re-add the current movie back into the queue here
      setCurrentMovie(previous);
    }
  };

  return (
    <div className="mt-4">
      <h2>Movie Recommendation</h2>
      {currentMovie ? (
        <Movie movie={currentMovie} />
      ) : (
        <p>No recommendation available</p>
      )}
      <div className="mt-2 flex gap-2">
        <button 
          onClick={handlePrevious} 
          className="bg-gray-500 text-white p-1 rounded"
          disabled={history.length === 0}
        >
          Previous Recommendation
        </button>
        <button 
          onClick={handleNext} 
          className="bg-blue-500 text-white p-1 rounded"
        >
          Next Recommendation
        </button>
      </div>
    </div>
  );
};

export default MovieCarousel;
