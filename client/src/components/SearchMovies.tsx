import { useState } from 'react';
import { ImSearch } from "react-icons/im";

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
        className="p-1 rounded border-b-1 border-pink-300 focus:outline-0"
      />
      <button onClick={handleSearch} className="text-white bg-gradient-to-r from-purple-500 to-pink-500 
                  font-medium rounded-full p-2 text-center hover:scale-105 transition border-2 border-pink-400 cursor-pointer">
        <ImSearch />
      </button>
    </div>
  );
};

export default SearchMovies;
