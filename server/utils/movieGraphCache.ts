import { MovieGraph } from './movieGraph';

export const movieGraphCache = new MovieGraph();

// Function to update the graph with new movie data
export const updateMovieGraph = (movieData: any, relatedData: any[]) => {
  const movieId = movieData.id;
  const movieTitle = movieData.title;
  movieGraphCache.addMovie(movieId, movieTitle);

  relatedData.forEach(movie => {
    movieGraphCache.addMovie(movie.id, movie.title);
    movieGraphCache.addEdge(movieId, movie.id);
  });
};
