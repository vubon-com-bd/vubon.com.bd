import { BREAKPOINTS } from '@vubon/shared-constants/common';
import { useMediaQuery } from './use-media-query';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export function useBreakpoint(): Breakpoint {
  const bp = BREAKPOINTS as Record<string, number> | undefined;
  const lg = bp?.lg ?? 1024;
  const xl = bp?.xl ?? 1280;
  const xxl = bp?.['2xl'] ?? 1536;
  const md = bp?.md ?? 768;
  const sm = bp?.sm ?? 640;

  const is2xl = useMediaQuery(`(min-width: ${xxl}px)`);
  const isXl = useMediaQuery(`(min-width: ${xl}px)`);
  const isLg = useMediaQuery(`(min-width: ${lg}px)`);
  const isMd = useMediaQuery(`(min-width: ${md}px)`);
  const isSm = useMediaQuery(`(min-width: ${sm}px)`);

  if (is2xl) return '2xl';
  if (isXl) return 'xl';
  if (isLg) return 'lg';
  if (isMd) return 'md';
  if (isSm) return 'sm';
  return 'xs';
}
