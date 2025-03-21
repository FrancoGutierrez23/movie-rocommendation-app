import { useState, useEffect } from 'react';
import { MovieQueue } from '../utils/MovieQueues';

const movieQueue = new MovieQueue();
const initialRecommendations = ['111', '222', '333', '444'];
initialRecommendations.forEach(id => movieQueue.enqueue(id));

const MovieCarousel = () => {
  const [currentMovieId, setCurrentMovieId] = useState<string | undefined>(movieQueue.peek());

  useEffect(() => {
    const interval = setInterval(() => {
      movieQueue.dequeue();
      setCurrentMovieId(movieQueue.peek());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-4">
      <h2>Movie Recommendation</h2>
      <p>Current Movie ID: {currentMovieId}</p>
      <button onClick={() => {
        movieQueue.dequeue();
        setCurrentMovieId(movieQueue.peek());
      }} className="bg-blue-500 text-white p-1 rounded">
        Next Recommendation
      </button>
    </div>
  );
};

export default MovieCarousel;
