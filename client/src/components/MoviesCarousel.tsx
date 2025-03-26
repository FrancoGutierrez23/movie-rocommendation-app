import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { Movie as MovieType } from '../types/Movie';
import Movie from './Movie';

interface MoviesCarouselProps {
  onMovieSelect: (movie: MovieType) => void;
  order: string;
}

const MoviesCarousel = ({ onMovieSelect, order }: MoviesCarouselProps) => {
  const { byId, allIds, loading, error } = useSelector((state: RootState) => state.movies);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Reconstruct the movies array from the normalized state
  const movies = allIds.map(id => byId[id]);

  let sortedMovies = [...movies];

  // Apply sorting based on the selected order
  if (order === 'title-asc') {
    sortedMovies.sort((a, b) => a.title.localeCompare(b.title));
  } else if (order === 'title-desc') {
    sortedMovies.sort((a, b) => b.title.localeCompare(a.title));
  } else if (order === 'rating-asc') {
    sortedMovies.sort((a, b) => (a.vote_average || 0) - (b.vote_average || 0));
  } else if (order === 'rating-desc') {
    sortedMovies.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
  }

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  if (loading) {
    return <div>Loading movies...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="relative">
      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-75 rounded-full p-2 shadow hover:bg-opacity-100"
        aria-label="Scroll left"
      >
        &#8249;
      </button>

      {/* Carousel */}
      <div
        ref={carouselRef}
        className="flex overflow-x-auto space-x-4 scroll-smooth py-4"
      >
        {sortedMovies.map(movie => (
          <div key={movie.id} className="flex-shrink-0">
            <Movie movie={movie} onSelect={onMovieSelect} />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-75 rounded-full p-2 shadow hover:bg-opacity-100"
        aria-label="Scroll right"
      >
        &#8250;
      </button>
    </div>
  );
};

export default MoviesCarousel;
