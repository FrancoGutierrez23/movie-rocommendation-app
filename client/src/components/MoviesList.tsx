import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { Movie as MovieType } from '../types/Movie';
import Movie from './Movie';
import Filters from './Filters';

interface MoviesListProps {
  onMovieSelect: (movie: MovieType) => void;
  order: string;
  setOrder: any;
}

const MoviesList = ({ onMovieSelect, order, setOrder }: MoviesListProps) => {
  const { byId, searchResults, loading, error } = useSelector((state: RootState) => state.movies);

  // Reconstruct the movies array from the normalized state
  const movies = searchResults.map(id => byId[id]);

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
    <div>
      <aside className="mb-4">
        <Filters onOrderChange={setOrder} />
      </aside>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {sortedMovies.map((movie) => (
          <li key={movie.id}>
            <Movie movie={movie} onSelect={onMovieSelect} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesList;
