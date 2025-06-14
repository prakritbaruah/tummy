import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Timing = 'morning' | 'afternoon' | 'evening';

export interface BowelEntry {
  id: string;
  timing: Timing;
  urgency: number;      // 1-5 scale
  consistency: number;  // 1-7 scale
  mucusPresent: boolean;
  bloodPresent: boolean;
  timestamp: number;
}

export interface BowelState {
  entries: BowelEntry[];
}

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
    removeBowelEntry: (state, action: PayloadAction<string>) => {
      state.entries = state.entries.filter(entry => entry.id !== action.payload);
    },
  },
});

export const { addBowelEntry, removeBowelEntry } = bowelSlice.actions;
export default bowelSlice.reducer; 