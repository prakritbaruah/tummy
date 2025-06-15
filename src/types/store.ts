import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { store } from '../store';
import { FoodState } from './food';
import { SymptomsState } from './symptoms';
import { BowelState } from './bowel';

export interface RootState {
  food: FoodState;
  symptoms: SymptomsState;
  bowel: BowelState;
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppDispatch = typeof store.dispatch;

// Export a hook that can be reused to resolve types
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 