import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { closeModal, goBack, openModal } from '../redux/modal/modalSlice';
import { useEffect, useState } from 'react';
import { fetchMovieDetails } from '../redux/movies/moviesSlice';
import { useAppDispatch } from './hooks/hooks';

const MovieModal = () => {
  const dispatch = useAppDispatch();
  const { currentMovieId, history } = useSelector((state: RootState) => state.modal);
  const { byId } = useSelector((state: RootState) => state.movies);
  const [relatedMovies, setRelatedMovies] = useState<any[]>([]);

  // Retrieve the movie details directly from byId
  const movie = currentMovieId ? byId[currentMovieId] : undefined;

  useEffect(() => {
    if (currentMovieId && !movie) {
      dispatch(fetchMovieDetails(currentMovieId));
    }
  }, [currentMovieId, movie, dispatch]);

  // Fetch related movies when currentMovieId changes
  useEffect(() => {
    if (currentMovieId) {
      fetch(`/api/movies/${currentMovieId}/related`)
        .then((res) => res.json())
        .then((data) => {
          setRelatedMovies(data.relatedMovies);
        })
        .catch((err) => console.error('Failed to fetch related movies:', err));
    }
  }, [currentMovieId]);

  const posterUrl =
    movie?.backdrop_path && movie.backdrop_path.length > 9
      ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
      : `https://image.tmdb.org/t/p/w500${movie?.poster_path}`;

  // Render nothing if no movie is selected
  if (!currentMovieId) return null;

  if (!movie) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-black p-6 rounded shadow-lg max-w-lg w-full">
          <p>Loading movie details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed mt-6 inset-0 z-10 flex items-center rounded-sm justify-center bg-black bg-opacity-50">
      <div className=" bg-gray-800 flex flex-col no-scrollbar overflow-auto p-5 h-[85%] rounded-sm shadow-lg max-w-lg w-full">
        <div className="flex justify-between items-center rounded-sm">
          <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
          <button
            onClick={() => dispatch(closeModal())}
            className="text-red-500 font-bold hover:scale-110 transition p-2 text-xl"
          >
            X
          </button>
          
        </div>
        <img
          src={posterUrl}
          alt={movie.title}
          className="m-2 rounded-sm"
        />
        
        <p>{movie.overview}</p>

        {/* Display Related Movies */}
        {relatedMovies.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Related Movies</h3>
            <ul className="flex flex-wrap gap-2">
              {relatedMovies.slice(0, 5).map((related) => (
                <li key={related.id}>
                  <button
                    className="bg-gray-900 p-2 rounded"
                    onClick={() => dispatch(openModal(related.id))}
                  >
                    {related.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-4">
          <button
            onClick={() => dispatch(goBack())}
            className="bg-gray-900 p-1 rounded"
            disabled={history.length === 0}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
