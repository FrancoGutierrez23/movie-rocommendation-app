import SearchMovies from "./SearchMovies";

interface HeaderProps {
    onSearch: (query: string) => void;
  }

const Header = ({onSearch}: HeaderProps) => {
    return (
        <header className="fixed w-full flex p-4 z-100 bg-black left-0">
            <SearchMovies onSearch={onSearch} />
        </header >
    )
};

export default Header;