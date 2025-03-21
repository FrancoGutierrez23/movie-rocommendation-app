import { useState } from 'react';
import api from '../api';

const SearchMovies = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState<any[]>([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await api.get('/search', { params: { query } });
      setMovies(response.data.results);
    } catch (err) {
      setError('Failed to fetch movies.');
      console.error(err);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p>{error}</p>}
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>{movie.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchMovies;
