import { createSlice } from '@reduxjs/toolkit';

const aiGeneratedTitleInitialState = {
    aiGeneratedTitle: ["title1", "title2"],

    selectedTitle: "" 
};

const TitleSlice = createSlice({
  name: 'TitleSlice',
  initialState: aiGeneratedTitleInitialState, // Correctly assign the initial state
  reducers: {
    SaveTitle: (state, action) => {
        // Ensure the payload is in the correct format
        state.aiGeneratedTitle.push(action.payload);
    },
    // parseTitle: (state, action) => {
    //     // Replace the ParsedGeneratedTitle array with the new parsed array
    //     state.ParsedGeneratedTitle = action.payload;
    // },
    setSelectedTitle: (state, action) => {
        // Update the selectedTitle with the new value
        state.selectedTitle = action.payload;
    }
  },
});

export const { SaveTitle, setSelectedTitle } = TitleSlice.actions;

export default TitleSlice.reducer;
