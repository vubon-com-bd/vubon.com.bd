import { useMediaQuery } from './use-media-query';

/** Detects if a screen reader is likely active. */
export function useScreenReader(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
}
