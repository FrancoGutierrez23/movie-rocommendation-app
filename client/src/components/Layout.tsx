import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import MovieCarousel from './MovieCarousel';
import { fetchMovies } from '../redux/movies/moviesSlice';
import { AppDispatch } from '../redux/store/store';
import MovieModal from './MovieModal';
import { Movie as MovieType } from '../types/Movie';
import { openModal } from '../redux/modal/modalSlice';
import MoviesCarousel from './MoviesCarousel';
import Home from './Home';
import MoviesList from './MoviesList';
import Header from './Header';

const Layout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [order, setOrder] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Fetch initial movies only if there's no search query
  useEffect(() => {
    if (!searchQuery) {
      dispatch(fetchMovies(''));
    }
  }, [dispatch, searchQuery]);

  const handleMovieSelect = (movie: MovieType) => {
    dispatch(openModal(movie.id));
  };

  // This handler will be passed to the SearchMovies component
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    dispatch(fetchMovies(query));
  };

  return (
    <div className="bg-transparent container">
      <Header onSearch={handleSearch} />
      <MovieCarousel />
      <main>
        {searchQuery ? (
          // Render search results when there's a search query
          <MoviesList order={order} setOrder={setOrder} onMovieSelect={handleMovieSelect} />
        ) : (
          // Render Home and MoviesCarousel when no search query exists
          <>
            <MoviesCarousel order={order} onMovieSelect={handleMovieSelect} />
            <Home />
          </>
        )}
      </main>
      <MovieModal />
    </div>
  );
};

export default Layout;
