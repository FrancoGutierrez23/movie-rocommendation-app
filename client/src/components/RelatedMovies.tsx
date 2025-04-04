import { useEffect, useState } from "react";
import { Movie as MovieType } from "../types/Movie";
import Movie from "./Movie";

interface RelatedMoviesProps {
    currentMovieId: number;
    movie: MovieType;
}

const RelatedMovies = ({currentMovieId, movie}: RelatedMoviesProps) => {
    const [relatedMoviesIds, setRelatedMoviesIds] = useState<any[]>([]);
    const [relatedMovies, setRelatedMovies] = useState<any[]>([]);

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
              relatedMoviesIds.slice(1, 6).map((m) =>
                fetch(`/api/movies/${m.id}`).then((res) => res.json())
              )
            );
            setRelatedMovies(results);
          } catch (err) {
            console.error('Failed to fetch related movies:', err);
          }
        };
      
        fetchRelated();
      }, [relatedMoviesIds]);


    return (
        <div className="px-4">
            {relatedMovies.length > 1 && (
          <div className="mt-4">
            <h4 className="text-md font-semibold mb-2">If you liked {`"${movie.title}" . . .`}</h4>

            <ul className="flex flex-wrap gap-3 w-full justify-around">
              {relatedMovies.map((movie) => (
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