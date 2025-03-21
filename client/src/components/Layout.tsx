import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SearchMovies from './SearchMovies';
import MoviesList from './MoviesList';
import Filters from './Filters';
import MovieModalNavigator from './MovieModalNavigator';
import MovieCarousel from './MovieCarousel';
import { fetchMovies } from '../redux/movies/moviesSlice';
import { AppDispatch } from '../redux/store/store';
import MovieDetailsModal from './MovieDetailsModal';

const Layout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null);
  const [order, setOrder] = useState<string>('');

  useEffect(() => {
    dispatch(fetchMovies(''));
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <header className="mb-4">
        <SearchMovies />
      </header>
      <aside className="mb-4">
        <Filters onOrderChange={setOrder} />
      </aside>
      <main>
        <MoviesList order={order} onMovieSelect={setSelectedMovie} />
      </main>
      {selectedMovie && (
        <>
          <MovieDetailsModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
          <MovieModalNavigator currentMovieId={selectedMovie.id} />
        </>
      )}
      <MovieCarousel />
    </div>
  );
};


export default Layout;
