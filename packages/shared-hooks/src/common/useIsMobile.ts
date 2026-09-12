import { useBreakpoint } from './useBreakpoint';

export const useIsMobile = (): boolean => {
  const { isBelow } = useBreakpoint();
  return isBelow('md');
};
