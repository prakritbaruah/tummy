import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FoodEntry, FoodState } from '../types/food';

const initialState: FoodState = {
  entries: [],
};

const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    addFoodEntry: (state, action: PayloadAction<FoodEntry>) => {
      state.entries.push(action.payload);
    },
    removeFoodEntry: (state, action: PayloadAction<string>) => {
      state.entries = state.entries.filter(entry => entry.id !== action.payload);
    },
  },
});

export const { addFoodEntry, removeFoodEntry } = foodSlice.actions;
export default foodSlice.reducer; 