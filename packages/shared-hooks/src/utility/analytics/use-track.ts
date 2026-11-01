import { useCallback } from 'react';
import type { AnalyticsAdapter } from './analytics.types';

/** Alias of useEvent + timing. */
export function useTrack(adapter: AnalyticsAdapter | null): {
  readonly track: (name: string, properties?: Record<string, unknown>) => void;
  readonly timing: (category: string, variable: string, ms: number) => void;
} {
  const track = useCallback(
    (name: string, properties?: Record<string, unknown>) => {
      adapter?.track({ name, properties, timestamp: Date.now() });
    },
    [adapter]
  );
  const timing = useCallback(
    (category: string, variable: string, ms: number) => {
      adapter?.timing(category, variable, ms);
    },
    [adapter]
  );
  return { track, timing };
}
