import { configureStore } from '@reduxjs/toolkit';
import foodReducer, { FoodState } from './foodSlice';
import symptomsReducer, { SymptomsState } from './symptomsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { TypedUseSelectorHook } from 'react-redux';

export interface RootState {
  food: FoodState;
  symptoms: SymptomsState;
}

export const store = configureStore({
  reducer: {
    food: foodReducer,
    symptoms: symptomsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppDispatch = typeof store.dispatch;

// Export a hook that can be reused to resolve types
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 