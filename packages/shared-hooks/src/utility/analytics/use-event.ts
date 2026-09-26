import { useCallback } from 'react';
import type { AnalyticsAdapter } from './analytics.types';

/** Returns a memoized event tracker. */
export function useEvent(
  adapter: AnalyticsAdapter | null
): (name: string, properties?: Record<string, unknown>) => void {
  return useCallback(
    (name: string, properties?: Record<string, unknown>) => {
      adapter?.track({ name, properties, timestamp: Date.now() });
    },
    [adapter]
  );
}
