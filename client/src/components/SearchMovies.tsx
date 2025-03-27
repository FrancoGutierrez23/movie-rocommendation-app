import { useState } from 'react';

interface SearchMoviesProps {
  onSearch: (query: string) => void;
}

const SearchMovies = ({ onSearch }: SearchMoviesProps) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    console.log(query);
    onSearch(query);
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
