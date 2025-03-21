import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await api.get('/search', { params: { query } });
      return response.data.results;
    } catch (error) {
      return rejectWithValue('Failed to fetch movies');
    }
  }
);

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default moviesSlice.reducer;
