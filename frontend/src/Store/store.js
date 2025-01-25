import { configureStore } from '@reduxjs/toolkit';
import TitleSlice from '../Slices/titleSlice';

export const store = configureStore({
  reducer: {
    TITLE_STORAGE: TitleSlice,
    // Add the new slice to the store
  },
});

export default store;
