import { useState, useEffect } from 'react';
import { MovieHistoryStack } from '../utils/MovieHistoryStack';

interface NavigatorProps {
  currentMovieId: string;
}

const movieHistory = new MovieHistoryStack();

const MovieModalNavigator = ({ currentMovieId }: NavigatorProps) => {
  const [currentId, setCurrentId] = useState<string | null>(currentMovieId);

  // When a new movie is shown, push it onto the stack
  useEffect(() => {
    if (currentMovieId) {
      movieHistory.push(currentMovieId);
      setCurrentId(currentMovieId);
    }
  }, [currentMovieId]);

  const goBack = () => {
    movieHistory.pop();
    setCurrentId(movieHistory.peek() || null);
  };

  return (
    <div className="mt-4">
      <button onClick={goBack} className="bg-gray-300 p-1 rounded">
        Back
      </button>
      <div>Current Modal Movie ID: {currentId}</div>
    </div>
  );
};

export default MovieModalNavigator;
