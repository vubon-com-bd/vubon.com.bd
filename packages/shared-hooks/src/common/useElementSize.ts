import { useState, useEffect, type RefObject } from 'react';

export interface ElementSize {
  width: number;
  height: number;
}

export const useElementSize = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>
): ElementSize => {
  const [size, setSize] = useState<ElementSize>({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setSize({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return size;
};
