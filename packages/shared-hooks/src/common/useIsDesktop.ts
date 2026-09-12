import { useBreakpoint } from './useBreakpoint';

export const useIsDesktop = (): boolean => {
  const { isAbove } = useBreakpoint();
  return isAbove('lg');
};
