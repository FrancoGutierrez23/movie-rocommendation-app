import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from '../movies/moviesSlice';
import modalReducer from '../modal/modalSlice';


export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
