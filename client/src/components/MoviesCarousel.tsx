import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import SingleMovie from './SingleMovie';
import shuffleMovies from '../utils/componentsFunctions';

const MoviesCarousel = () => {
  const { byId, allIds, loading, error } = useSelector(
    (state: RootState) => state.movies
  );

  // Get and shuffle movies
  const unsortedMovies = allIds.map((id) => byId[id]);
  const movies = shuffleMovies(unsortedMovies);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-change movie every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextMovie();
    }, 500000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  // Show next movie
  const nextMovie = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === movies.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Show previous movie
  const prevMovie = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );
  };

  if (loading) {
    return <div>Loading movies...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  // Remove backgroundImage from this container
return (
  <div className="absolute left-0 w-full h-auto flex justify-center items-center rounded-sm">
    {/* Left Arrow */}
    <button
      onClick={prevMovie}
      className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-transparent 
      bg-opacity-75 rounded-full p-3 text-5xl  hover:bg-opacity-100 hover:scale-110 transition"
      aria-label="Previous movie"
    >
      &#8249;
    </button>

    {/* Movie Display */}
    {movies.length > 0 && (
      <div className="w-full">
        <SingleMovie movie={movies[currentIndex]} isModal={false} />
      </div>
    )}

    {/* Right Arrow */}
    <button
      onClick={nextMovie}
      className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-transparent 
      bg-opacity-75 rounded-full p-3 text-5xl hover:bg-opacity-100 hover:scale-110 transition"
      aria-label="Next movie"
    >
      &#8250;
    </button>
  </div>
);

};

export default MoviesCarousel;
