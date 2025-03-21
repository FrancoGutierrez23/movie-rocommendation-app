import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { Movie } from '../types/Movie';

interface MoviesListProps {
  onMovieSelect: (movie: Movie) => void;
}

const MoviesList = ({ onMovieSelect }: MoviesListProps) => {
  const { movies, loading, error } = useSelector((state: RootState) => state.movies);

  if (loading) {
    return <div>Loading movies...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {movies.map((movie) => (
        <li
          key={movie.id}
          className="border p-2 cursor-pointer hover:shadow-lg"
          onClick={() => onMovieSelect(movie)}
        >
          <h3 className="font-bold">{movie.title}</h3>
        </li>
      ))}
    </ul>
  );
};

export default MoviesList;
