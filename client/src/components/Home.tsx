import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { fetchMoviesByCategory, fetchMoviesByGenre } from '../redux/movies/moviesSlice';
import ReusableMoviesCarousel from './ReusableMoviesCarousell';
import { useAppDispatch } from './hooks/hooks';

const HomePage = () => {
    const dispatch = useAppDispatch();
  const { byId, topRated, popular, nowPlaying, moviesByGenre, loading, error } = useSelector(
    (state: RootState) => state.movies
  );

  useEffect(() => {
    dispatch(fetchMoviesByCategory('/top_rated'));
    dispatch(fetchMoviesByCategory('/upcoming'));
    dispatch(fetchMoviesByCategory('/popular'));
    dispatch(fetchMoviesByCategory('/now_playing'));
    dispatch(fetchMoviesByGenre('28'))
  }, [dispatch]);

  // Map movie IDs to movie objects for each category
  const topRatedMovies = topRated.map((id) => byId[id]);
  const popularMovies = popular.map((id) => byId[id]);
  const nowPlayingMovies = nowPlaying.map((id) => byId[id]);
  const genreActionMovies = (moviesByGenre['28'] || []).map((id) => byId[id]);

  if (loading) {
    return <div>Loading movies...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  console.log(genreActionMovies);

  return (
    <div className='mt-10 w-full max-w-5xl px-[4%]'>
      <h2 className="text-2xl font-bold my-4">Now Playing</h2>
      <ReusableMoviesCarousel movies={nowPlayingMovies} />

      <h2 className="text-2xl font-bold mb-4">Top Rated</h2>
      <ReusableMoviesCarousel movies={topRatedMovies} />

      <h2 className="text-2xl font-bold my-4">Popular</h2>
      <ReusableMoviesCarousel movies={popularMovies} />

      <h2 className="text-2xl font-bold my-4">Genre 28</h2>
      <ReusableMoviesCarousel movies={genreActionMovies} />
    </div>
  );
};

export default HomePage;
