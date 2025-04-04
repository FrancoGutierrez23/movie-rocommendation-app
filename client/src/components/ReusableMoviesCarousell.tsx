import React, { useRef } from 'react';
import { Movie as MovieType } from '../types/Movie';
import Movie from './Movie';

interface ReusableMoviesCarouselProps {
  movies: MovieType[];
}

const ReusableMoviesCarousel: React.FC<ReusableMoviesCarouselProps> = ({ movies }) => {
  const carouselRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="relative">
      {/* Left Arrow */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 rounded-full text-5xl 
        h-full pb-[10%] hover:scale-105 transition cursor-pointer p-2 shadow hover:bg-opacity-100"
        aria-label="Scroll left"
      >
        &#8249;
      </button>

      {/* Carousel */}
      <div ref={carouselRef} className="flex space-x-4 mask-fade-x overflow-x-hidden scroll-smooth 
      py-4">
        {movies.map((movie) => (
          <div key={movie.id} className="flex-shrink-0">
            <Movie movie={movie} />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 rounded-full text-5xl 
        h-full pb-[10%] hover:scale-105 transition cursor-pointer p-2 shadow hover:bg-opacity-100"
        aria-label="Scroll right"
      >
        &#8250;
      </button>
    </div>
  );
};

export default ReusableMoviesCarousel;
