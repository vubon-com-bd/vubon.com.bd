import { useCallback, type RefObject } from 'react';

/** Returns a callback that scrolls an element into view. */
export function useScrollIntoView<T extends HTMLElement>(
  ref: RefObject<T>,
  options: ScrollIntoViewOptions = { behavior: 'smooth', block: 'start' }
): () => void {
  return useCallback(() => {
    ref.current?.scrollIntoView(options);
  }, [ref, options.behavior, options.block, options.inline]);
}
