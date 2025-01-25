import { configureStore } from '@reduxjs/toolkit';
import TitleSlice from '../Slices/titleSlice';
import CourseContent from '../Slices/course.slice';
import CourseData from '../Components/Course';

export const store = configureStore({
  reducer: {
    TITLE_STORAGE: TitleSlice,
    COURSE_STORAGE: CourseContent,
    // Add the new slice to the store
  },
});

export default store;
