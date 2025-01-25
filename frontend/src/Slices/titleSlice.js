import { createSlice } from '@reduxjs/toolkit';

const aiGeneratedTitleInitialState = {
    aiGeneratedTitle: ["title1","title2"] 
};

const TitleSlice = createSlice({
  name: 'TitleSlice',
  initialState: aiGeneratedTitleInitialState, // Correctly assign the initial state
  reducers: {
    SaveTitle: (state, action) => {
        state.aiGeneratedTitle.push(action.payload);
    }
  },
});

export const { SaveTitle } = TitleSlice.actions;

export default TitleSlice.reducer;
