import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SymptomEntry {
  id: string;
  name: string;
  severity: number; // 1-5 scale
  timestamp: number;
  notes?: string;
}

export interface SymptomsState {
  entries: SymptomEntry[];
}

const initialState: SymptomsState = {
  entries: [],
};

const symptomsSlice = createSlice({
  name: 'symptoms',
  initialState,
  reducers: {
    addSymptomEntry: (state, action: PayloadAction<SymptomEntry>) => {
      state.entries.push(action.payload);
    },
    removeSymptomEntry: (state, action: PayloadAction<string>) => {
      state.entries = state.entries.filter(entry => entry.id !== action.payload);
    },
  },
});

export const { addSymptomEntry, removeSymptomEntry } = symptomsSlice.actions;
export default symptomsSlice.reducer; 