import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMovies } from '../redux/movies/moviesSlice';
import { AppDispatch } from '../redux/store/store';

const SearchMovies = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = () => {
    console.log(query);
    dispatch(fetchMovies(query));
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="border p-1 rounded"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white p-1 rounded">
        Search
      </button>
    </div>
  );
};

export default SearchMovies;

