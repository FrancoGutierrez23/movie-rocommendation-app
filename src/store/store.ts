// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
// Import your reducers here (we'll create a sample slice soon)
import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer, // add other reducers here
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
