import { useState, useEffect, type RefObject } from 'react';

export interface ResizeObserverSize {
  width: number;
  height: number;
}

export const useResizeObserver = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>
): ResizeObserverSize => {
  const [size, setSize] = useState<ResizeObserverSize>({ width: 0, height: 0 });

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
