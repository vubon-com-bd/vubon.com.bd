import { useState, useEffect } from 'react';
import { BREAKPOINTS } from '@vubon/shared-constants/src/common/use.constants';

export type BreakpointName = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const values: Record<BreakpointName, number> = {
  xs: BREAKPOINTS.XS,
  sm: BREAKPOINTS.SM,
  md: BREAKPOINTS.MD,
  lg: BREAKPOINTS.LG,
  xl: BREAKPOINTS.XL,
  '2xl': BREAKPOINTS.XXL,
};

export interface UseBreakpointReturn {
  breakpoint: BreakpointName;
  width: number;
  isAbove: (bp: BreakpointName) => boolean;
  isBelow: (bp: BreakpointName) => boolean;
}

export const useBreakpoint = (): UseBreakpointReturn => {
  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handle = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handle);
    handle();
    return () => window.removeEventListener('resize', handle);
  }, []);

  const getBreakpoint = (w: number): BreakpointName => {
    if (w >= values['2xl']) return '2xl';
    if (w >= values.xl) return 'xl';
    if (w >= values.lg) return 'lg';
    if (w >= values.md) return 'md';
    if (w >= values.sm) return 'sm';
    return 'xs';
  };

  return {
    breakpoint: getBreakpoint(width),
    width,
    isAbove: (bp) => width >= values[bp],
    isBelow: (bp) => width < values[bp],
  };
};
