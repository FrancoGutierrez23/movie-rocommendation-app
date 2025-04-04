import { useSelector } from 'react-redux';
import { RootState } from '../redux/store/store';
import { closeModal, goBack } from '../redux/modal/modalSlice';
import { useEffect } from 'react';
import { fetchMovieDetails } from '../redux/movies/moviesSlice';
import { useAppDispatch } from './hooks/hooks';
import movieGenres from './const/const';
import SingleMovie from './SingleMovie';
import { formatRuntime, getRatingColor } from '../utils/componentsFunctions';
import { GrFormPreviousLink } from "react-icons/gr";
import RelatedMovies from './RelatedMovies';


const MovieModal = () => {
  const dispatch = useAppDispatch();
  const { currentMovieId, history } = useSelector((state: RootState) => state.modal);
  const { byId } = useSelector((state: RootState) => state.movies);

  // Retrieve the movie details directly from byId
  const movie = currentMovieId ? byId[currentMovieId] : undefined;

  useEffect(() => {
    if (currentMovieId && !movie?.fetchedFullDetails) {
      dispatch(fetchMovieDetails(currentMovieId));
    }
  }, [currentMovieId, dispatch, movie]);

  // Render nothing if no movie is selected
  if (!currentMovieId) return null;

  if (!movie) {
    return (
      <div className="fixed w-full h-full z-600 inset-0 flex items-center justify-center bg-black bg-opacity-50">
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
           rounded-sm shadow-lg max-w-3xl w-full bg-neutral-1000
           ">
        <div className="w-full">
          <SingleMovie movie={movie} isModal={true} />
        </div>

        <div className="fixed sm:absolute w-full pt-1 px-3 flex justify-between z-[999]">
          <button
            onClick={() => dispatch(goBack())}
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none 
            hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm 
            px-3 py-1  dark:bg-gray-800 dark:text-white dark:border-gray-600 transition flex
            dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 z-600
            items-center"
            disabled={history.length === 0}
          >
            <GrFormPreviousLink className='text-lg mr-1' />
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

        <div className='relative flex w-full justify-end'>
          <span className='absolute -top-16 z-600 mr-6'>
            {movie.runtime ? formatRuntime(movie.runtime) : null}
          </span>
        </div>


        <p className='px-4'>
          {movie.overview}
        </p>

        <div className='pt-2 px-4'>
          {movie.vote_average ?
            <p>
              Rating:
              <span className={`text-sm font-bold ml-2 ${getRatingColor(movie.vote_average)}`}>
                {movie.vote_average.toFixed(1)}
              </span>
              <span className='text-gray-400'>
                {movie.vote_count ? ` (${movie.vote_count})` : null}
              </span>
            </p>
            :
            null
          }
        </div>

        <RelatedMovies currentMovieId={currentMovieId} movie={movie} />

      </div>
    </div>
  );
};

export default MovieModal;
