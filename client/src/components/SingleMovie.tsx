import { Movie as MovieType } from '../types/Movie';

interface MovieProps {
  movie: MovieType;
}

const SingleMovie: React.FC<MovieProps> = ({ movie }) => {
  const posterUrl =
    movie.backdrop_path && movie.backdrop_path.length > 9
      ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
      : `https://image.tmdb.org/t/p/original${movie.poster_path}`;

  return (
    <div className="relative h-96 w-full rounded-sm overflow-hidden">
      {/* Optimized Image */}
      <img
        src={posterUrl}
        alt={movie.title}
        className="absolute inset-0 w-full h-full object-cover object-center"
        loading="eager"
        fetchPriority="high"
      />

      {/* Top Fade */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black to-transparent z-10" />

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col w-full h-full gap-[15%] justify-between p-8 text-white">
        <h3 className="text-2xl font-semibold">{movie.title}</h3>
        <p>{movie.overview}</p>
      </div>
    </div>
  );
};

export default SingleMovie;
