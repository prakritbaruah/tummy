// Common types used across the application
export type Timing = 'morning' | 'afternoon' | 'evening';

// Base interface for all entries
export interface BaseEntry {
  id: string;
  timestamp: number;
} 