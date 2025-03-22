import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  currentMovieId: number | null;
  history: number[];
}

const initialState: ModalState = {
  currentMovieId: null,
  history: [],
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<number>) => {
      // Push the current movie into history if it exists
      if (state.currentMovieId !== null) {
        state.history.push(state.currentMovieId);
      }
      state.currentMovieId = action.payload;
    },
    closeModal: (state) => {
      state.currentMovieId = null;
      state.history = [];
    },
    goBack: (state) => {
      // Pop the last movie from history and set it as current
      state.currentMovieId = state.history.pop() || null;
    },
  },
});

export const { openModal, closeModal, goBack } = modalSlice.actions;
export default modalSlice.reducer;
