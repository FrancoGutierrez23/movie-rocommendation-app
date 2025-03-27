import { Movie as MovieType } from '../types/Movie';
import { useDispatch } from 'react-redux';
import { openModal } from '../redux/modal/modalSlice';

interface MovieProps {
  movie: MovieType;
  onSelect?: (movie: MovieType) => void;
}

const Movie: React.FC<MovieProps> = ({ movie, onSelect }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(openModal(movie.id));
    onSelect?.(movie);
  };

  const posterUrl =
    movie.backdrop_path && movie.backdrop_path.length > 9
      ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
      : `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <div
      className="movie-item cursor-pointer w-[30vw] relative group hover:scale-105 transition"
      onClick={handleClick}
    >
      {/* Image container with hover effect */}
      <div className="relative w-full h-0 pb-[56.25%] overflow-hidden">
        <img
          src={posterUrl}
          alt={movie.title}
          className="absolute rounded-sm top-0 left-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-40"
        />
        {/* Title shown on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-70 transition-opacity duration-300">
          <h3 className="text-white text-lg font-bold text-center">{movie.title}</h3>
        </div>
      </div>

      {/* Overview preview shown on hover */}
      {movie.overview && (
        <p className="text-sm text-gray-600 line-clamp-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {movie.overview}
        </p>
      )}
    </div>
  );
};

export default Movie;