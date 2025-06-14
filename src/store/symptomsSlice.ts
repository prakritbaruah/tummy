import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Timing = 'morning' | 'afternoon' | 'evening';
export type Severity = 'low' | 'mild' | 'moderate' | 'high' | 'severe';

export const SYMPTOMS = [
  "Fatigue",
  "Fever",
  "Weight loss",
  "Loss of appetite",
  "Joint pain or swelling",
  "Skin rashes",
  "Eye inflammation",
  "Abdominal pain/cramping",
  "Bloating/gas"
] as const;

export type SymptomName = typeof SYMPTOMS[number];

// Base type for symptom data
export interface SymptomData {
  name: SymptomName;
  timing: Timing;
  severity: Severity;
}

// Full entry type with metadata
export interface SymptomEntry extends SymptomData {
  id: string;
  timestamp: number;
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