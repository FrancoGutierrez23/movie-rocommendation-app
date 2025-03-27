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
      className="movie-item cursor-pointer hover:shadow-lg border p-2 w-[30vw]"
      onClick={handleClick}
    >
      <div className="relative w-full h-0 pb-[56.25%] overflow-hidden mb-2">
        <img
          src={posterUrl}
          alt={movie.title}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>

      <h3 className="font-bold text-lg">{movie.title}</h3>
      <p className="text-sm text-gray-600">
        Rating: {movie.vote_average.toFixed(1)}
      </p>
    </div>
  );
};

export default Movie;
