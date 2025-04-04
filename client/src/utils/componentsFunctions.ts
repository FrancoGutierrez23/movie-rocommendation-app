import { Movie } from "../types/Movie";

const shuffleMovies = (movies: Movie[]) => {
  let currentIndex = movies.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [movies[currentIndex], movies[randomIndex]] = [
      movies[randomIndex], movies[currentIndex]];
  }

  return movies;
}

export const formatRuntime = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours > 0) {
    return `${hours}h ${remainingMinutes}m`;
  }

  return `${minutes}m`;
};

export const getRatingColor = (rating: number) => {
  if (rating <= 4) return 'text-red-500';
  if (rating <= 5) return 'text-orange-700';
  if (rating <= 6.9) return 'text-orange-400';
  if (rating <= 8.5) return 'text-sky-400';
  return 'text-blue-500';
};


export default shuffleMovies;