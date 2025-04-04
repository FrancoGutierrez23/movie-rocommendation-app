import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { closeModal, goBack, openModal } from '../redux/modal/modalSlice';
import { useEffect, useState } from 'react';
import { fetchMovieDetails } from '../redux/movies/moviesSlice';
import { useAppDispatch } from './hooks/hooks';
import movieGenres from './const/const';
import SingleMovie from './SingleMovie';


const MovieModal = () => {
  const dispatch = useAppDispatch();
  const { currentMovieId, history } = useSelector((state: RootState) => state.modal);
  const { byId } = useSelector((state: RootState) => state.movies);
  const [relatedMovies, setRelatedMovies] = useState<any[]>([]);

  // Retrieve the movie details directly from byId
  const movie = currentMovieId ? byId[currentMovieId] : undefined;

  useEffect(() => {
    if (currentMovieId && !movie?.fetchedFullDetails) {
      dispatch(fetchMovieDetails(currentMovieId));
    }
  }, [currentMovieId, dispatch, movie]);

  // Fetch related movies when currentMovieId changes
  useEffect(() => {
    if (currentMovieId && movie?.fetchedFullDetails) {
      fetch(`/api/movies/${currentMovieId}/related`)
        .then((res) => res.json())
        .then((data) => {
          setRelatedMovies(data.relatedMovies);
        })
        .catch((err) => console.error('Failed to fetch related movies:', err));
    }
  }, [currentMovieId, movie?.fetchedFullDetails]);

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
    <div className="fixed inset-0 z-500 flex items-center rounded-sm justify-center 
       bg-black bg-opacity-50">


      <div className="flex flex-col no-scrollbar overflow-auto h-[95%] relative
           rounded-sm shadow-lg max-w-[95%] w-full bg-neutral-1000
           ">
        <div className="w-full">
          <SingleMovie movie={movie} isModal={true} />
        </div>

        <div className="absolute w-full px-3 flex justify-between">
          <button
            onClick={() => dispatch(goBack())}
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none 
            hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm 
            px-3 py-1  dark:bg-gray-800 dark:text-white dark:border-gray-600 transition
            dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 z-600"
            disabled={history.length === 0}
          >
            Back
          </button>
          <button
            onClick={() => dispatch(closeModal())}
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none 
            hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm 
            px-3 py-1  dark:bg-gray-800 dark:text-white dark:border-gray-600 transition
            dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 z-600"
          >
            X
          </button>
        </div>

        <div className='mt-2 relative'>
          <ul className='flex gap-2 absolute -top-16 z-600 ml-6'>
            {movie.genre_ids?.map((id) => (
              <li key={movieGenres[id]}
                className='text-white bg-gradient-to-r from-purple-500 to-pink-500 
                  font-medium rounded-full px-2 py-1 text-center me-2 mb-2'>
                {movieGenres[id]}
              </li>
            ))}
            {movie.genres?.map((g) => (
              <li key={g.name}
                className='text-white bg-gradient-to-r from-purple-500 to-pink-500 
                  font-medium rounded-full px-2 py-1 text-center me-2 mb-2'>
                {g.name}
              </li>
            ))}
          </ul>
        </div>


        <p>{movie.overview}</p>

        <div className='pt-2'>
          <span>
            Rating:
            {` ${movie.vote_average}`}
          </span>
          <p>{movie.budget}</p>
        </div>

        {/* Display Related Movies */}
        {relatedMovies.length > 1 && (
          <div className="mt-4">
            <h4 className="text-md font-semibold mb-2">If you liked {`"${movie.title}" . . .`}</h4>

            <ul className="flex flex-wrap gap-2">
              {relatedMovies.slice(0, 5).map((related) => (
                <li key={related.id} className='hover:scale-105 transition'>
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
      </div>
    </div>
  );
};

export default MovieModal;
