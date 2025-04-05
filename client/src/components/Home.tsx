import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { fetchMoviesByCategory } from '../redux/movies/moviesSlice';
import ReusableMoviesCarousel from './ReusableMoviesCarousell';
import { useAppDispatch } from './hooks/hooks';

const HomePage = () => {
    const dispatch = useAppDispatch();
  const { byId, topRated, upcoming, popular, nowPlaying, loading, error } = useSelector(
    (state: RootState) => state.movies
  );

  useEffect(() => {
    dispatch(fetchMoviesByCategory('/top_rated'));
    dispatch(fetchMoviesByCategory('/upcoming'));
    dispatch(fetchMoviesByCategory('/popular'));
    dispatch(fetchMoviesByCategory('/now_playing'));
  }, [dispatch]);

  // Map movie IDs to movie objects for each category
  const topRatedMovies = topRated.map((id) => byId[id]);
  const upcomingMovies = upcoming.map((id) => byId[id]);
  const popularMovies = popular.map((id) => byId[id]);
  const nowPlayingMovies = nowPlaying.map((id) => byId[id]);

  if (loading) {
    return <div>Loading movies...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className='mt-[400px] w-full max-w-5xl px-[4%]'>
      <h2 className="text-2xl font-bold mb-4">Top Rated</h2>
      <ReusableMoviesCarousel movies={topRatedMovies} />

      <h2 className="text-2xl font-bold my-4">Upcoming</h2>
      <ReusableMoviesCarousel movies={upcomingMovies} />

      <h2 className="text-2xl font-bold my-4">Popular</h2>
      <ReusableMoviesCarousel movies={popularMovies} />

      <h2 className="text-2xl font-bold my-4">Now Playing</h2>
      <ReusableMoviesCarousel movies={nowPlayingMovies} />
    </div>
  );
};

export default HomePage;
