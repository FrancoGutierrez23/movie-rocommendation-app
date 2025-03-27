import SearchMovies from "./SearchMovies";

interface HeaderProps {
    onSearch: (query: string) => void;
  }

const Header = ({onSearch}: HeaderProps) => {
    return (
        <header className="fixed w-[100vw] flex p-4 z-20 bg-black left-0">
            <SearchMovies onSearch={onSearch} />
        </header >
    )
};

export default Header;