import { Movie } from "../types/Movie";

const shuffleMovies = (movies: Movie[] ) => {
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

export default shuffleMovies;