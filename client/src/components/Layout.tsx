import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMovies } from '../redux/movies/moviesSlice';
import { AppDispatch } from '../redux/store/store';
import MovieModal from './MovieModal';
import HeroCarousel from './HeroCarousel';
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

  // This handler will be passed to the SearchMovies component
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    dispatch(fetchMovies(query));
  };

  return (
    <div className="bg-transparent">
      <Header onSearch={handleSearch} />
      <main className='pt-12'>
        {searchQuery ? (
          // Render search results when there's a search query
          <MoviesList order={order} setOrder={setOrder} />
        ) : (
          // Render Home and MoviesCarousel when no search query exists
          <div>
            <HeroCarousel />
            <div className='w-full flex justify-center'>
              <Home />
            </div>
          </div>
        )}
      </main>
      <MovieModal />
    </div>
  );
};

export default Layout;
