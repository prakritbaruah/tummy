import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Timing = 'morning' | 'afternoon' | 'evening';
export type Urgency = 'low' | 'medium' | 'high';

export interface BowelEntry {
  id: string;
  timestamp: number;
  timing: Timing;
  urgency: Urgency;
  consistency: number;
  mucusPresent: boolean;
  bloodPresent: boolean;
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