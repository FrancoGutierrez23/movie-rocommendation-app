import { useState } from 'react';

class MovieHistory {
  stack: string[] = [];

  push(movieTitle: string) {
    this.stack.push(movieTitle);
  }

  pop() {
    return this.stack.pop();
  }

  peek() {
    return this.stack[this.stack.length - 1];
  }
}

const MovieHistoryComponent = () => {
  const [movieHistory, setMovieHistory] = useState(new MovieHistory());
  const [currentMovie, setCurrentMovie] = useState<string | null>(null);

  const addMovieToHistory = (movieTitle: string) => {
    movieHistory.push(movieTitle);
    setCurrentMovie(movieTitle);
    // Force a re-render by cloning the movieHistory
    setMovieHistory(Object.assign(new MovieHistory(), movieHistory));
  };

  const goBackToPreviousMovie = () => {
    const previousMovie = movieHistory.pop();
    setCurrentMovie(previousMovie || null);
    setMovieHistory(Object.assign(new MovieHistory(), movieHistory));
  };

  return (
    <div>
      <h2>Current Movie: {currentMovie}</h2>
      <button onClick={() => addMovieToHistory('Inception')}>Watch Inception</button>
      <button onClick={goBackToPreviousMovie}>Go Back</button>
      <div>Last Watched Movie: {movieHistory.peek()}</div>
    </div>
  );
};

export default MovieHistoryComponent;
