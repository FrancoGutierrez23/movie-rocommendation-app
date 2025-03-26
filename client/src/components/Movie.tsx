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
    // Instead of calling onSelect, you can dispatch openModal
    dispatch(openModal(movie.id));
    if (onSelect) {
      onSelect(movie);
    }
  };
  // Build the full poster image URL using TMDB's base image URL.
  const posterUrl = movie.backdrop_path && movie.backdrop_path.length > 9
    ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
    : `https://image.tmdb.org/t/p/w500${movie.poster_path}`

  return (
    <div
      className="movie-item cursor-pointer hover:shadow-lg border p-2 w-52"
      onClick={handleClick}
    >
      <img src={posterUrl} alt={movie.title} className="w-full mb-2" />
      <h3 className="font-bold text-lg">{movie.title}</h3>
      <p className="text-sm text-gray-600">Rating: {movie.vote_average.toFixed(1)}</p>
    </div>
  );
};

export default Movie;
