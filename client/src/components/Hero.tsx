// Hero.tsx
import React from 'react';
import { Movie as MovieType } from '../types/Movie';

interface HeroProps {
  movie: MovieType;
  onNext: () => void;
  onPrev: () => void;
}

const Hero: React.FC<HeroProps> = ({ movie, onNext, onPrev }) => {
  const posterUrl =
    movie.backdrop_path && movie.backdrop_path.length > 9
      ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
      : `https://image.tmdb.org/t/p/original${movie.poster_path}`;

  return (
    <div className="relative w-full h-[100vh] overflow-hidden">
      {/* Full-width background image */}
      <img
        src={posterUrl}
        alt={movie.title}
        className="w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
      />

      {/* Overlay for small screens: full black */}
      <div className="absolute inset-0 bg-black opacity-80 md:hidden"></div>

      {/* Overlay for md and up: gradient overlay */}
      <div
        className="hidden md:block absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0.9) 100%)',
        }}
      ></div>

      {/* Info container */}
      <div className="absolute right-0 inset-0 flex items-center p-4 w-full md:w-1/2 md:ml-[45vw] justify-center md:justify-end md:pr-8">
        <div className="text-white p-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-10">{movie.title}</h2>
          <p className="text-sm md:text-base max-w-md leading-relaxed line-clamp-8">
            {movie.overview}
          </p>
        </div>
      </div>

      {/* Left Arrow */}
      <button
        onClick={onPrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 
                   bg-black bg-opacity-50 hover:bg-opacity-75 text-4xl
                   rounded-full p-2 transition"
        aria-label="Previous movie"
      >
        &#8249;
      </button>

      {/* Right Arrow */}
      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 
                   bg-black bg-opacity-50 hover:bg-opacity-75 text-4xl
                   rounded-full p-2 transition"
        aria-label="Next movie"
      >
        &#8250;
      </button>
    </div>
  );
};

export default Hero;
