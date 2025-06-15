import { BaseEntry, Timing } from './common';

export const SYMPTOMS = [
  'abdominal pain',
  'bloating',
  'nausea',
  'vomiting',
  'diarrhea',
  'constipation',
  'gas',
  'heartburn',
  'loss of appetite',
  'fatigue',
] as const;

export type SymptomName = typeof SYMPTOMS[number];
export type Severity = 'low' | 'mild' | 'moderate' | 'high' | 'severe';

// Base type for symptom data
export interface SymptomData {
  name: SymptomName;
  timing: Timing;
  severity: Severity;
}

// Full entry type with metadata
export interface SymptomEntry extends BaseEntry, SymptomData {}

// State type
export interface SymptomsState {
  entries: SymptomEntry[];
} 