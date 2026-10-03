import { useMediaQuery } from './use-media-query';

/** True if the page is being printed. */
export function usePrint(): boolean {
  return useMediaQuery('print');
}
