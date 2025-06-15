// Common types used across the application
export type Timing = 'Morning' | 'Afternoon' | 'Evening';

// Base interface for all entries
export interface BaseEntry {
  id: string;
  timestamp: number;
} 