export interface Movie {
    id: number;
    title: string;
    poster_path: string,
    overview?: string;
    vote_average?: number;
    vote_count?: number;
    backdrop_path?: string;
    genre_ids?: number[];
    genres?: {
      id: number;
      name: string;
    }[];
    release_date?: string;
    original_language?: string;
    popularity?: number;
    isModal?: boolean;
    budget?: number;
    fetchedFullDetails?: boolean;
    runtime?: number;
  }