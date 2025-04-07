import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { fetchMoviesByCategory, fetchMoviesByGenre } from '../redux/movies/moviesSlice';
import ReusableMoviesCarousel from './ReusableMoviesCarousell';
import { useAppDispatch } from './hooks/hooks';
import movieGenres from './const/const';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { byId, topRated, popular, nowPlaying, moviesByGenre, loading, error } = useSelector(
    (state: RootState) => state.movies
  );

  useEffect(() => {
    // Dispatch fetches for overall categories
    dispatch(fetchMoviesByCategory('/top_rated'));
    dispatch(fetchMoviesByCategory('/upcoming'));
    dispatch(fetchMoviesByCategory('/popular'));
    dispatch(fetchMoviesByCategory('/now_playing'));

    // Loop through each genre and dispatch its fetch
    Object.keys(movieGenres).slice(0, 17).forEach((genreId) => {
      dispatch(fetchMoviesByGenre(genreId));
    });
  }, [dispatch]);

  // Map movie IDs to movie objects for overall categories
  const topRatedMovies = topRated.map((id) => byId[id]);
  const popularMovies = popular.map((id) => byId[id]);
  const nowPlayingMovies = nowPlaying.map((id) => byId[id]);

  if (loading) {
    return <div></div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="mt-10 w-full max-w-5xl px-[4%]">
      <h2 className="text-2xl font-bold my-4">Now Playing</h2>
      <ReusableMoviesCarousel movies={nowPlayingMovies} />

      <h2 className="text-2xl font-bold mb-4">Top Rated</h2>
      <ReusableMoviesCarousel movies={topRatedMovies} />

      <h2 className="text-2xl font-bold my-4">Popular</h2>
      <ReusableMoviesCarousel movies={popularMovies} />

      {/* Iterate over each genre and display its movies carousel */}
      {Object.entries(movieGenres).slice(0, 17).map(([genreId, genreName]) => {
        const moviesForGenre = (moviesByGenre[genreId] || []).map((id) => byId[id]);
        return (
          <div key={genreId}>
            <h2 className="text-2xl font-bold my-4">{genreName}</h2>
            <ReusableMoviesCarousel movies={moviesForGenre} />
          </div>
        );
      })}
    </div>
  );
};

export default HomePage;
