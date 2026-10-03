import { useCallback } from 'react';
import type { AnalyticsAdapter } from './analytics.types';

/** Returns a memoized timing helper. */
export function useTiming(
  adapter: AnalyticsAdapter | null
): (category: string, variable: string, ms: number) => void {
  return useCallback(
    (category: string, variable: string, ms: number) => {
      adapter?.timing(category, variable, ms);
    },
    [adapter]
  );
}
