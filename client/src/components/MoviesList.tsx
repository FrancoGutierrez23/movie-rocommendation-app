import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { Movie as MovieType } from '../types/Movie';
import Movie from './Movie';

interface MoviesListProps {
  onMovieSelect: (movie: MovieType) => void;
  order: string;
}

const MoviesList = ({ onMovieSelect, order }: MoviesListProps) => {
  const { movies, loading, error } = useSelector((state: RootState) => state.movies);

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

  if (loading) {
    return <div>Loading movies...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {sortedMovies.map((movie) => (
        <li key={movie.id}>
          <Movie movie={movie} onSelect={onMovieSelect} />
        </li>
      ))}
    </ul>
  );
};

export default MoviesList;
