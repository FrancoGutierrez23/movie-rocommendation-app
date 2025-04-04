import SearchMovies from "./SearchMovies";


interface HeaderProps {
    onSearch: (query: string) => void;
  }

const Header = ({onSearch}: HeaderProps) => {
    return (
        <header className="fixed w-full flex justify-between px-6 py-2 z-100 bg-black left-0">
            <SearchMovies onSearch={onSearch} />
            <a href={import.meta.env.VITE_BASE_URL} className="text-xl">
                Movie Recommendations
            </a>
        </header >
    )
};

export default Header;