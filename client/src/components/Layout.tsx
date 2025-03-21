import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SearchMovies from './SearchMovies';
import MoviesList from './MoviesList';
import { fetchMovies } from '../redux/movies/moviesSlice';
import { AppDispatch } from '../redux/store/store';
import MovieDetailsModal from './MovieDetailsModal';

const Layout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null);

  // Fetch default movies on component mount
  useEffect(() => {
    dispatch(fetchMovies('')); 
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <header className="mb-4">
        <SearchMovies />
      </header>
      <main>
        <MoviesList onMovieSelect={setSelectedMovie} />
      </main>
      {selectedMovie && (
        <MovieDetailsModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
};

export default Layout;
