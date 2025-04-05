import { useRef, useState, useEffect, useMemo } from 'react';
import { Movie as MovieType } from '../types/Movie';
import Movie from './Movie';

interface ReusableMoviesCarouselProps {
  movies: MovieType[];
}

const ReusableMoviesCarousel: React.FC<ReusableMoviesCarouselProps> = ({ movies }) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  
  // Duplicate movies three times so the "real" movies are in the middle block.
  const extendedMovies = useMemo(() => {
    // Use a unique key by appending the copy index
    return [...movies, ...movies, ...movies].map((movie, index) => ({
      ...movie,
      key: `${movie.id}-${index}`,
    }));
  }, [movies]);
  
  // Start at the beginning of the middle block.
  const moviesLength = movies.length;
  const [currentIndex, setCurrentIndex] = useState(moviesLength);

  // Function to center the movie element.
  const scrollToMovie = (index: number, behavior: ScrollBehavior = 'smooth') => {
    if (carouselRef.current && carouselRef.current.children[index]) {
      const element = carouselRef.current.children[index] as HTMLElement;
      const containerWidth = carouselRef.current.offsetWidth;
      const elementWidth = element.offsetWidth;
      const scrollLeft = element.offsetLeft - (containerWidth / 2 - elementWidth / 2);
      carouselRef.current.scrollTo({ left: scrollLeft, behavior });
    }
  };

  // On mount, immediately scroll to the center of the middle block.
  useEffect(() => {
    scrollToMovie(currentIndex, 'auto');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carouselRef]);

  // Whenever currentIndex changes, scroll to center that movie.
  // Then, if we've moved out of the middle block, adjust the index (without animation)
  useEffect(() => {
    if (!carouselRef.current) return;
    // If currentIndex is out of the middle block, reposition it.
    let newIndex = currentIndex;
    if (currentIndex < moviesLength) {
      newIndex = currentIndex + moviesLength;
      scrollToMovie(newIndex, 'auto');
      setCurrentIndex(newIndex);
      return;
    } else if (currentIndex >= moviesLength * 2) {
      newIndex = currentIndex - moviesLength;
      scrollToMovie(newIndex, 'auto');
      setCurrentIndex(newIndex);
      return;
    }
    // Otherwise, scroll normally.
    scrollToMovie(currentIndex, 'smooth');
  }, [currentIndex, moviesLength]);

  // Handlers for arrow navigation
  const handlePrev = () => {
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <div className="carousel-wrapper" style={{ position: 'relative' }}>
      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 rounded-full text-5xl
          h-full pb-22 hover:scale-105 transition cursor-pointer p-2 shadow hover:bg-opacity-100"
        aria-label="Scroll left"
      >
        &lsaquo;
      </button>

      {/* Carousel Container */}
      <div
        ref={carouselRef}
        className="carousel-container mask-fade-x"
        style={{
          display: 'flex',
          overflowX: 'hidden',
          scrollSnapType: 'x mandatory',
          padding: '1rem 0',
        }}
      >
        {extendedMovies.map((movie) => (
          <div
            key={movie.key}
            className="carousel-item"
            style={{
              flexShrink: 0,
              scrollSnapAlign: 'center',
              width: '300px',
              margin: '0 0.5rem'
            }}
          >
            <Movie movie={movie} />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 rounded-full text-5xl 
          h-full pb-22 hover:scale-105 transition cursor-pointer p-2 shadow hover:bg-opacity-100"
        aria-label="Scroll right"
      >
        &#8250;
      </button>
    </div>
  );
};

export default ReusableMoviesCarousel;
