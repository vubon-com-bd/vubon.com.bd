import { useEffect, useState, type RefObject } from 'react';

export interface ResizeResult {
  readonly width: number;
  readonly height: number;
}

/** Tracks an element's content rect size. */
export function useResizeObserver<T extends HTMLElement>(ref: RefObject<T>): ResizeResult {
  const [size, setSize] = useState<ResizeResult>({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);

  return size;
}
