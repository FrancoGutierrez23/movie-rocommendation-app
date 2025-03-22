import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store/store';
import { closeModal, goBack } from '../redux/modal/modalSlice'; 
import { useEffect, useState } from 'react';

const MovieModal = () => {
    const dispatch = useDispatch();
    const { currentMovieId, history } = useSelector((state: RootState) => state.modal);
    const { movies } = useSelector((state: RootState) => state.movies);
    const [relatedMovies, setRelatedMovies] = useState<any[]>([]);
  
    // Find the current movie details from the movies slice
    const movie = movies.find((m) => m.id === currentMovieId);
  
    // Fetch related movies when currentMovieId changes
    useEffect(() => {
      if (currentMovieId) {
        fetch(`/api/movies/${currentMovieId}/related`)
          .then((res) => res.json())
          .then((data) => {
            // Assuming the API returns { relatedMovies: [...] }
            setRelatedMovies(data.relatedMovies);
          })
          .catch((err) => console.error('Failed to fetch related movies:', err));
      }
    }, [currentMovieId]);
  
    // Render nothing if no movie is selected
    if (!currentMovieId || !movie) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
            <button
              onClick={() => dispatch(closeModal())}
              className="text-red-500 font-bold"
            >
              X
            </button>
          </div>
          <p>{movie.overview}</p>
  
          {/* Display Related Movies */}
          {relatedMovies.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Related Movies</h3>
              <ul className="flex flex-wrap gap-2">
                {relatedMovies.slice(0, 5).map((related) => (
                  <li key={related.id}>
                    <button
                      className="bg-gray-200 p-2 rounded"
                      onClick={() => dispatch({ type: 'modal/openModal', payload: related.id })}
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
              className="bg-gray-300 p-1 rounded"
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

