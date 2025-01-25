import { createSlice } from '@reduxjs/toolkit';

const aigeneratedCourse = {
    aiGeneratedCourse: ["Course1", "Course2"],
    ParsedChapters: [],
    ParsedDescriptions: [],
    ParsedResources: [],
    ParsedAssignments: [],
  
};

const CourseContent = createSlice({
  name: 'CourseContent',
  initialState: aigeneratedCourse, // Correctly assign the initial state
  reducers: {
    SaveCourse: (state, action) => {
        // Ensure the payload is in the correct format
        state.aiGeneratedCourse.push(action.payload);
    },
   
    Savechapter: (state, action) => {
        // Ensure the payload is in the correct format
        state.ParsedChapters.push(action.payload);
    },
   
    Savedescriptions: (state, action) => {
        // Ensure the payload is in the correct format
        state.ParsedDescriptions.push(action.payload);
    },
   
    Saveresources: (state, action) => {
        // Ensure the payload is in the correct format
        state.ParsedResources.push(action.payload);
    },
   
    Saveassignments: (state, action) => {
        // Ensure the payload is in the correct format
        state.ParsedAssignments.push(action.payload);
    },
   
  },
});

export const { SaveCourse,Savechapter ,Saveassignments,Savedescriptions,Saveresources} = CourseContent.actions;

export default CourseContent.reducer;
