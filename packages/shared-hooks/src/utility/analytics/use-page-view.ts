import { useEffect } from 'react';
import type { AnalyticsAdapter } from './analytics.types';

/** Fires page view on mount + when `path` changes. */
export function usePageView(
  adapter: AnalyticsAdapter | null,
  path: string,
  properties?: Record<string, unknown>
): void {
  useEffect(() => {
    adapter?.pageView(path, properties);
  }, [adapter, path, JSON.stringify(properties)]);
}
