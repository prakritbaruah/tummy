import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BowelEntry, BowelState } from '../types/bowel';

const initialState: BowelState = {
  entries: [],
};

const bowelSlice = createSlice({
  name: 'bowel',
  initialState,
  reducers: {
    addBowelEntry: (state, action: PayloadAction<BowelEntry>) => {
      state.entries.push(action.payload);
    },
  },
});

export const { addBowelEntry } = bowelSlice.actions;
export default bowelSlice.reducer; 