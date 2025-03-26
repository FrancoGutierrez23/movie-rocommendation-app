import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SearchMovies from './SearchMovies';
import Filters from './Filters';
import MovieCarousel from './MovieCarousel';
import { fetchMovies } from '../redux/movies/moviesSlice';
import { AppDispatch } from '../redux/store/store';
import MovieModal from './MovieModal';
import { Movie as MovieType } from '../types/Movie';
import { openModal } from '../redux/modal/modalSlice';
import MoviesCarousel from './MoviesCarousel';
import Home from './Home';

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
        <MoviesCarousel order={order} onMovieSelect={handleMovieSelect} />
        <Home />
      </main>
        <MovieModal />
    </div>
  );
};


export default Layout;
