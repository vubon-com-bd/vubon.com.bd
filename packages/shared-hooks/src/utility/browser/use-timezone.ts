import { useMemo } from 'react';

/** SSR-safe timezone string. */
export function useTimezone(): string {
  return useMemo(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch {
      return 'UTC';
    }
  }, []);
}
