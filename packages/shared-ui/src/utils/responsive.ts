import { breakpoints } from '../tokens/breakpoints';
import type { BreakpointKey as TokenBreakpointKey } from '../tokens/breakpoints';

export type BreakpointKey = TokenBreakpointKey;

/**
 * Build a media query string.
 */
export function mediaQuery(
  min: BreakpointKey,
  direction: 'min' | 'max' = 'min',
  max?: BreakpointKey
): string {
  if (direction === 'max') {
    const maxValue = breakpoints[min] - 1;
    return `(max-width: ${maxValue}px)`;
  }
  const minValue = breakpoints[min];
  if (max) {
    const maxValue = breakpoints[max] - 1;
    return `(min-width: ${minValue}px) and (max-width: ${maxValue}px)`;
  }
  return `(min-width: ${minValue}px)`;
}

/** Responsive value map (base + breakpoints). */
export type ResponsiveValue<T> = {
  readonly base?: T;
  readonly xs?: T;
  readonly sm?: T;
  readonly md?: T;
  readonly lg?: T;
  readonly xl?: T;
  readonly '2xl'?: T;
};

/** Pick the value for the current viewport from a responsive map. */
export function pickResponsive<T>(map: ResponsiveValue<T>, viewportWidth: number): T | undefined {
  const order: BreakpointKey[] = ['2xl', 'xl', 'lg', 'md', 'sm'];
  for (const bp of order) {
    const value = map[bp];
    if (value !== undefined && viewportWidth >= breakpoints[bp]) return value;
  }
  return map.base;
}
