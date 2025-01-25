import { createSlice } from '@reduxjs/toolkit';

const aiGeneratedTitleInitialState = {
    aiGeneratedTitle: ["title1", "title2"],
    ParsedGeneratedTitle: [] 
};

const TitleSlice = createSlice({
  name: 'TitleSlice',
  initialState: aiGeneratedTitleInitialState, // Correctly assign the initial state
  reducers: {
    SaveTitle: (state, action) => {
        // Ensure the payload is in the correct format
        state.aiGeneratedTitle.push(action.payload);
    },
    parseTitle: (state, action) => {
        // Replace the ParsedGeneratedTitle array with the new parsed array
        state.ParsedGeneratedTitle = action.payload;
    }
  },
});

export const { SaveTitle, parseTitle } = TitleSlice.actions;

export default TitleSlice.reducer;
