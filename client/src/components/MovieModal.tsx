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

  useEffect(() => {
    console.log(history);
  }, [history]);

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
      <div className="absolute z-700 inset-0 w-[100vw] h-[100vh] flex items-center justify-center bg-black">
        Loading movie...
        <div role="status">
          <svg aria-hidden="true" className="w-8 h-8 ml-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-500 flex items-center rounded-sm justify-center 
       bg-black bg-opacity-50">

      <div className="flex flex-col no-scrollbar overflow-auto h-[95%] relative
           rounded-sm shadow-lg max-w-3xl w-full bg-neutral-1000">

        {/* Movie container */}    
        <div className="w-full">
          <SingleMovie movie={movie} isModal={true} />
        </div>

        {/* Go back button */}
        <div className="fixed sm:absolute w-full pt-1 px-3 flex justify-between z-[999]">
          <button
            onClick={() => dispatch(goBack())}
            className={`text-gray-900 bg-white border border-gray-300 focus:outline-none 
            hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm 
            px-3 py-1  dark:bg-gray-800 dark:text-white dark:border-gray-600 transition flex
            dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 z-600
            items-center ${history.length === 0 ? 'opacity-0' : ''}`}
            disabled={history.length === 0}
          >
            <GrFormPreviousLink className='text-lg mr-1' />
            Back
          </button>

          {/* Close modal button */}
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

        {/* Runtime */}
        <div className='relative flex w-full justify-start text-[12px]'>
          <span className='absolute -top-20 z-600 ml-2 sm:mr-6 bg-black/80 rounded-full py-1 px-2'>
            {movie.runtime ? formatRuntime(movie.runtime) : null}
          </span>
        </div>
        
        {/* Genres */}
        <div className='mt-2 relative'>
          <ul className='flex gap-2 absolute -top-12 sm:-top-16 z-600 ml-2 flex-wrap text-[12px] xs:text-xl'>
            {movie.genre_ids?.slice(0, 4).map((id) => (
              <li key={movieGenres[id]}
                className='text-white bg-gradient-to-r from-purple-500 to-pink-500 
                  font-medium rounded-full px-2 py-1 text-center me-2 mb-2'>
                {movieGenres[id]}
              </li>
            ))}
            {movie.genres?.slice(0, 4).map((g) => (
              <li key={g.name}
                className='text-white bg-gradient-to-r from-purple-500 to-pink-500 
                  font-medium rounded-full px-2 py-1 text-center me-2 mb-2'>
                {g.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Overview */}
        <p className='px-4'>
          {movie.overview}
        </p>
        
        {/* Rating */}
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

        {/* Related Movies */}
        <RelatedMovies currentMovieId={currentMovieId} movie={movie} />
      </div>
    </div>
  );
};

export default MovieModal;
