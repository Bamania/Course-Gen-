import { createSlice } from '@reduxjs/toolkit';

const aigeneratedCourse = {
    aiGeneratedCourse: ["Course1", "Course2"],
    ParsedGeneratedCourse: [],
  
};

const CourseContent = createSlice({
  name: 'CourseContent',
  initialState: aigeneratedCourse, // Correctly assign the initial state
  reducers: {
    SaveCourse: (state, action) => {
        // Ensure the payload is in the correct format
        state.aiGeneratedTitle.push(action.payload);
    },
   
  },
});

export const { SaveCourse, } = CourseContent.actions;

export default CourseContent.reducer;
