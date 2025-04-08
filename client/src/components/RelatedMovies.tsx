import { useEffect, useState } from "react";
import { Movie as MovieType } from "../types/Movie";
import Movie from "./Movie";

interface RelatedMoviesProps {
  currentMovieId: number;
  movie: MovieType;
}

const RelatedMovies = ({ currentMovieId, movie }: RelatedMoviesProps) => {
  const [relatedMoviesIds, setRelatedMoviesIds] = useState<any[]>([]);
  const [relatedMovies, setRelatedMovies] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (currentMovieId && movie?.fetchedFullDetails) {
      fetch(`/api/movies/${currentMovieId}/related`)
        .then((res) => res.json())
        .then((data) => {
          setRelatedMoviesIds(data.relatedMovies);
        })
        .catch((err) => console.error('Failed to fetch related movies:', err));
    }
  }, [currentMovieId, movie?.fetchedFullDetails]);

  useEffect(() => {
    if (!relatedMoviesIds.length) return;

    const fetchRelated = async () => {
      try {
        const results = await Promise.all(
          relatedMoviesIds.slice(1, 9).map((m) =>
            fetch(`/api/movies/${m.id}`).then((res) => res.json())
          )
        );
        setRelatedMovies(results);
      } catch (err) {
        console.error('Failed to fetch related movies:', err);
      }
    };
    fetchRelated();
    setIsLoaded(true)
  }, [relatedMoviesIds]);

  if (!isLoaded) {
    return (
      <div role="status" className="flex items-center justify-center h-[45cw] p-5 bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
        <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
          <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
          <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM9 13a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2Zm4 .382a1 1 0 0 1-1.447.894L10 13v-2l1.553-1.276a1 1 0 0 1 1.447.894v2.764Z" />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    )
  }
  return (
    <div className="px-4">
      {relatedMovies.length > 1 && (
        <div className="mt-4">
          <h4 className="text-md font-semibold mb-2">If you liked {`"${movie.title}" . . .`}</h4>

          <ul className="flex flex-wrap gap-3 w-full justify-around">
            {relatedMovies.filter((movie) => {return movie.backdrop_path && movie.poster_path}).map((movie) => (
              <li key={movie.id} className="mb-4 sm:max-w-[45%]" >
                <Movie movie={movie} />
              </li>
            ))}
          </ul>

        </div>
      )}
    </div>
  )
};

export default RelatedMovies;