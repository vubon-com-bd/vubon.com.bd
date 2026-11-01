import { useCallback, useRef } from 'react';

/** Debounces click to detect double click. */
export function useDoubleClick(
  onDoubleClick: () => void,
  onSingleClick?: () => void,
  delayMs = 250
): () => void {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clicks = useRef(0);

  return useCallback(() => {
    clicks.current += 1;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (clicks.current >= 2) onDoubleClick();
      else onSingleClick?.();
      clicks.current = 0;
    }, delayMs);
  }, [onDoubleClick, onSingleClick, delayMs]);
}
