import { Movie as MovieType } from '../types/Movie';
import { useAppDispatch } from './hooks/hooks';
import { openModal } from '../redux/modal/modalSlice';

interface MovieProps {
  movie: MovieType;
}

const Movie: React.FC<MovieProps> = ({ movie }) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(openModal(movie.id));
  };

  const posterUrl =
    movie.backdrop_path && movie.backdrop_path.length > 9
      ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
      : `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  

  return (
    <div
      className="movie-item cursor-pointer relative group transition"
      onClick={handleClick}
    >
      {/* Image container */}
      <div className="relative w-full h-0 pb-[56.25%] overflow-hidden rounded-sm">
        <img
          src={posterUrl}
          alt={movie.title} 
          className="absolute hover:scale-105 rounded-sm top-0 left-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-40"
        />

        {/* Title: visible by default on mobile, only fades in on hover for sm+ */}
        <div className="absolute inset-0 flex items-center justify-center 
                    transition-opacity duration-300 bg-black/60">
          <h3 className="text-white text-lg font-bold text-center px-2">
            {movie.title}
          </h3>
        </div>
      </div>

      {/* Overview: same logic, always shown on mobile, hover on sm+ */}
      {movie.overview && (
        <p className="text-sm text-gray-100 line-clamp-3 mt-2
                  transition-opacity duration-300 z-20">
          {movie.overview}
        </p>
      )}
    </div>

  );
};

export default Movie;