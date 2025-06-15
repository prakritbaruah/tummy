import { configureStore } from '@reduxjs/toolkit';
import foodReducer from './foodSlice';
import symptomsReducer from './symptomsSlice';
import bowelReducer from './bowelSlice';

export const store = configureStore({
  reducer: {
    food: foodReducer,
    symptoms: symptomsReducer,
    bowel: bowelReducer,
  },
});

// Re-export types and hooks from types/store
export type { RootState, AppDispatch } from '../types/store';
export { useAppSelector } from '../types/store';
export const useAppDispatch = () => store.dispatch;