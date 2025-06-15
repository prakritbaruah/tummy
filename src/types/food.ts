import { BaseEntry } from './common';

export interface FoodEntry extends BaseEntry {
  name: string;
  quantity: string;
  notes?: string;
}

export interface FoodState {
  entries: FoodEntry[];
} 