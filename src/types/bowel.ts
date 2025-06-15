import { BaseEntry, Timing } from './common';

export type Urgency = 'Low' | 'Medium' | 'High';

export interface BowelEntry extends BaseEntry {
  timing: Timing;
  urgency: Urgency;
  consistency: number;
  mucusPresent: boolean;
  bloodPresent: boolean;
}

export interface BowelState {
  entries: BowelEntry[];
} 