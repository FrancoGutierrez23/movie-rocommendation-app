import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';
import { Movie } from '../../types/Movie';

// Thunk to fetch movies based on a search query
export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await api.get('/search', { params: { query } });
      return response.data.results as Movie[];
    } catch (error) {
      return rejectWithValue('Failed to fetch movies');
    }
  }
);

// Thunk to fetch details for a single movie
export const fetchMovieDetails = createAsyncThunk(
  'movies/fetchMovieDetails',
  async (movieId: number, { rejectWithValue }) => {
    try {
      const response = await api.get(`/${movieId}`);
      return response.data as Movie;
    } catch (error) {
      return rejectWithValue('Failed to fetch movie details');
    }
  }
);

interface MoviesState {
  byId: { [key: number]: Movie };
  allIds: number[];
  loading: boolean;
  error: string;
}

const initialState: MoviesState = {
  byId: {},
  allIds: [],
  loading: false,
  error: '',
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchMovies thunk
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        // Add or update movies from the search results
        action.payload.forEach((movie) => {
          state.byId[movie.id] = movie;
          if (!state.allIds.includes(movie.id)) {
            state.allIds.push(movie.id);
          }
        });
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Handle fetchMovieDetails thunk
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        // Add or update the single movie details
        state.byId[action.payload.id] = action.payload;
        if (!state.allIds.includes(action.payload.id)) {
          state.allIds.push(action.payload.id);
        }
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default moviesSlice.reducer;
