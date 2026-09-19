/**
 * Responsive breakpoints.
 * ⚠️ Mirrors shared-constants/common/breakpoints.
 * Import from shared-constants in code — this is for tokens registry.
 */
export const breakpoints = Object.freeze({
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const);

export type BreakpointKey = keyof typeof breakpoints;
