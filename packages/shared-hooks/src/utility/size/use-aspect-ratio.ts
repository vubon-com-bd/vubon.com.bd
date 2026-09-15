import { useEffect, useState, type RefObject } from 'react';

/** Aspect ratio (width / height) of an element. */
export function useAspectRatio<T extends HTMLElement>(ref: RefObject<T>): number {
  const [ratio, setRatio] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver((entries) => {
      const e = entries[0];
      if (!e) return;
      const { width, height } = e.contentRect;
      if (height > 0) setRatio(width / height);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);

  return ratio;
}
