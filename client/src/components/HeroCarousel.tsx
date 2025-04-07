import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { Movie as MovieType } from '../types/Movie';
import shuffleMovies from '../utils/componentsFunctions';
import Hero from './Hero';

const HeroCarousel: React.FC = () => {
  const { byId, allIds, loading, error } = useSelector(
    (state: RootState) => state.movies
  );

  // Convert movie IDs into a shuffled array of movie objects
  const unsortedMovies: MovieType[] = allIds.map((id) => byId[id]);
  const movies = shuffleMovies(unsortedMovies);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-change movie every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextMovie();
    }, 10000); // changed to 5s for demonstration
    return () => clearInterval(interval);
  }, []);

  // Show next movie
  const nextMovie = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === movies.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (loading) {
    return <div></div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  // Render Hero only if there are movies
  if (movies.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full h-auto">
      <Hero
        movie={movies[currentIndex]}
        onNext={() =>
          setCurrentIndex((prevIndex) =>
            prevIndex === movies.length - 1 ? 0 : prevIndex + 1
          )
        }
        onPrev={() =>
          setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? movies.length - 1 : prevIndex - 1
          )
        }
      />
    </div>
  );
};

export default HeroCarousel;
