import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SearchMovies from './SearchMovies';
import MoviesList from './MoviesList';
import Filters from './Filters';
//import MovieModalNavigator from './MovieModalNavigator';
import MovieCarousel from './MovieCarousel';
import { fetchMovies } from '../redux/movies/moviesSlice';
import { AppDispatch } from '../redux/store/store';
//import MovieDetailsModal from './MovieDetailsModal';
import MovieModal from './MovieModal';
import { Movie as MovieType } from '../types/Movie';
import { openModal } from '../redux/modal/modalSlice';

const Layout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [order, setOrder] = useState<string>('');

  useEffect(() => {
    dispatch(fetchMovies(''));
  }, [dispatch]);

  const handleMovieSelect = (movie: MovieType) => {
    dispatch(openModal(movie.id));
  };

  return (
    <div className="container mx-auto p-4">
      <header className="mb-4">
        <SearchMovies />
      </header>
      <aside className="mb-4">
        <Filters onOrderChange={setOrder} />
      </aside>
      <MovieCarousel />
      <main>
        <MoviesList order={order} onMovieSelect={handleMovieSelect} />
      </main>
        <MovieModal />
    </div>
  );
};


export default Layout;
