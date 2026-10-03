import { BREAKPOINTS } from '@vubon/shared-constants/common';
import { useMediaQuery } from './use-media-query';

export function useIsMobile(): boolean {
  const bp = BREAKPOINTS as Record<string, number> | undefined;
  const md = bp?.md ?? 768;
  return useMediaQuery(`(max-width: ${md - 1}px)`);
}
