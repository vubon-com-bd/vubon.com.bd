import { useBreakpoint } from './useBreakpoint';

export const useIsTablet = (): boolean => {
  const { isAbove, isBelow } = useBreakpoint();
  return isAbove('md') && isBelow('lg');
};
