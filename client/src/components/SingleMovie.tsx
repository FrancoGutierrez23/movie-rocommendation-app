import { Movie as MovieType } from '../types/Movie';

interface MovieProps {
    movie: MovieType;
}

const SingleMovie: React.FC<MovieProps> = ({ movie }) => {

    /*const posterUrl =
        movie.backdrop_path && movie.backdrop_path.length > 9
            ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
            : `https://image.tmdb.org/t/p/original${movie.poster_path}`;*/

    return (
        <div
            className="h-96 w-full bg-[#000000cc] rounded-sm "
            
        >
            <div className='flex flex-col bg-transparent w-full h-full gap-[15%] justify-between p-8'>
                <h3 className='text-2xl'>{movie.title}</h3>
                <p className=''>
                    {movie.overview}
                </p>
            </div>
        </div>
    );
};

export default SingleMovie;