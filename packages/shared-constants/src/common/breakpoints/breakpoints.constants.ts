/**
 * Responsive breakpoints.
 * Single source of truth — hooks/UI MUST import from here.
 */
export const BREAKPOINTS = Object.freeze({
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const);

export type BreakpointKey = keyof typeof BREAKPOINTS;
