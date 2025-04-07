import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import Movie from './Movie';
import Filters from './Filters';

interface MoviesListProps {
  order: string;
  setOrder: any;
}

const MoviesList = ({ order, setOrder }: MoviesListProps) => {
  const { byId, searchResults, loading, error } = useSelector((state: RootState) => state.movies);

  // Reconstruct the movies array from the normalized state
  const movies = searchResults.map(id => byId[id]);

  let sortedMovies = [...movies].filter((movie) => {return movie.backdrop_path && movie.poster_path});

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
    return <div></div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className='p-5'>
      <aside className="mb-4">
        <Filters onOrderChange={setOrder} />
      </aside>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {sortedMovies.map((movie) => (
          <li key={movie.id} className=''>
            <Movie movie={movie} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesList;
